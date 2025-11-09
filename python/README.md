# Niyog FastAPI backend

This folder contains a minimal FastAPI service to host AI-related APIs for Niyog. It lives only on the `Python` branch so `main` stays clean.

## Quick start (Windows PowerShell)

1. Create and activate a virtual environment

```powershell
cd python
python -m venv .venv
.\.venv\Scripts\Activate.ps1
```

2. Install dependencies

```powershell
pip install -r requirements.txt
```

3. Configure environment

```powershell
Copy-Item .env.example .env
# then edit .env and set OPENAI_API_KEY if you plan to use /ai/complete
```

4. Run the server

```powershell
uvicorn src.app:app --reload --port 8000
```

The API will be available at http://localhost:8000

## Endpoints

- GET `/health` → `{ "status": "ok" }`
- POST `/ai/echo` → echoes your message
- POST `/ai/complete` → calls AI provider (OpenAI). Requires `OPENAI_API_KEY`.
- POST `/ai/match` → basic skills overlap scoring
- POST `/ai/cv-analysis` → extract keywords and suggestions from CV text (placeholder logic)
- GET `/ai/cv-analysis` → return latest CV analysis in memory
- POST `/ai/analyse-profile` → analyse profile summary for strengths and gaps
- POST `/ai/interview-simulator` → generate a set of interview questions
- POST `/ai/blind-spots` → identify skills missing for a target role
- POST `/ai/growth-insights` → produce a simple growth roadmap

### Example: echo

```bash
curl -X POST http://localhost:8000/ai/echo -H "Content-Type: application/json" -d '{"message":"hello"}'
```

### Example: completion

```bash
curl -X POST http://localhost:8000/ai/complete -H "Content-Type: application/json" -d '{"prompt":"Say hi","max_tokens":16}'
```

### Example: match

```bash
curl -X POST http://localhost:8000/ai/match -H "Content-Type: application/json" -d '{"candidate_skills":["Python","SQL"],"job_skills":["Python","Docker","SQL"]}'
```

### Example: CV analysis

```bash
curl -X POST http://localhost:8000/ai/cv-analysis -H "Content-Type: application/json" -d '{"cv_text":"Experienced developer skilled in Python and FastAPI."}'
curl http://localhost:8000/ai/cv-analysis
```

## CORS

By default, CORS allows `http://localhost:3000`. Override by setting `ALLOWED_ORIGINS` in `.env` (comma-separated).

## Docker (optional)

Build and run from this `python` folder:

```powershell
docker build -t niyog-fastapi .
docker run -p 8000:8000 --env-file .env niyog-fastapi
```

## Frontend usage (Next.js)

Fetch from the Next.js app (dev):

```ts
// example inside a React server action or route handler
const res = await fetch("http://localhost:8000/ai/echo", {
  method: "POST",
  headers: { "Content-Type": "application/json" },
  body: JSON.stringify({ message: "hello" }),
});
const data = await res.json();
```

## Tests

```powershell
pytest -q
```

If imports fail in tests, ensure you are running `pytest` from the `python` folder with the venv activated.

## Project structure

```
python/
  src/
    app.py                # FastAPI app, registers routers
    routers/
      root.py             # / (root)
      general.py          # /health, /ai/echo, /ai/complete
      match.py            # /ai/match
      cv.py               # /ai/cv-analysis (POST/GET)
      profile.py          # /ai/analyse-profile
      interview.py        # /ai/interview-simulator
      blindspots.py       # /ai/blind-spots
      growth.py           # /ai/growth-insights
    schemas/
      general.py, match.py, cv.py, profile.py, interview.py, blindspots.py, growth.py
    services/
      matching_service.py, cv_service.py, profile_service.py, interview_service.py, blindspots_service.py, growth_service.py
```

All endpoints and paths remain the same; logic has been moved into services and schemas for maintainability.

## Diagrams

<div align="center">
  <img src="images for readme/ai-workflow.png" alt="AI Workflow" width="640" />
  <br />
  <img src="images for readme/ER-Diagram.png" alt="ER Diagram" width="640" />
  <br />
  <img src="images for readme/Niyog-Squence-Diagram.png" alt="Sequence Diagram" width="640" />
  <br />
  <img src="images for readme/Niyog-UserWorkFlow.png" alt="User Workflow" width="640" />
</div>
