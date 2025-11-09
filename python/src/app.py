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


class MatchRequest(BaseModel):
    candidate_skills: list[str]
    job_skills: list[str]


class CVAnalysisRequest(BaseModel):
    cv_text: str


class ProfileAnalysisRequest(BaseModel):
    profile_summary: str


class InterviewSimRequest(BaseModel):
    role: str
    difficulty: str = "medium"
    questions: int = 5


class BlindSpotsRequest(BaseModel):
    skills: list[str]
    target_role: str


class GrowthInsightsRequest(BaseModel):
    current_level: str
    goals: list[str]


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


@app.post("/ai/match")
async def ai_match(req: MatchRequest):
    candidate = set(s.lower() for s in req.candidate_skills)
    job = set(s.lower() for s in req.job_skills)
    overlap = candidate & job
    missing = job - candidate
    score = round((len(overlap) / len(job)) * 100, 2) if job else 0.0
    return {"match_score": score, "overlap": sorted(overlap), "missing": sorted(missing)}


_latest_cv_analysis: dict | None = None


@app.post("/ai/cv-analysis")
async def ai_cv_analysis(req: CVAnalysisRequest):
    # naive keyword extraction placeholder
    words = [w.strip(".,") for w in req.cv_text.split() if len(w) > 3]
    top = sorted({w.lower() for w in words})[:20]
    suggestions = ["Add measurable achievements", "Include recent relevant certifications", "Tailor summary to target role"]
    global _latest_cv_analysis
    _latest_cv_analysis = {"keywords": top, "suggestions": suggestions}
    return _latest_cv_analysis


@app.get("/ai/cv-analysis")
async def ai_get_latest_cv_analysis():
    if not _latest_cv_analysis:
        raise HTTPException(status_code=404, detail="No CV analysis yet")
    return _latest_cv_analysis


@app.post("/ai/analyse-profile")
async def ai_analyse_profile(req: ProfileAnalysisRequest):
    summary_len = len(req.profile_summary.split())
    strengths = ["Clear communication", "Domain familiarity"] if summary_len > 20 else ["Concise"]
    from fastapi import FastAPI
    from fastapi.middleware.cors import CORSMiddleware
    import os
    from dotenv import load_dotenv

    # Load env
    load_dotenv()

    app = FastAPI(title="Niyog AI Backend", version="0.2.0")

    # CORS
    origins_env = os.getenv("ALLOWED_ORIGINS", "http://localhost:3000")
    allowed_origins = [o.strip() for o in origins_env.split(",") if o.strip()]
    app.add_middleware(
        CORSMiddleware,
        allow_origins=allowed_origins,
        allow_credentials=True,
        allow_methods=["*"],
        allow_headers=["*"],
    )

    # Routers
    from src.routers.root import router as root_router
    from src.routers.general import router as general_router
    from src.routers.openai_api import router as openai_router
    from src.routers.match import router as match_router
    from src.routers.cv import router as cv_router
    from src.routers.profile import router as profile_router
    from src.routers.interview import router as interview_router
    from src.routers.blindspots import router as blindspots_router
    from src.routers.growth import router as growth_router

    app.include_router(root_router)
    app.include_router(general_router)
    app.include_router(openai_router)
    app.include_router(match_router)
    app.include_router(cv_router)
    app.include_router(profile_router)
    app.include_router(interview_router)
    app.include_router(blindspots_router)
    app.include_router(growth_router)
            "/ai/complete",
