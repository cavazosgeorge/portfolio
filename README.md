# George Cavazos Portfolio

George's portfolio and technical writing site. One Bun/Hono service hosts the portfolio, blog subdomain, content APIs, contact form, and authenticated CMS.

## Architecture

- React 18, TypeScript and Vite for the portfolio and writing
- Project-owned shadcn/ui components (Radix), Tailwind v4 through PostCSS, semantic CSS variables
- Chakra UI retained in the authenticated CMS, loaded separately from public pages
- Bun/Hono and SQLite for projects, experience, skills, settings, blog posts, sessions and contact messages
- Docker image deployed by Coolify from `main`

Public URLs: [portfolio](https://www.cavazosgeorge.com) and [writing](https://www.blog.cavazosgeorge.com). CMS: `/admin/login`. Blog routes are hostname-based, including `blog.localhost` during development.

## UI and content contracts

The [design system](docs/DESIGN_SYSTEM.md) documents typography, palette, responsive layout and component choices. The development-only `/design-system` route shows controls, focus, disabled, pending and error states. [Refactor verification](docs/UI_REFACTOR_2026-09-22.md) records review findings and the release checklist.

The public spotlight preserves the first three non-draft featured projects in API order. The archive contains the remaining published projects in that order; database featured/archive flags are never rewritten. Existing About paragraph selection, technology truncation, contact actions, blog ordering, SEO title/description and routes remain intact. CMS images take precedence over bundled public-demo screenshots. No resume link is configured in the existing site; the refactor does not invent one.

The `data-theme` attribute and `color-mode` localStorage key retain light/dark choices. A blocking bootstrap applies the theme before React. Theme tokens include compatibility aliases for the CMS. The Radix button and sheet overlay forward refs for React 18 focus management.

## Development and QA

Use an isolated SQLite copy for editing/QA; never mount the production database into a development server. `PORTFOLIO_API_URL` overrides Vite's default `http://localhost:3000` proxy, useful when another local app already occupies that port. The contact endpoint stores messages in the CMS; it does not send email.

Verification includes lint, type checks, project-presentation regression tests, a production build and image, read-only API/asset checks, and browser checks. Browser review must cover phone, tablet and desktop, both themes, menu focus/keyboard operation, project destinations, contact success/error/pending behavior, published and missing blog routes, and authenticated CMS reload. Screenshot evidence is kept outside the repository. Automated accessibility audits supplement manual checks.

## Production and rollback

Coolify application `n48ssc88kgcow4s0ow4ksco8` watches `main`, builds `/Dockerfile` and exposes port 3000. Work remains on the existing `development` branch; publish its reviewed commit to `development` and then `main` without switching branches. Inspect Coolify before issuing a manual deploy, so an already-running automatic deployment is not duplicated.

SQLite lives at `/app/data/portfolio.db` in volume `n48ssc88kgcow4s0ow4ksco8-portfolio-data`. Never replace the volume with a repository or QA database. Take a consistent `VACUUM INTO` backup and record the running image before deployment. Compare content rows/ordering/flags afterward, allowing new user activity. Existing container startup rehashes the configured admin password; verify login and compare user identity separately from the salted password hash.

This refactor needs no database migration. Roll back by deploying the previously verified source revision against the same persistent volume. The pre-refactor revision is `6163968d9626129bfa484e13e2d75a62cf8ae769`. The initial release backup is `/root/portfolio-backups/2026-09-22-ui/portfolio.db`. Preserve current data during an image rollback; restoring a database is a separate recovery action.

The release client reads the existing protected `~/.config/coolify/token` (or `COOLIFY_TOKEN`), never prints environment values, and leaves normal releases on `main`/`HEAD`. A rollback pins an exact commit; use `track-main` when deliberately restoring future branch tracking.

## Exact runnable commands

```bash
cd /Users/georgecavazos/Desktop/projects/portfolio

# Install and validate
bun install --frozen-lockfile
bun run lint
bun run typecheck
bun run test
bun run build
PATH=/Users/georgecavazos/.cache/codex-runtimes/codex-primary-runtime/dependencies/node/bin:$PATH \
  npx -y react-doctor@latest . --verbose --scope changed --base HEAD

# Start an isolated local API (keep the printed directory for the second shell)
portfolio_qa_dir="$(mktemp -d)"
cp data/portfolio.db "$portfolio_qa_dir/portfolio.db"
printf '%s\n' "$portfolio_qa_dir"
DB_PATH="$portfolio_qa_dir/portfolio.db" PORT=3107 bun run dev:server

# In another shell: portfolio, writing and component showcase
cd /Users/georgecavazos/Desktop/projects/portfolio
PORTFOLIO_API_URL=http://127.0.0.1:3107 bun run dev --host 127.0.0.1
# http://localhost:5173
# http://blog.localhost:5173
# http://localhost:5173/design-system

# Build the production image and run against a fresh isolated copy
# This directory must be retained when restarting the QA container.
portfolio_container_qa="$(mktemp -d)"
cp data/portfolio.db "$portfolio_container_qa/portfolio.db"
docker build --platform linux/amd64 -t portfolio:ui-qa .
docker run -d --name portfolio-ui-qa --platform linux/amd64 \
  -p 127.0.0.1:3108:3000 \
  --mount "type=bind,src=$portfolio_container_qa,dst=/app/data" portfolio:ui-qa
docker logs --tail=30 portfolio-ui-qa
# Once the server reports ready:
bun run ops/verify-public.ts http://127.0.0.1:3108
# Verify persistence, then repeat browser/API checks:
docker restart portfolio-ui-qa

# Read-only accessibility audits (requires Chrome and a current Node runtime)
bunx --bun lighthouse http://localhost:5173 --only-categories=accessibility \
  --chrome-flags=--headless --output=html --output-path=/tmp/portfolio-accessibility.html
bunx --bun lighthouse http://blog.localhost:5173/jev-in-the-workflow \
  --only-categories=accessibility --chrome-flags=--headless \
  --output=html --output-path=/tmp/portfolio-article-accessibility.html

# Confirm checkout and remote state; inspect the exact staged diff before committing.
git branch --show-current
git rev-parse HEAD
git status --short
git diff --check
git diff --cached
git ls-remote origin refs/heads/development refs/heads/main

# Back up production and inspect deployment configuration before an authorized release
bash ops/backup-production.sh
python3 ops/release.py status

# Publish the explicitly reviewed commit already on development; never force-push
git push origin development
git push origin development:main

# Manual deployment only if Coolify has not already started the same revision
python3 ops/release.py deploy
# Copy the deployment UUID returned by Coolify into this prompt:
read -r portfolio_deployment_id
python3 ops/release.py deployment "$portfolio_deployment_id"

# Verify live endpoints and then complete browser/CMS/data checks
bun run ops/verify-public.ts https://www.cavazosgeorge.com
bun run ops/verify-public.ts https://www.blog.cavazosgeorge.com
ssh -o BatchMode=yes root@178.156.183.58 \
  'docker ps --filter name=n48ssc88kgcow4s0ow4ksco8 --format "{{.Names}} {{.Image}}"'

# Rollback only when needed; leaves the current persistent volume intact
python3 ops/release.py rollback 6163968d9626129bfa484e13e2d75a62cf8ae769
# After reviewing the intended next release, restore normal tracking without deploying:
python3 ops/release.py track-main
```
