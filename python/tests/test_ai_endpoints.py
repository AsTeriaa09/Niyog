import os
import sys

BASE_DIR = os.path.abspath(os.path.join(os.path.dirname(__file__), ".."))
if BASE_DIR not in sys.path:
    sys.path.insert(0, BASE_DIR)

from fastapi.testclient import TestClient  # type: ignore
from src.app import app


client = TestClient(app)


def test_cv_analysis_post_and_get():
    r = client.post("/ai/cv-analysis", json={"cv_text": "Experienced developer skilled in Python, SQL, and FastAPI."})
    assert r.status_code == 200
    data = r.json()
    assert "keywords" in data
    r2 = client.get("/ai/cv-analysis")
    assert r2.status_code == 200


def test_match_basic():
    r = client.post(
        "/ai/match",
        json={"candidate_skills": ["Python", "SQL"], "job_skills": ["Python", "Docker", "SQL"]},
    )
    assert r.status_code == 200
    data = r.json()
    assert "match_score" in data and isinstance(data["match_score"], (int, float))
