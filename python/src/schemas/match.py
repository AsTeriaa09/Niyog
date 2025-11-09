from pydantic import BaseModel


class MatchRequest(BaseModel):
    candidate_skills: list[str]
    job_skills: list[str]


class MatchResponse(BaseModel):
    match_score: float
    overlap: list[str]
    missing: list[str]