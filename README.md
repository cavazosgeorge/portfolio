# George Cavazos Portfolio

George's portfolio and technical writing site. One Bun/Hono service hosts the portfolio, blog subdomain, content APIs, contact form, and authenticated CMS.

## Architecture

- React, TypeScript, Vite, and Chakra UI for the portfolio, blog, and CMS
- Bun and Hono for the application server and JSON APIs
- SQLite for projects, experience, skills, settings, blog posts, sessions, and contact messages
- Docker for the production image
- Coolify for production deployment from the `main` branch

The production database lives at `/app/data/portfolio.db` on a persistent Coolify volume. Never replace that volume with the repository's development database.

## Local development

Install dependencies, start the API on port 3000, then start Vite on port 5173. Vite proxies `/api` requests to the API service.

The admin UI is available at `/admin/login`. Set `ADMIN_EMAIL` and `ADMIN_PASSWORD` before running the seed command if a local administrator is needed.

## Production deployment

Coolify watches `main`, builds `/Dockerfile`, exposes port 3000, and retains `/app/data` across releases. A push to `main` should trigger deployment automatically. Confirm the deployment in Coolify and verify the public health endpoint and content APIs before considering a release complete.

## Reusable commands

```bash
# Install and develop
bun install --frozen-lockfile
bun run dev:server
bun run dev

# Validate a change
bun run lint
bun run build
npx -y react-doctor@latest . --verbose --scope changed

# Run the production server locally against an isolated database copy
portfolio_qa_dir="$(mktemp -d)"
cp data/portfolio.db "$portfolio_qa_dir/portfolio.db"
PORT=3000 DB_PATH="$portfolio_qa_dir/portfolio.db" bun run start

# Build and run the production container locally
docker compose up --build -d
docker compose logs --tail=100 portfolio

# Verify a running deployment
curl --fail --show-error https://www.cavazosgeorge.com/health
curl --fail --show-error https://www.cavazosgeorge.com/api/projects
curl --fail --show-error https://www.blog.cavazosgeorge.com/api/blog

# Publish the already-reviewed development commit to both tracked branches
git push origin development
git push origin development:main
```
