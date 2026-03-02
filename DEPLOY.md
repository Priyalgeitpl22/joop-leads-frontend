# Deploy (GitLab CI/CD with Docker)

Pushes to **`dev`** build a Docker image (staging env), push to GitLab Container Registry, and deploy to the **dev server**. Pushes to **`main`** or **`prod`** do the same for **prod server** (production image).

## Pipeline flow

1. **Build**: Build Docker image (`BUILD_MODE=staging` for dev, `production` for prod), push to `$CI_REGISTRY_IMAGE:dev` or `:latest`.
2. **Deploy**: SSH to the target server, `docker pull`, then `docker run` (stop/remove existing container first). Container name: `jooper-frontend`, port: `80:80`.

## GitLab CI/CD variables

In your project: **Settings → CI/CD → Variables**. Add:

| Variable | Description | Protected / Masked |
|----------|-------------|---------------------|
| `SSH_PRIVATE_KEY` | One SSH private key for both servers (add its public key to both servers) | ✅ Masked |
| `DEV_SERVER_HOST` | Dev server hostname or IP | — |
| `DEV_SERVER_USER` | SSH user on dev server (e.g. `root`, `deploy`) | — |
| `PROD_SERVER_HOST` | Prod server hostname or IP | — |
| `PROD_SERVER_USER` | SSH user on prod server | — |

GitLab provides `CI_REGISTRY`, `CI_REGISTRY_IMAGE`, `CI_REGISTRY_USER`, `CI_REGISTRY_PASSWORD` automatically. Ensure **Container Registry** is enabled for the project.

## Server setup

On **each** server:

1. **Docker**: Install Docker (e.g. `curl -fsSL https://get.docker.com | sh`).
2. **Log in to GitLab Container Registry** (once per server):
   - In GitLab: **Deploy Tokens** (Project → Settings → Repository → Deploy Tokens) or use **CI_REGISTRY_USER** / **CI_REGISTRY_PASSWORD** from a job.
   - On the server:
     ```bash
     docker login -u <deploy-token-username> -p <deploy-token-password> registry.gitlab.com
     ```
   - Or use a **Project Access Token** with `read_registry` and log in with that.
3. **SSH**: The SSH user must be able to run `docker` (e.g. in the `docker` group: `usermod -aG docker $USER`).
4. **Port 80**: Must be free for the frontend container (or change `-p 80:80` in the pipeline to another host port).

No nginx install on the host: the app runs inside the container (nginx serves the built files).

## Branches

| Branch | Docker build | Image tag | Deploy to |
|--------|--------------|-----------|-----------|
| `dev` | `BUILD_MODE=staging` (uses `.env.staging`) | `:dev` | Dev server |
| `main` or `prod` | `BUILD_MODE=production` (uses `.env.production`) | `:latest` | Prod server |

Ensure `.env.staging` and `.env.production` in the repo (or build-time CI variables) point to the correct API URLs for each environment.
