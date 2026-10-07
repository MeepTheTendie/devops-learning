# Chapter 8: Live Ops

> Part III — The Live World · DevOps skill: logs, monitoring, secrets, backups

## Goal
Detect a problem from production logs, restart safely, and restore a saved run.

## You learn
- Real logs beat guesses: `curl -i`, then read what the server said in its own words.
- **Monitoring** is watching the same things continuously instead of when it breaks.
- **Secrets** (API keys, tokens, passwords) must never live in code or commits.
- A **backup** you haven't restored is a rumor; recovery drills prove the plan works.

## Key ideas (skeleton — depth filled during the session)
- Where production logs live on Cloudflare (wrangler tail, analytics) versus local logs.
- Secrets go in environment variables / secret stores, not `.env` files you commit.
- Back up the map save (`localStorage` export) and practice putting it back.

## Planned drills
1. `wrangler tail` while triggering a live request; read the request/response lines.
2. Move a credential into an env secret and confirm it never appears in `git log` or the build.
3. Export the game's save, deliberately reset it, restore from the export, and verify progress returned.

## Finish line
- Read one real production log entry and say what happened.
- List every place a secret can accidentally leak, and how each is prevented.
- Restore a backup under pressure and prove it worked.

## Resume point
Not started.