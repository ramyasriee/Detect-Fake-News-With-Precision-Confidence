"""Vercel entrypoint for the FastAPI backend.

This module exports a top-level ``app`` object so Vercel can detect and
serve the API correctly. Run the Streamlit UI with:

    streamlit run streamlit_app.py
"""

from backend import app


if __name__ == "__main__":
    import uvicorn

    uvicorn.run("backend:app", host="0.0.0.0", port=8000, reload=False)