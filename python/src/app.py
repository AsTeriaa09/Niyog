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
    gaps = ["Expand technical depth"] if summary_len < 50 else []
    return {"word_count": summary_len, "strengths": strengths, "gaps": gaps}


@app.post("/ai/interview-simulator")
async def ai_interview_sim(req: InterviewSimRequest):
    base_questions = [
        f"Describe a challenge you faced in {req.role} and how you solved it.",
        f"How do you keep your {req.role} skills up to date?",
        f"Explain a recent project related to {req.role}.",
        f"What would you improve in your last {req.role} project?",
        f"How do you handle tight deadlines in {req.role}?",
    ]
    selected = base_questions[: req.questions]
    difficulty_factor = {"easy": 0.8, "medium": 1.0, "hard": 1.2}.get(req.difficulty, 1.0)
    return {"questions": selected, "difficulty": req.difficulty, "complexity_multiplier": difficulty_factor}


@app.post("/ai/blind-spots")
async def ai_blind_spots(req: BlindSpotsRequest):
    known = set(s.lower() for s in req.skills)
    role_expectations = {"data scientist": {"python", "statistics", "ml", "docker", "sql"}}
    expectations = role_expectations.get(req.target_role.lower(), set())
    blind_spots = sorted(expectations - known)
    recommendations = [f"Study {s}" for s in blind_spots]
    return {"blind_spots": blind_spots, "recommendations": recommendations}


@app.post("/ai/growth-insights")
async def ai_growth_insights(req: GrowthInsightsRequest):
    roadmap = [f"Milestone: progress toward {g}" for g in req.goals]
    return {"current_level": req.current_level, "roadmap": roadmap, "goal_count": len(req.goals)}


@app.get("/")
async def root():
    return {
        "name": "Niyog AI Backend",
        "endpoints": [
            "/health",
            "/ai/echo",
            "/ai/complete",
            "/ai/match",
            "/ai/cv-analysis (POST/GET)",
            "/ai/analyse-profile",
            "/ai/interview-simulator",
            "/ai/blind-spots",
            "/ai/growth-insights",
        ],
    }
