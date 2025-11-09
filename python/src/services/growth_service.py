def generate_growth_insights(current_level: str, goals: list[str]) -> dict:
    roadmap = [f"Milestone: progress toward {g}" for g in goals]
    return {"current_level": current_level, "roadmap": roadmap, "goal_count": len(goals)}