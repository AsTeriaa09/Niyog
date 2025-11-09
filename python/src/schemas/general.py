from pydantic import BaseModel


class EchoRequest(BaseModel):
    message: str


class CompletionRequest(BaseModel):
    prompt: str
    max_tokens: int = 64
    model: str = "gpt-3.5-turbo-instruct"