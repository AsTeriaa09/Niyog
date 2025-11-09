from pydantic import BaseModel


class InterviewSimRequest(BaseModel):
    role: str
    difficulty: str = "medium"
    questions: int = 5


class InterviewSimResponse(BaseModel):
    questions: list[str]
    difficulty: str
    complexity_multiplier: float