from pydantic import BaseModel


class BlindSpotsRequest(BaseModel):
    skills: list[str]
    target_role: str


class BlindSpotsResponse(BaseModel):
    blind_spots: list[str]
    recommendations: list[str]