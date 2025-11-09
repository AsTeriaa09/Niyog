from fastapi import APIRouter
from src.schemas.interview import InterviewSimRequest, InterviewSimResponse
from src.services.interview_service import simulate_interview

router = APIRouter()


@router.post("/ai/interview-simulator", response_model=InterviewSimResponse)
async def interview_simulator(req: InterviewSimRequest):
    return simulate_interview(req.role, req.difficulty, req.questions)