# Niyog

## Backend (FastAPI) on Python branch

This repository now includes a FastAPI backend under `python/` on the `Python` branch for AI-related APIs.

Quick start (Windows PowerShell):

1. Checkout the `Python` branch (already active if you see this).
2. Create a venv and install deps:

```powershell
cd python
python -m venv .venv
.\.venv\Scripts\Activate.ps1
pip install -r requirements.txt
Copy-Item .env.example .env
# edit .env and set OPENAI_API_KEY if needed
uvicorn src.app:app --reload --port 8000
```

The API runs at http://localhost:8000 with endpoints `/health`, `/ai/echo`, `/ai/complete`.

Frontend (Next.js) can call it via fetch from `http://localhost:8000` in development.
