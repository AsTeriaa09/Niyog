from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
import os
import httpx
from dotenv import load_dotenv

load_dotenv()  # load .env if present

app = FastAPI(title="Niyog AI Backend", version="0.1.0")

origins_env = os.getenv("ALLOWED_ORIGINS", "http://localhost:3000")
allowed_origins = [o.strip() for o in origins_env.split(",") if o.strip()]

app.add_middleware(
    CORSMiddleware,
    allow_origins=allowed_origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


class EchoRequest(BaseModel):
    message: str


class CompletionRequest(BaseModel):
    prompt: str
    max_tokens: int = 64
    model: str = "gpt-3.5-turbo-instruct"


@app.get("/health")
async def health():
    return {"status": "ok"}


@app.post("/ai/echo")
async def ai_echo(req: EchoRequest):
    return {"echo": req.message}


@app.post("/ai/complete")
async def ai_complete(req: CompletionRequest):
    api_key = os.getenv("OPENAI_API_KEY")
    if not api_key:
        raise HTTPException(status_code=500, detail="OPENAI_API_KEY not configured")

    # This uses the legacy completions endpoint for instruct models; adapt as needed.
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
    # Normalize response text
    text = data.get("choices", [{}])[0].get("text", "").strip()
    return {"completion": text, "model": req.model}


@app.get("/")
async def root():
    return {"name": "Niyog AI Backend", "endpoints": ["/health", "/ai/echo", "/ai/complete"]}
