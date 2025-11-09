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

### Example: echo

```bash
curl -X POST http://localhost:8000/ai/echo -H "Content-Type: application/json" -d '{"message":"hello"}'
```

### Example: completion

```bash
curl -X POST http://localhost:8000/ai/complete -H "Content-Type: application/json" -d '{"prompt":"Say hi","max_tokens":16}'
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
