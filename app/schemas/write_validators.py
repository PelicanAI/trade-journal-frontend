"""
Pydantic v2 validation models for every user-facing write table.

These models are the security boundary for server-side writes when using
the Supabase service_role key (which bypasses RLS).
"""

from __future__ import annotations

import re
from datetime import date, datetime, time
from typing import Any
from uuid import UUID

from pydantic import (
    BaseModel,
    ConfigDict,
    Field,
    field_validator,
    model_validator,
)

from app.utils.sanitizer import sanitize_text, sanitize_text_list

# ── Shared enums / constants ──────────────────────────────────────────

ASSET_TYPES = {"stock", "option", "future", "crypto", "forex"}
TRADE_DIRECTIONS = {"long", "short"}
TRADE_STATUSES = {"open", "closed", "cancelled"}
OPTION_TYPES = {"call", "put"}
TRADE_SOURCES = {"manual", "import", "api", "pelican"}
MARKET_BIASES = {"bullish", "bearish", "neutral"}
MARKET_TYPES = {"all", "bull", "bear", "range", "volatile"}
DIFFICULTY_LEVELS = {"beginner", "intermediate", "advanced"}
WATCHLIST_SOURCES = {"manual", "pelican", "scan"}
VALID_DAYS = {"monday", "tuesday", "wednesday", "thursday", "friday", "saturday", "sunday"}

URL_PATTERN = re.compile(r"^https?://\S+$", re.IGNORECASE)


def _positive_or_none(v: float | None) -> float | None:
    if v is not None and v <= 0:
        raise ValueError("must be > 0")
    return v


def _non_negative_or_none(v: float | None) -> float | None:
    if v is not None and v < 0:
        raise ValueError("must be >= 0")
    return v


# ═══════════════════════════════════════════════════════════════════════
# TRADES
# ═══════════════════════════════════════════════════════════════════════

class TradeCreate(BaseModel):
    model_config = ConfigDict(str_strip_whitespace=True)

    user_id: UUID
    ticker: str = Field(min_length=1, max_length=10)
    asset_type: str = Field(default="stock")
    direction: str
    quantity: float | None = None
    position_size_usd: float | None = None
    entry_price: float = Field(gt=0)
    exit_price: float | None = None
    stop_loss: float | None = None
    take_profit: float | None = None
    option_type: str | None = Field(default=None, alias="opti_type")
    strike_price: float | None = None
    expiration_date: date | None = None
    status: str = Field(default="open")
    pnl_amount: float | None = None
    pnl_percent: float | None = None
    r_multiple: float | None = None
    commission: float = Field(default=0, ge=0)
    entry_date: datetime | None = None
    exit_date: datetime | None = None
    thesis: str | None = None
    notes: str | None = None
    mistakes: str | None = None
    setup_tags: list[str] | None = None
    conviction: int | None = Field(default=None, ge=1, le=10)
    conversation_id: UUID | None = None
    playbook_id: UUID | None = None
    is_paper: bool = False
    plan_rules_followed: list[str] | None = None
    plan_rules_violated: list[str] | None = None
    plan_checklist_completed: dict[str, Any] | None = None
    source: str = Field(default="manual")
    import_batch_id: UUID | None = None

    @field_validator("ticker")
    @classmethod
    def uppercase_ticker(cls, v: str) -> str:
        return v.upper()

    @field_validator("asset_type")
    @classmethod
    def validate_asset_type(cls, v: str) -> str:
        if v not in ASSET_TYPES:
            raise ValueError(f"must be one of {ASSET_TYPES}")
        return v

    @field_validator("direction")
    @classmethod
    def validate_direction(cls, v: str) -> str:
        if v not in TRADE_DIRECTIONS:
            raise ValueError(f"must be one of {TRADE_DIRECTIONS}")
        return v

    @field_validator("status")
    @classmethod
    def validate_status(cls, v: str) -> str:
        if v not in TRADE_STATUSES:
            raise ValueError(f"must be one of {TRADE_STATUSES}")
        return v

    @field_validator("option_type")
    @classmethod
    def validate_option_type(cls, v: str | None) -> str | None:
        if v is not None and v not in OPTION_TYPES:
            raise ValueError(f"must be one of {OPTION_TYPES}")
        return v

    @field_validator("source")
    @classmethod
    def validate_source(cls, v: str) -> str:
        if v not in TRADE_SOURCES:
            raise ValueError(f"must be one of {TRADE_SOURCES}")
        return v

    @field_validator("quantity", "position_size_usd", "exit_price", "stop_loss", "take_profit", "strike_price")
    @classmethod
    def positive_if_provided(cls, v: float | None) -> float | None:
        return _positive_or_none(v)

    @field_validator("thesis", "notes", "mistakes", mode="before")
    @classmethod
    def sanitize_free_text(cls, v: str | None) -> str | None:
        return sanitize_text(v)

    @field_validator("setup_tags", mode="before")
    @classmethod
    def validate_setup_tags(cls, v: list[str] | None) -> list[str] | None:
        if v is None:
            return None
        if len(v) > 20:
            raise ValueError("max 20 tags")
        for tag in v:
            if len(tag) > 50:
                raise ValueError("each tag max 50 chars")
        return sanitize_text_list(v)

    @field_validator("plan_rules_followed", "plan_rules_violated", mode="before")
    @classmethod
    def validate_plan_rules(cls, v: list[str] | None) -> list[str] | None:
        if v is None:
            return None
        for rule in v:
            if len(str(rule)) > 200:
                raise ValueError("each rule max 200 chars")
        return sanitize_text_list(v)

    @model_validator(mode="after")
    def exit_date_after_entry(self) -> TradeCreate:
        if self.exit_date and self.entry_date and self.exit_date < self.entry_date:
            raise ValueError("exit_date must be >= entry_date")
        return self


class TradeUpdate(BaseModel):
    model_config = ConfigDict(str_strip_whitespace=True)

    user_id: UUID
    ticker: str | None = Field(default=None, min_length=1, max_length=10)
    asset_type: str | None = None
    direction: str | None = None
    quantity: float | None = None
    position_size_usd: float | None = None
    entry_price: float | None = Field(default=None, gt=0)
    exit_price: float | None = None
    stop_loss: float | None = None
    take_profit: float | None = None
    option_type: str | None = Field(default=None, alias="opti_type")
    strike_price: float | None = None
    expiration_date: date | None = None
    status: str | None = None
    pnl_amount: float | None = None
    pnl_percent: float | None = None
    r_multiple: float | None = None
    commission: float | None = Field(default=None, ge=0)
    entry_date: datetime | None = None
    exit_date: datetime | None = None
    thesis: str | None = None
    notes: str | None = None
    mistakes: str | None = None
    setup_tags: list[str] | None = None
    conviction: int | None = Field(default=None, ge=1, le=10)
    conversation_id: UUID | None = None
    playbook_id: UUID | None = None
    is_paper: bool | None = None
    plan_rules_followed: list[str] | None = None
    plan_rules_violated: list[str] | None = None
    plan_checklist_completed: dict[str, Any] | None = None
    source: str | None = None
    import_batch_id: UUID | None = None

    @field_validator("ticker")
    @classmethod
    def uppercase_ticker(cls, v: str | None) -> str | None:
        return v.upper() if v else v

    @field_validator("asset_type")
    @classmethod
    def validate_asset_type(cls, v: str | None) -> str | None:
        if v is not None and v not in ASSET_TYPES:
            raise ValueError(f"must be one of {ASSET_TYPES}")
        return v

    @field_validator("direction")
    @classmethod
    def validate_direction(cls, v: str | None) -> str | None:
        if v is not None and v not in TRADE_DIRECTIONS:
            raise ValueError(f"must be one of {TRADE_DIRECTIONS}")
        return v

    @field_validator("status")
    @classmethod
    def validate_status(cls, v: str | None) -> str | None:
        if v is not None and v not in TRADE_STATUSES:
            raise ValueError(f"must be one of {TRADE_STATUSES}")
        return v

    @field_validator("option_type")
    @classmethod
    def validate_option_type(cls, v: str | None) -> str | None:
        if v is not None and v not in OPTION_TYPES:
            raise ValueError(f"must be one of {OPTION_TYPES}")
        return v

    @field_validator("source")
    @classmethod
    def validate_source(cls, v: str | None) -> str | None:
        if v is not None and v not in TRADE_SOURCES:
            raise ValueError(f"must be one of {TRADE_SOURCES}")
        return v

    @field_validator("quantity", "position_size_usd", "exit_price", "stop_loss", "take_profit", "strike_price")
    @classmethod
    def positive_if_provided(cls, v: float | None) -> float | None:
        return _positive_or_none(v)

    @field_validator("thesis", "notes", "mistakes", mode="before")
    @classmethod
    def sanitize_free_text(cls, v: str | None) -> str | None:
        return sanitize_text(v)

    @field_validator("setup_tags", mode="before")
    @classmethod
    def validate_setup_tags(cls, v: list[str] | None) -> list[str] | None:
        if v is None:
            return None
        if len(v) > 20:
            raise ValueError("max 20 tags")
        for tag in v:
            if len(tag) > 50:
                raise ValueError("each tag max 50 chars")
        return sanitize_text_list(v)

    @field_validator("plan_rules_followed", "plan_rules_violated", mode="before")
    @classmethod
    def validate_plan_rules(cls, v: list[str] | None) -> list[str] | None:
        if v is None:
            return None
        for rule in v:
            if len(str(rule)) > 200:
                raise ValueError("each rule max 200 chars")
        return sanitize_text_list(v)


# ═══════════════════════════════════════════════════════════════════════
# TRADE JOURNAL
# ═══════════════════════════════════════════════════════════════════════

class TradeJournalCreate(BaseModel):
    model_config = ConfigDict(str_strip_whitespace=True)

    user_id: UUID
    timestamp: datetime | None = None
    image_urls: list[str] | None = None
    entry_price: float | None = None
    exit_price: float | None = None
    stop_loss: float | None = None
    take_profit: float | None = None
    market_context: str | None = None
    self_notes: str | None = None
    ai_grade: dict[str, Any] | None = None
    is_private: bool = True

    @field_validator("entry_price", "exit_price", "stop_loss", "take_profit")
    @classmethod
    def positive_if_provided(cls, v: float | None) -> float | None:
        return _positive_or_none(v)

    @field_validator("image_urls", mode="before")
    @classmethod
    def validate_image_urls(cls, v: list[str] | None) -> list[str] | None:
        if v is None:
            return None
        if len(v) > 10:
            raise ValueError("max 10 image URLs")
        for url in v:
            if not URL_PATTERN.match(url):
                raise ValueError(f"invalid URL: {url}")
        return v

    @field_validator("market_context", "self_notes", mode="before")
    @classmethod
    def sanitize_free_text(cls, v: str | None) -> str | None:
        return sanitize_text(v)


class TradeJournalUpdate(BaseModel):
    model_config = ConfigDict(str_strip_whitespace=True)

    user_id: UUID
    timestamp: datetime | None = None
    image_urls: list[str] | None = None
    entry_price: float | None = None
    exit_price: float | None = None
    stop_loss: float | None = None
    take_profit: float | None = None
    market_context: str | None = None
    self_notes: str | None = None
    ai_grade: dict[str, Any] | None = None
    is_private: bool | None = None

    @field_validator("entry_price", "exit_price", "stop_loss", "take_profit")
    @classmethod
    def positive_if_provided(cls, v: float | None) -> float | None:
        return _positive_or_none(v)

    @field_validator("image_urls", mode="before")
    @classmethod
    def validate_image_urls(cls, v: list[str] | None) -> list[str] | None:
        if v is None:
            return None
        if len(v) > 10:
            raise ValueError("max 10 image URLs")
        for url in v:
            if not URL_PATTERN.match(url):
                raise ValueError(f"invalid URL: {url}")
        return v

    @field_validator("market_context", "self_notes", mode="before")
    @classmethod
    def sanitize_free_text(cls, v: str | None) -> str | None:
        return sanitize_text(v)


# ═══════════════════════════════════════════════════════════════════════
# PLAYBOOKS (Strategies)
# ═══════════════════════════════════════════════════════════════════════

class PlaybookCreate(BaseModel):
    model_config = ConfigDict(str_strip_whitespace=True)

    user_id: UUID
    name: str = Field(max_length=200)
    description: str | None = None
    setup_type: str = Field(max_length=100)
    timeframe: str | None = Field(default=None, max_length=50)
    market_conditions: str | None = Field(default=None, alias="market_ns")
    entry_rules: str | None = None
    exit_rules: str | None = None
    risk_rules: str | None = None
    checklist: list[str] | None = None
    total_trades: int | None = Field(default=None, ge=0)
    winning_trades: int | None = Field(default=None, ge=0)
    avg_r_multiple: float | None = None
    avg_pnl_percent: float | None = None
    win_rate: float | None = Field(default=None, ge=0, le=100)
    is_active: bool = True
    display_order: int = 0
    market_type: str = Field(default="all")
    instruments: list[str] | None = None
    notes: str | None = None
    ai_summary: str | None = None
    is_published: bool = False
    is_curated: bool = False  # REJECT True from non-admin users — enforced at endpoint level
    category: str | None = Field(default=None, max_length=100)
    difficulty: str | None = None
    recommended_assets: list[str] | None = None
    best_when: str | None = None
    avoid_when: str | None = None
    author_display_name: str | None = Field(default=None, max_length=100)

    @field_validator("market_type")
    @classmethod
    def validate_market_type(cls, v: str) -> str:
        if v not in MARKET_TYPES:
            raise ValueError(f"must be one of {MARKET_TYPES}")
        return v

    @field_validator("difficulty")
    @classmethod
    def validate_difficulty(cls, v: str | None) -> str | None:
        if v is not None and v not in DIFFICULTY_LEVELS:
            raise ValueError(f"must be one of {DIFFICULTY_LEVELS}")
        return v

    @field_validator("name", "description", "entry_rules", "exit_rules", "risk_rules",
                     "market_conditions", "notes", "ai_summary", "best_when", "avoid_when",
                     "author_display_name", mode="before")
    @classmethod
    def sanitize_free_text(cls, v: str | None) -> str | None:
        return sanitize_text(v)

    @field_validator("checklist", mode="before")
    @classmethod
    def validate_checklist(cls, v: list[str] | None) -> list[str] | None:
        if v is None:
            return None
        for item in v:
            if len(str(item)) > 200:
                raise ValueError("each checklist item max 200 chars")
        return sanitize_text_list(v)

    @field_validator("instruments", mode="before")
    @classmethod
    def validate_instruments(cls, v: list[str] | None) -> list[str] | None:
        if v is None:
            return None
        if len(v) > 50:
            raise ValueError("max 50 instruments")
        for inst in v:
            if len(inst) > 10:
                raise ValueError("each instrument max 10 chars")
        return v

    @field_validator("recommended_assets", mode="before")
    @classmethod
    def validate_recommended_assets(cls, v: list[str] | None) -> list[str] | None:
        if v is None:
            return None
        for asset in v:
            if len(asset) > 10:
                raise ValueError("each asset max 10 chars")
        return v


class PlaybookUpdate(BaseModel):
    model_config = ConfigDict(str_strip_whitespace=True)

    user_id: UUID
    name: str | None = Field(default=None, max_length=200)
    description: str | None = None
    setup_type: str | None = Field(default=None, max_length=100)
    timeframe: str | None = Field(default=None, max_length=50)
    market_conditions: str | None = Field(default=None, alias="market_ns")
    entry_rules: str | None = None
    exit_rules: str | None = None
    risk_rules: str | None = None
    checklist: list[str] | None = None
    total_trades: int | None = Field(default=None, ge=0)
    winning_trades: int | None = Field(default=None, ge=0)
    avg_r_multiple: float | None = None
    avg_pnl_percent: float | None = None
    win_rate: float | None = Field(default=None, ge=0, le=100)
    is_active: bool | None = None
    display_order: int | None = None
    market_type: str | None = None
    instruments: list[str] | None = None
    notes: str | None = None
    ai_summary: str | None = None
    is_published: bool | None = None
    is_curated: bool | None = None  # REJECT True from non-admin — enforced at endpoint level
    category: str | None = Field(default=None, max_length=100)
    difficulty: str | None = None
    recommended_assets: list[str] | None = None
    best_when: str | None = None
    avoid_when: str | None = None
    author_display_name: str | None = Field(default=None, max_length=100)

    @field_validator("market_type")
    @classmethod
    def validate_market_type(cls, v: str | None) -> str | None:
        if v is not None and v not in MARKET_TYPES:
            raise ValueError(f"must be one of {MARKET_TYPES}")
        return v

    @field_validator("difficulty")
    @classmethod
    def validate_difficulty(cls, v: str | None) -> str | None:
        if v is not None and v not in DIFFICULTY_LEVELS:
            raise ValueError(f"must be one of {DIFFICULTY_LEVELS}")
        return v

    @field_validator("name", "description", "entry_rules", "exit_rules", "risk_rules",
                     "market_conditions", "notes", "ai_summary", "best_when", "avoid_when",
                     "author_display_name", mode="before")
    @classmethod
    def sanitize_free_text(cls, v: str | None) -> str | None:
        return sanitize_text(v)

    @field_validator("checklist", mode="before")
    @classmethod
    def validate_checklist(cls, v: list[str] | None) -> list[str] | None:
        if v is None:
            return None
        for item in v:
            if len(str(item)) > 200:
                raise ValueError("each checklist item max 200 chars")
        return sanitize_text_list(v)

    @field_validator("instruments", mode="before")
    @classmethod
    def validate_instruments(cls, v: list[str] | None) -> list[str] | None:
        if v is None:
            return None
        if len(v) > 50:
            raise ValueError("max 50 instruments")
        for inst in v:
            if len(inst) > 10:
                raise ValueError("each instrument max 10 chars")
        return v

    @field_validator("recommended_assets", mode="before")
    @classmethod
    def validate_recommended_assets(cls, v: list[str] | None) -> list[str] | None:
        if v is None:
            return None
        for asset in v:
            if len(asset) > 10:
                raise ValueError("each asset max 10 chars")
        return v


# ═══════════════════════════════════════════════════════════════════════
# TRADING PLANS
# ═══════════════════════════════════════════════════════════════════════

class TradingPlanCreate(BaseModel):
    model_config = ConfigDict(str_strip_whitespace=True)

    user_id: UUID
    name: str = Field(default="My Trading Plan", max_length=200)
    is_active: bool = True
    max_trades_per_day: int | None = Field(default=None, ge=1, le=100)
    max_open_positions: int | None = Field(default=None, ge=1, le=100)
    max_position_size_usd: float | None = None
    max_position_size_pct: float | None = Field(default=None, ge=0, le=100)
    min_risk_reward_ratio: float | None = None
    max_risk_per_trade_pct: float | None = Field(default=None, ge=0, le=100)
    max_daily_loss: float | None = None
    max_weekly_loss: float | None = None
    max_monthly_loss: float | None = None
    require_stop_loss: bool = False
    require_take_profit: bool = False
    require_thesis: bool = False
    allowed_trading_hours_start: time | None = None
    allowed_trading_hours_end: time | None = None
    restricted_days: list[str] | None = None
    no_trading_before_major_events: bool = False
    pre_entry_checklist: list[str] | None = None
    min_time_between_trades_minutes: int | None = Field(default=None, ge=0, le=1440)
    max_consecutive_losses_before_stop: int | None = Field(default=None, ge=1, le=20)
    no_same_ticker_after_loss: bool = False
    cooldown_after_max_loss_hours: int | None = Field(default=None, ge=0, le=168)
    allowed_asset_types: list[str] | None = None
    blocked_tickers: list[str] | None = None
    template_id: str | None = None
    rules_enabled: dict[str, Any] | None = None
    exit_rules: dict[str, Any] | None = None
    session_rules: dict[str, Any] | None = None
    emotional_checkin_required: bool = False
    plan_notes: str | None = None
    scaling_rules: dict[str, Any] | None = None
    max_correlated_positions: int | None = Field(default=None, ge=1, le=50)
    max_sector_exposure_pct: float | None = Field(default=None, ge=0, le=100)
    friday_trading_allowed: bool = True
    first_hour_only: bool = False
    avoid_first_15_min: bool = Field(default=False, alias="avoid_f_15_min")

    @field_validator("max_position_size_usd", "max_daily_loss", "max_weekly_loss",
                     "max_monthly_loss", "min_risk_reward_ratio")
    @classmethod
    def positive_if_provided(cls, v: float | None) -> float | None:
        return _positive_or_none(v)

    @field_validator("name", "plan_notes", mode="before")
    @classmethod
    def sanitize_free_text(cls, v: str | None) -> str | None:
        return sanitize_text(v)

    @field_validator("pre_entry_checklist", mode="before")
    @classmethod
    def validate_pre_entry_checklist(cls, v: list[str] | None) -> list[str] | None:
        if v is None:
            return None
        for item in v:
            if len(str(item)) > 200:
                raise ValueError("each checklist item max 200 chars")
        return sanitize_text_list(v)

    @field_validator("restricted_days", mode="before")
    @classmethod
    def validate_restricted_days(cls, v: list[str] | None) -> list[str] | None:
        if v is None:
            return None
        for day in v:
            if day.lower() not in VALID_DAYS:
                raise ValueError(f"invalid day: {day}. Must be one of {VALID_DAYS}")
        return [d.lower() for d in v]

    @field_validator("allowed_asset_types", mode="before")
    @classmethod
    def validate_allowed_asset_types(cls, v: list[str] | None) -> list[str] | None:
        if v is None:
            return None
        for at in v:
            if at not in ASSET_TYPES:
                raise ValueError(f"invalid asset type: {at}. Must be one of {ASSET_TYPES}")
        return v

    @field_validator("blocked_tickers", mode="before")
    @classmethod
    def validate_blocked_tickers(cls, v: list[str] | None) -> list[str] | None:
        if v is None:
            return None
        result = []
        for t in v:
            if len(t) > 10:
                raise ValueError("each ticker max 10 chars")
            result.append(t.upper())
        return result


class TradingPlanUpdate(BaseModel):
    model_config = ConfigDict(str_strip_whitespace=True)

    user_id: UUID
    name: str | None = Field(default=None, max_length=200)
    is_active: bool | None = None
    max_trades_per_day: int | None = Field(default=None, ge=1, le=100)
    max_open_positions: int | None = Field(default=None, ge=1, le=100)
    max_position_size_usd: float | None = None
    max_position_size_pct: float | None = Field(default=None, ge=0, le=100)
    min_risk_reward_ratio: float | None = None
    max_risk_per_trade_pct: float | None = Field(default=None, ge=0, le=100)
    max_daily_loss: float | None = None
    max_weekly_loss: float | None = None
    max_monthly_loss: float | None = None
    require_stop_loss: bool | None = None
    require_take_profit: bool | None = None
    require_thesis: bool | None = None
    allowed_trading_hours_start: time | None = None
    allowed_trading_hours_end: time | None = None
    restricted_days: list[str] | None = None
    no_trading_before_major_events: bool | None = None
    pre_entry_checklist: list[str] | None = None
    min_time_between_trades_minutes: int | None = Field(default=None, ge=0, le=1440)
    max_consecutive_losses_before_stop: int | None = Field(default=None, ge=1, le=20)
    no_same_ticker_after_loss: bool | None = None
    cooldown_after_max_loss_hours: int | None = Field(default=None, ge=0, le=168)
    allowed_asset_types: list[str] | None = None
    blocked_tickers: list[str] | None = None
    template_id: str | None = None
    rules_enabled: dict[str, Any] | None = None
    exit_rules: dict[str, Any] | None = None
    session_rules: dict[str, Any] | None = None
    emotional_checkin_required: bool | None = None
    plan_notes: str | None = None
    scaling_rules: dict[str, Any] | None = None
    max_correlated_positions: int | None = Field(default=None, ge=1, le=50)
    max_sector_exposure_pct: float | None = Field(default=None, ge=0, le=100)
    friday_trading_allowed: bool | None = None
    first_hour_only: bool | None = None
    avoid_first_15_min: bool | None = Field(default=None, alias="avoid_f_15_min")

    @field_validator("max_position_size_usd", "max_daily_loss", "max_weekly_loss",
                     "max_monthly_loss", "min_risk_reward_ratio")
    @classmethod
    def positive_if_provided(cls, v: float | None) -> float | None:
        return _positive_or_none(v)

    @field_validator("name", "plan_notes", mode="before")
    @classmethod
    def sanitize_free_text(cls, v: str | None) -> str | None:
        return sanitize_text(v)

    @field_validator("pre_entry_checklist", mode="before")
    @classmethod
    def validate_pre_entry_checklist(cls, v: list[str] | None) -> list[str] | None:
        if v is None:
            return None
        for item in v:
            if len(str(item)) > 200:
                raise ValueError("each checklist item max 200 chars")
        return sanitize_text_list(v)

    @field_validator("restricted_days", mode="before")
    @classmethod
    def validate_restricted_days(cls, v: list[str] | None) -> list[str] | None:
        if v is None:
            return None
        for day in v:
            if day.lower() not in VALID_DAYS:
                raise ValueError(f"invalid day: {day}. Must be one of {VALID_DAYS}")
        return [d.lower() for d in v]

    @field_validator("allowed_asset_types", mode="before")
    @classmethod
    def validate_allowed_asset_types(cls, v: list[str] | None) -> list[str] | None:
        if v is None:
            return None
        for at in v:
            if at not in ASSET_TYPES:
                raise ValueError(f"invalid asset type: {at}. Must be one of {ASSET_TYPES}")
        return v

    @field_validator("blocked_tickers", mode="before")
    @classmethod
    def validate_blocked_tickers(cls, v: list[str] | None) -> list[str] | None:
        if v is None:
            return None
        result = []
        for t in v:
            if len(t) > 10:
                raise ValueError("each ticker max 10 chars")
            result.append(t.upper())
        return result


# ═══════════════════════════════════════════════════════════════════════
# DAILY JOURNAL
# ═══════════════════════════════════════════════════════════════════════

class DailyJournalCreate(BaseModel):
    model_config = ConfigDict(str_strip_whitespace=True)

    user_id: UUID
    journal_date: date
    pre_market_notes: str | None = None
    market_bias: str | None = None
    planned_trades: str | None = None
    daily_goal: str | None = None
    post_market_notes: str | None = None
    lessons_learned: str | None = None
    emotional_state: str | None = Field(default=None, max_length=100)
    followed_plan: bool | None = None
    total_trades: int = Field(default=0, ge=0)
    winning_trades: int = Field(default=0, ge=0)
    losing_trades: int = Field(default=0, ge=0)
    daily_pnl: float = 0

    @field_validator("market_bias")
    @classmethod
    def validate_market_bias(cls, v: str | None) -> str | None:
        if v is not None and v not in MARKET_BIASES:
            raise ValueError(f"must be one of {MARKET_BIASES}")
        return v

    @field_validator("pre_market_notes", "planned_trades", "daily_goal",
                     "post_market_notes", "lessons_learned", "emotional_state",
                     "market_bias", mode="before")
    @classmethod
    def sanitize_free_text(cls, v: str | None) -> str | None:
        return sanitize_text(v)


class DailyJournalUpdate(BaseModel):
    model_config = ConfigDict(str_strip_whitespace=True)

    user_id: UUID
    journal_date: date | None = None
    pre_market_notes: str | None = None
    market_bias: str | None = None
    planned_trades: str | None = None
    daily_goal: str | None = None
    post_market_notes: str | None = None
    lessons_learned: str | None = None
    emotional_state: str | None = Field(default=None, max_length=100)
    followed_plan: bool | None = None
    total_trades: int | None = Field(default=None, ge=0)
    winning_trades: int | None = Field(default=None, ge=0)
    losing_trades: int | None = Field(default=None, ge=0)
    daily_pnl: float | None = None

    @field_validator("market_bias")
    @classmethod
    def validate_market_bias(cls, v: str | None) -> str | None:
        if v is not None and v not in MARKET_BIASES:
            raise ValueError(f"must be one of {MARKET_BIASES}")
        return v

    @field_validator("pre_market_notes", "planned_trades", "daily_goal",
                     "post_market_notes", "lessons_learned", "emotional_state",
                     "market_bias", mode="before")
    @classmethod
    def sanitize_free_text(cls, v: str | None) -> str | None:
        return sanitize_text(v)


# ═══════════════════════════════════════════════════════════════════════
# WATCHLIST
# ═══════════════════════════════════════════════════════════════════════

class WatchlistCreate(BaseModel):
    model_config = ConfigDict(str_strip_whitespace=True)

    user_id: UUID
    ticker: str = Field(min_length=1, max_length=10)
    notes: str | None = None
    alert_price_above: float | None = None
    alert_price_below: float | None = None
    added_from: str = Field(default="manual")
    conversation_id: UUID | None = None
    custom_prompt: str | None = None

    @field_validator("ticker")
    @classmethod
    def uppercase_ticker(cls, v: str) -> str:
        return v.upper()

    @field_validator("added_from")
    @classmethod
    def validate_added_from(cls, v: str) -> str:
        if v not in WATCHLIST_SOURCES:
            raise ValueError(f"must be one of {WATCHLIST_SOURCES}")
        return v

    @field_validator("alert_price_above", "alert_price_below")
    @classmethod
    def positive_if_provided(cls, v: float | None) -> float | None:
        return _positive_or_none(v)

    @field_validator("notes", "custom_prompt", mode="before")
    @classmethod
    def sanitize_free_text(cls, v: str | None) -> str | None:
        return sanitize_text(v)


class WatchlistUpdate(BaseModel):
    model_config = ConfigDict(str_strip_whitespace=True)

    user_id: UUID
    ticker: str | None = Field(default=None, min_length=1, max_length=10)
    notes: str | None = None
    alert_price_above: float | None = None
    alert_price_below: float | None = None
    added_from: str | None = None
    conversation_id: UUID | None = None
    custom_prompt: str | None = None

    @field_validator("ticker")
    @classmethod
    def uppercase_ticker(cls, v: str | None) -> str | None:
        return v.upper() if v else v

    @field_validator("added_from")
    @classmethod
    def validate_added_from(cls, v: str | None) -> str | None:
        if v is not None and v not in WATCHLIST_SOURCES:
            raise ValueError(f"must be one of {WATCHLIST_SOURCES}")
        return v

    @field_validator("alert_price_above", "alert_price_below")
    @classmethod
    def positive_if_provided(cls, v: float | None) -> float | None:
        return _positive_or_none(v)

    @field_validator("notes", "custom_prompt", mode="before")
    @classmethod
    def sanitize_free_text(cls, v: str | None) -> str | None:
        return sanitize_text(v)


# ═══════════════════════════════════════════════════════════════════════
# SAVED INSIGHTS
# ═══════════════════════════════════════════════════════════════════════

class SavedInsightCreate(BaseModel):
    model_config = ConfigDict(str_strip_whitespace=True)

    user_id: UUID
    message_id: UUID | None = None
    conversation_id: UUID | None = None
    content: str = Field(min_length=1)
    tickers: list[str] | None = None
    note: str | None = None

    @field_validator("content", "note", mode="before")
    @classmethod
    def sanitize_free_text(cls, v: str | None) -> str | None:
        return sanitize_text(v)

    @field_validator("tickers", mode="before")
    @classmethod
    def validate_tickers(cls, v: list[str] | None) -> list[str] | None:
        if v is None:
            return None
        result = []
        for t in v:
            if len(t) > 10:
                raise ValueError("each ticker max 10 chars")
            result.append(t.upper())
        return result


# ═══════════════════════════════════════════════════════════════════════
# STRATEGY RATINGS
# ═══════════════════════════════════════════════════════════════════════

class StrategyRatingCreate(BaseModel):
    model_config = ConfigDict(str_strip_whitespace=True)

    user_id: UUID
    playbook_id: UUID
    rating: int = Field(ge=1, le=5)
    review: str | None = Field(default=None, max_length=2000)

    @field_validator("review", mode="before")
    @classmethod
    def sanitize_free_text(cls, v: str | None) -> str | None:
        return sanitize_text(v)


class StrategyRatingUpdate(BaseModel):
    model_config = ConfigDict(str_strip_whitespace=True)

    user_id: UUID
    rating: int | None = Field(default=None, ge=1, le=5)
    review: str | None = Field(default=None, max_length=2000)

    @field_validator("review", mode="before")
    @classmethod
    def sanitize_free_text(cls, v: str | None) -> str | None:
        return sanitize_text(v)
