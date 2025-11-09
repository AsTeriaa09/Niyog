from typing import Optional

_latest_cv_analysis: Optional[dict] = None


def analyze_cv_text(cv_text: str) -> dict:
    global _latest_cv_analysis
    words = [w.strip(".,") for w in cv_text.split() if len(w) > 3]
    top = sorted({w.lower() for w in words})[:20]
    suggestions = [
        "Add measurable achievements",
        "Include recent relevant certifications",
        "Tailor summary to target role",
    ]
    _latest_cv_analysis = {"keywords": top, "suggestions": suggestions}
    return _latest_cv_analysis


def get_latest_cv_analysis() -> dict:
    if _latest_cv_analysis is None:
        raise LookupError("No CV analysis yet")
    return _latest_cv_analysis