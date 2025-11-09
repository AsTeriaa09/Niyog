from fastapi import APIRouter

router = APIRouter()


@router.get("/")
async def root():
    return {"name": "Niyog AI Backend", "version": "0.2.0"}