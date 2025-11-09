from pydantic import BaseModel


class ProfileAnalysisRequest(BaseModel):
    profile_summary: str


class ProfileAnalysisResponse(BaseModel):
    word_count: int
    strengths: list[str]
    gaps: list[str]