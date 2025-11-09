from typing import Iterable, Set


def compute_match(candidate_skills: Iterable[str], job_skills: Iterable[str]) -> dict:
    candidate: Set[str] = {s.lower() for s in candidate_skills}
    job: Set[str] = {s.lower() for s in job_skills}
    overlap = candidate & job
    missing = job - candidate
    score = round((len(overlap) / len(job)) * 100, 2) if job else 0.0
    return {"match_score": score, "overlap": sorted(overlap), "missing": sorted(missing)}