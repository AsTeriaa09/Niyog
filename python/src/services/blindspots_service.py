def analyze_blind_spots(skills: list[str], target_role: str) -> dict:
    known = {s.lower() for s in skills}
    role_expectations = {"data scientist": {"python", "statistics", "ml", "docker", "sql"}}
    expectations = role_expectations.get(target_role.lower(), set())
    blind_spots = sorted(expectations - known)
    recommendations = [f"Study {s}" for s in blind_spots]
    return {"blind_spots": blind_spots, "recommendations": recommendations}