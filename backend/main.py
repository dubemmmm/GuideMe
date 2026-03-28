from __future__ import annotations

import base64
import json
import os
import traceback
from datetime import datetime

from dotenv import load_dotenv
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from fastapi.responses import JSONResponse
from pydantic import ValidationError

from openrouter import OpenRouterError, analyze_kiosk_screen
from prompts import build_instruction_prompt, build_options_prompt
from schemas import AnalyzeRequest, InstructionResponse, OptionsResponse

load_dotenv()

# Verify API key is loaded
api_key = os.getenv("OPENROUTER_API_KEY")
print(f"[STARTUP] OPENROUTER_API_KEY loaded: {'YES (' + api_key[:12] + '...)' if api_key else 'NO - MISSING!'}")

app = FastAPI(title="GuideMe Backend")

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_methods=["*"],
    allow_headers=["*"],
)

CAPTURES_DIR = os.path.join(os.path.dirname(__file__), "captures")
os.makedirs(CAPTURES_DIR, exist_ok=True)


def _save_capture(image_base64: str) -> str:
    """Save captured image to disk for debugging. Returns the filename."""
    timestamp = datetime.now().strftime("%Y%m%d_%H%M%S")
    filename = f"capture_{timestamp}.jpg"
    filepath = os.path.join(CAPTURES_DIR, filename)
    try:
        image_data = base64.b64decode(image_base64)
        with open(filepath, "wb") as f:
            f.write(image_data)
        print(f"[DEBUG] Saved capture: {filepath} ({len(image_data)} bytes)")
        return filename
    except Exception as e:
        print(f"[DEBUG] Failed to save capture: {e}")
        return "save_failed"


def _parse_options_response(raw_content: str) -> OptionsResponse:
    data = json.loads(raw_content)
    return OptionsResponse(**data)


def _parse_instruction_response(raw_content: str) -> InstructionResponse:
    data = json.loads(raw_content)
    return InstructionResponse(**data)


@app.get("/health")
async def health() -> dict[str, str]:
    return {"status": "ok"}


@app.post("/analyze", response_model=OptionsResponse | InstructionResponse)
async def analyze(request: AnalyzeRequest):
    print(f"\n{'='*60}")
    print(f"[ANALYZE] Request received")
    print(f"  Language: {request.language}")
    print(f"  Intent: {request.intent}")
    print(f"  Context: {request.context}")
    print(f"  Image length: {len(request.image)} chars")

    # Save the captured image for debugging
    _save_capture(request.image)

    is_instruction_mode = bool(request.intent)
    prompt = (
        build_instruction_prompt(request.language, request.intent or "", request.context)
        if is_instruction_mode
        else build_options_prompt(request.language)
    )
    parser = _parse_instruction_response if is_instruction_mode else _parse_options_response

    print(f"  Mode: {'instruction' if is_instruction_mode else 'options'}")

    for attempt in range(2):
        print(f"  Attempt {attempt + 1}/2: Calling OpenRouter...")
        try:
            raw_content = await analyze_kiosk_screen(request.image, prompt)
            print(f"  OpenRouter response: {raw_content[:300]}...")
        except OpenRouterError as e:
            print(f"  [ERROR] OpenRouter failed: {e}")
            traceback.print_exc()
            return JSONResponse(
                status_code=502,
                content={"error": "AI service unavailable, please try again"},
            )
        except Exception as e:
            print(f"  [ERROR] Unexpected error calling OpenRouter: {e}")
            traceback.print_exc()
            return JSONResponse(
                status_code=500,
                content={"error": f"Unexpected error: {str(e)}"},
            )

        try:
            parsed_response = parser(raw_content)
            print(f"  [SUCCESS] Parsed response successfully")
            return parsed_response
        except (json.JSONDecodeError, ValidationError) as e:
            print(f"  [ERROR] Parse attempt {attempt + 1} failed: {e}")
            print(f"  Raw content was: {raw_content[:500]}")
            if attempt == 1:
                return JSONResponse(
                    status_code=500,
                    content={"error": "Failed to process screen, please try again"},
                )

    return JSONResponse(
        status_code=500,
        content={"error": "Failed to process screen, please try again"},
    )
