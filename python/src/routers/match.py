from fastapi import APIRouter
from src.schemas.match import MatchRequest, MatchResponse
from src.services.matching_service import compute_match

router = APIRouter()


@router.post("/ai/match", response_model=MatchResponse)
async def ai_match(req: MatchRequest):
    result = compute_match(req.candidate_skills, req.job_skills)
    return result