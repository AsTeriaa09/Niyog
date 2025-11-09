def analyse_profile(summary: str) -> dict:
    summary_len = len(summary.split())
    strengths = ["Clear communication", "Domain familiarity"] if summary_len > 20 else ["Concise"]
    gaps = ["Expand technical depth"] if summary_len < 50 else []
    return {"word_count": summary_len, "strengths": strengths, "gaps": gaps}