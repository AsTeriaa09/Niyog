from fastapi import APIRouter
from src.schemas.profile import ProfileAnalysisRequest, ProfileAnalysisResponse
from src.services.profile_service import analyse_profile

router = APIRouter()


@router.post("/ai/analyse-profile", response_model=ProfileAnalysisResponse)
async def analyse_profile_endpoint(req: ProfileAnalysisRequest):
    result = analyse_profile(req.profile_summary)
    return result