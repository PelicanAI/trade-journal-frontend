"""
Input sanitization for free-text fields.

Prevents prompt injection via stored user content that later enters
the AI agent's context window. Applied to every free-text field
before it reaches Supabase.
"""

import logging
import re

logger = logging.getLogger(__name__)

MAX_TEXT_LENGTH = 10_000

# ── Prompt injection patterns ──────────────────────────────────────────
# Each tuple: (compiled regex, replacement string)
_INJECTION_PATTERNS: list[tuple[re.Pattern[str], str]] = [
    # Role injection at start of line
    (re.compile(r"^ASSISTANT:", re.IGNORECASE | re.MULTILINE), "[filtered: role injection attempt]"),
    (re.compile(r"^HUMAN:", re.IGNORECASE | re.MULTILINE), "[filtered: role injection attempt]"),

    # Classic prompt injection phrases
    (re.compile(r"ignore\s+previous\s+instructions", re.IGNORECASE), "[filtered: prompt injection attempt]"),
    (re.compile(r"ignore\s+all\s+instructions", re.IGNORECASE), "[filtered: prompt injection attempt]"),
    (re.compile(r"you\s+are\s+now\b", re.IGNORECASE), "[filtered: prompt injection attempt]"),
    (re.compile(r"act\s+as\s+if\b", re.IGNORECASE), "[filtered: prompt injection attempt]"),
    (re.compile(r"pretend\s+you\s+are\b", re.IGNORECASE), "[filtered: prompt injection attempt]"),
    (re.compile(r"system\s+prompt\s*:", re.IGNORECASE), "[filtered: prompt injection attempt]"),

    # Markdown heading injection
    (re.compile(r"^###\s+System\b", re.IGNORECASE | re.MULTILINE), "[filtered: prompt injection attempt]"),
    (re.compile(r"^###\s+Instructions\b", re.IGNORECASE | re.MULTILINE), "[filtered: prompt injection attempt]"),

    # XML system-delimiter injection
    (re.compile(r"</?system>", re.IGNORECASE), "[filtered: xml injection attempt]"),
    (re.compile(r"</?instruction>", re.IGNORECASE), "[filtered: xml injection attempt]"),
    (re.compile(r"</?instructions>", re.IGNORECASE), "[filtered: xml injection attempt]"),

    # Generic XML tags that look like system delimiters — strip angle brackets only
    (re.compile(r"<(/?(?:tool_call|tool_result|function_call|function_result|command|prompt|context|assistant_response))>", re.IGNORECASE), r"[\1]"),
]


def sanitize_text(text: str | None, *, user_id: str | None = None) -> str | None:
    """Sanitize a single free-text field.

    - Returns None if input is None
    - Strips leading/trailing whitespace
    - Truncates to MAX_TEXT_LENGTH
    - Detects and neutralizes prompt injection patterns
    """
    if text is None:
        return None

    result = text.strip()

    if len(result) > MAX_TEXT_LENGTH:
        result = result[:MAX_TEXT_LENGTH]

    injection_found = False
    for pattern, replacement in _INJECTION_PATTERNS:
        result, count = pattern.subn(replacement, result)
        if count > 0:
            injection_found = True

    if injection_found:
        ctx = f" (user_id={user_id})" if user_id else ""
        logger.warning("Prompt injection pattern detected and neutralized%s", ctx)

    return result


def sanitize_text_list(texts: list[str] | None, *, user_id: str | None = None) -> list[str] | None:
    """Apply sanitize_text() to each element in a list.

    Used for array fields like setup_tags, checklist, pre_entry_checklist, etc.
    """
    if texts is None:
        return None
    return [sanitize_text(t, user_id=user_id) or "" for t in texts]
