from fastapi import APIRouter
from src.schemas.growth import GrowthInsightsRequest, GrowthInsightsResponse
from src.services.growth_service import generate_growth_insights

router = APIRouter()


@router.post("/ai/growth-insights", response_model=GrowthInsightsResponse)
async def growth_insights(req: GrowthInsightsRequest):
    return generate_growth_insights(req.current_level, req.goals)