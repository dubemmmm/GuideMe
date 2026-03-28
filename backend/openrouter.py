from __future__ import annotations

import os

import httpx


OPENROUTER_URL = "https://openrouter.ai/api/v1/chat/completions"
MODEL_NAME = "google/gemini-2.0-flash-001"
TIMEOUT_SECONDS = 30.0


class OpenRouterError(Exception):
    pass


def _extract_content(message_content: str | list[dict]) -> str:
    if isinstance(message_content, str):
        return message_content

    text_parts: list[str] = []
    for item in message_content:
        if item.get("type") == "text" and item.get("text"):
            text_parts.append(item["text"])

    return "\n".join(text_parts)


async def analyze_kiosk_screen(image_base64: str, system_prompt: str) -> str:
    api_key = os.getenv("OPENROUTER_API_KEY")
    if not api_key:
        raise OpenRouterError("OPENROUTER_API_KEY is not set")

    payload = {
        "model": MODEL_NAME,
        "messages": [
            {"role": "system", "content": system_prompt},
            {
                "role": "user",
                "content": [
                    {
                        "type": "text",
                        "text": "Analyze this kiosk screen image and respond with JSON only.",
                    },
                    {
                        "type": "image_url",
                        "image_url": {
                            "url": f"data:image/jpeg;base64,{image_base64}",
                        },
                    },
                ],
            },
        ],
    }

    headers = {
        "Authorization": f"Bearer {api_key}",
        "Content-Type": "application/json",
    }

    try:
        async with httpx.AsyncClient(timeout=TIMEOUT_SECONDS) as client:
            response = await client.post(
                OPENROUTER_URL,
                headers=headers,
                json=payload,
            )
            response.raise_for_status()
    except httpx.HTTPError as exc:
        raise OpenRouterError("OpenRouter request failed") from exc

    try:
        data = response.json()
        content = data["choices"][0]["message"]["content"]
    except (KeyError, IndexError, TypeError, ValueError) as exc:
        raise OpenRouterError("OpenRouter response was malformed") from exc

    parsed_content = _extract_content(content).strip()
    if not parsed_content:
        raise OpenRouterError("OpenRouter returned empty content")

    # Strip markdown code fences if present (```json ... ```)
    if parsed_content.startswith("```"):
        lines = parsed_content.split("\n")
        # Remove first line (```json) and last line (```)
        lines = [l for l in lines if not l.strip().startswith("```")]
        parsed_content = "\n".join(lines).strip()

    return parsed_content
