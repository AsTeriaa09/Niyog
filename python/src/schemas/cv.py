from pydantic import BaseModel


class CVAnalysisRequest(BaseModel):
    cv_text: str


class CVAnalysisResponse(BaseModel):
    keywords: list[str]
    suggestions: list[str]