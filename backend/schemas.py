from __future__ import annotations

from typing import Literal

from pydantic import BaseModel, Field


SupportedLanguage = Literal["english", "spanish", "french", "yoruba", "mandarin"]


class AnalyzeRequest(BaseModel):
    image: str = Field(..., min_length=1)
    language: SupportedLanguage = "english"
    intent: str | None = None
    context: str | None = None


class OptionsResponse(BaseModel):
    mode: Literal["options"] = "options"
    screen_description: str
    options: list[str] = Field(min_length=3, max_length=4)


class InstructionResponse(BaseModel):
    mode: Literal["instruction"] = "instruction"
    screen_description: str
    instruction: str
    visual_hint: str
    completed_context: str
