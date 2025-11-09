def simulate_interview(role: str, difficulty: str = "medium", questions: int = 5) -> dict:
    base_questions = [
        f"Describe a challenge you faced in {role} and how you solved it.",
        f"How do you keep your {role} skills up to date?",
        f"Explain a recent project related to {role}.",
        f"What would you improve in your last {role} project?",
        f"How do you handle tight deadlines in {role}?",
    ]
    selected = base_questions[: questions]
    difficulty_factor = {"easy": 0.8, "medium": 1.0, "hard": 1.2}.get(difficulty, 1.0)
    return {"questions": selected, "difficulty": difficulty, "complexity_multiplier": difficulty_factor}