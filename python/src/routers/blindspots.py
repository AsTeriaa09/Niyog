from fastapi import APIRouter
from src.schemas.blindspots import BlindSpotsRequest, BlindSpotsResponse
from src.services.blindspots_service import analyze_blind_spots

router = APIRouter()


@router.post("/ai/blind-spots", response_model=BlindSpotsResponse)
async def blind_spots(req: BlindSpotsRequest):
    return analyze_blind_spots(req.skills, req.target_role)