Deployment notes
================

Problem: Vercel attempted to package the Python backend and reported:

  Total bundle size (690.18 MB) exceeds Lambda ephemeral storage limit (500 MB).

Cause: the repository contains heavyweight Python dependencies and model artifacts. Vercel serverless functions (the default when Vercel detects Python files) must fit within the Lambda ephemeral storage limit.

Recommended approaches
----------------------

1) Deploy frontend to Vercel only (recommended for this repo)

- Vercel should host the React frontend located at `frontend_extracted/`.
- A `.vercelignore` file is provided to prevent the Python backend, model files and datasets from being uploaded to Vercel.
- In the Vercel project settings, set the **Root Directory** to the repository root (the `.vercelignore` will ensure only `frontend_extracted/` is used), or set it explicitly to `frontend_extracted/`.

2) Deploy the Python backend as a container service (recommended)

- A `Dockerfile` is included for the backend. Container platforms (Render, Railway, Fly, AWS ECS, Google Cloud Run) allow the full model and dependencies without the 500 MB Lambda limit.
- Example Render (Docker) steps:

  1. Create a new Web Service on Render and connect the GitHub repo.
  2. Select "Docker" as the environment and point to the repository root (Dockerfile will be used).
  3. Set the startup command (optional): `uvicorn backend:app --host 0.0.0.0 --port 10000` and the service will expose the API.

- Example local test (build & run):

```bash
docker build -t fake-news-backend .
docker run -p 8000:8000 fake-news-backend
# then visit http://localhost:8000/health
```

3) Alternative: split or slim the serverless function

- Convert the model pipeline to a lighter runtime (ONNX + onnxruntime) or reimplement TF-IDF inference using the saved vocabulary to avoid `scikit-learn` at runtime. This is more involved but can allow serverless deployment.

What I added to this repo
-------------------------
- `.vercelignore` — avoids uploading Python backend and large artifacts to Vercel.
- `Dockerfile` — container image for the backend (used by Render/Fly/Cloud Run/etc.).
- `DEPLOYMENT.md` — instructions and recommendations.

Next steps I can take for you
----------------------------
- Open a PR that introduces these files (I already pushed a branch `vercel-entrypoint-fix`).
- Create a short GitHub Actions workflow to build and push the backend Docker image to a registry (requires your registry credentials).
- Convert the model to ONNX to enable a smaller serverless deployment (requires running the training/conversion locally or in CI).

Tell me which of the next steps you want me to do.
