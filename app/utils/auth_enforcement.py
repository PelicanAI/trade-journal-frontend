"""
User ID enforcement for write operations.

Since we use the Supabase service_role key (which bypasses RLS),
this module is the security boundary preventing cross-tenant writes.
"""

from __future__ import annotations

from fastapi import HTTPException
from supabase import Client


def verify_user_ownership(authenticated_user_id: str, payload_user_id: str) -> None:
    """Verify the authenticated user matches the payload's user_id.

    Raises HTTPException 403 if they don't match. This prevents the agent
    (or any client) from writing User A's data into User B's account.
    """
    if str(authenticated_user_id) != str(payload_user_id):
        raise HTTPException(
            status_code=403,
            detail="User ID mismatch: cannot write data for another user",
        )


async def verify_record_ownership(
    supabase: Client,
    table: str,
    record_id: str,
    authenticated_user_id: str,
) -> dict:
    """For UPDATE/DELETE: verify the existing record belongs to the authenticated user.

    Queries the record by its primary key, checks its user_id, and returns the
    record data if ownership is confirmed.

    Raises:
        HTTPException 404 if record not found
        HTTPException 403 if user_id doesn't match
    """
    # Determine the primary key column name
    pk_column = "id"
    if table == "trade_journal":
        pk_column = "trade_id"

    response = (
        supabase.table(table)
        .select("*")
        .eq(pk_column, record_id)
        .maybe_single()
        .execute()
    )

    if not response.data:
        raise HTTPException(
            status_code=404,
            detail=f"Record not found in {table}",
        )

    record = response.data
    record_user_id = record.get("user_id")

    if str(record_user_id) != str(authenticated_user_id):
        raise HTTPException(
            status_code=403,
            detail=f"Access denied: record in {table} belongs to another user",
        )

    return record


async def verify_not_curated_by_non_admin(
    supabase: Client,
    authenticated_user_id: str,
    is_curated: bool | None,
) -> None:
    """Reject is_curated=True from non-admin users on playbooks.

    Checks the user's is_admin flag in user_credits before allowing
    the is_curated field to be set to True.
    """
    if not is_curated:
        return

    response = (
        supabase.table("user_credits")
        .select("is_admin")
        .eq("user_id", authenticated_user_id)
        .maybe_single()
        .execute()
    )

    is_admin = response.data.get("is_admin", False) if response.data else False

    if not is_admin:
        raise HTTPException(
            status_code=403,
            detail="Only admins can set is_curated=true on playbooks",
        )
