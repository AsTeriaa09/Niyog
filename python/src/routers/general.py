from fastapi import APIRouter
from src.schemas.general import EchoRequest, CompletionRequest
import os
import httpx
from fastapi import HTTPException

router = APIRouter()


@router.get("/health")
async def health():
    return {"status": "ok"}


@router.post("/ai/echo")
async def ai_echo(req: EchoRequest):
    return {"echo": req.message}


@router.post("/ai/complete")
async def ai_complete(req: CompletionRequest):
    api_key = os.getenv("OPENAI_API_KEY")
    if not api_key:
        raise HTTPException(status_code=500, detail="OPENAI_API_KEY not configured")
    url = "https://api.openai.com/v1/completions"
    headers = {"Authorization": f"Bearer {api_key}", "Content-Type": "application/json"}
    payload = {
        "model": req.model,
        "prompt": req.prompt,
        "max_tokens": req.max_tokens,
        "temperature": 0.7,
    }
    async with httpx.AsyncClient(timeout=30) as client:
        r = await client.post(url, headers=headers, json=payload)
        if r.status_code != 200:
            raise HTTPException(status_code=r.status_code, detail=r.text)
        data = r.json()
    text = data.get("choices", [{}])[0].get("text", "").strip()
    return {"completion": text, "model": req.model}