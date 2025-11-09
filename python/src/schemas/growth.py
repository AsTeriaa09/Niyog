from pydantic import BaseModel


class GrowthInsightsRequest(BaseModel):
    current_level: str
    goals: list[str]


class GrowthInsightsResponse(BaseModel):
    current_level: str
    roadmap: list[str]
    goal_count: int