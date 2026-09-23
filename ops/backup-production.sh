#!/usr/bin/env bash
set -euo pipefail
ssh -o BatchMode=yes root@178.156.183.58 'bash -s' <<'REMOTE'
set -euo pipefail
portfolio_container=$(docker ps --filter name=n48ssc88kgcow4s0ow4ksco8 --format '{{.Names}}')
if [[ -z "$portfolio_container" || "$portfolio_container" == *$'\n'* ]]; then
  echo 'Expected one running portfolio container; inspect deployment state before backing up.' >&2
  exit 1
fi
portfolio_stamp=$(date -u +%Y%m%dT%H%M%SZ)
portfolio_backup="/root/portfolio-backups/$portfolio_stamp"
portfolio_temp="/tmp/portfolio-$portfolio_stamp.db"
mkdir -p "$portfolio_backup"
chmod 700 "$portfolio_backup"
docker exec -e PORTFOLIO_BACKUP_FILE="$portfolio_temp" "$portfolio_container" bun -e 'import { Database } from "bun:sqlite"; const db=new Database("/app/data/portfolio.db"); if(db.query("PRAGMA integrity_check").get().integrity_check!=="ok")throw new Error("Database integrity check failed");db.query("VACUUM INTO ?").run(process.env.PORTFOLIO_BACKUP_FILE);'
docker cp "$portfolio_container:$portfolio_temp" "$portfolio_backup/portfolio.db"
chmod 600 "$portfolio_backup/portfolio.db"
docker inspect "$portfolio_container" --format '{{.Config.Image}}' > "$portfolio_backup/image.txt"
sha256sum "$portfolio_backup/portfolio.db"
printf 'Backup and rollback image recorded in %s\n' "$portfolio_backup"
REMOTE
