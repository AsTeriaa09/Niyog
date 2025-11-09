from fastapi import APIRouter, HTTPException
from src.schemas.cv import CVAnalysisRequest, CVAnalysisResponse
from src.services.cv_service import analyze_cv_text, get_latest_cv_analysis

router = APIRouter()


@router.post("/ai/cv-analysis", response_model=CVAnalysisResponse)
async def cv_analysis(req: CVAnalysisRequest):
    return analyze_cv_text(req.cv_text)


@router.get("/ai/cv-analysis", response_model=CVAnalysisResponse)
async def cv_analysis_latest():
    try:
        return get_latest_cv_analysis()
    except LookupError:
        raise HTTPException(status_code=404, detail="No CV analysis yet")