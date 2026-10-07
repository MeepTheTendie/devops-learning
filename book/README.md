# DevOps Quest: The Codex

A hands-on DevOps course taught by building a small browser game and then shipping it
to real infrastructure. Each chapter adds one useful skill and one visible milestone.
You type and run the commands; the book explains the idea; we check the result together.

> **Start or resume here: [../START.md](../START.md)** — the entrance ritual, the current
> progress flag, and the cold-start battery. The book remembers where you are; START.md is
> the bookmark.

The playable campaign map — [DEV-OPS QUEST: THE LINKED WORLD](https://devops-learning.history-atlas.workers.dev) —
is hosted on Cloudflare Workers. The terminal is our workshop; the browser is where you play.

## How to use this book

- Start from what you know about Linux; assume no other DevOps background.
- One chapter = one skill = one session-sized step. Do the drill, hit the finish line,
  mark the resume point, move on.
- Each chapter has a **goal**, the **ideas** in plain language, a **drill** of commands
  you run yourself, and a **finish line** you should be able to explain in your own words.
- If something breaks, the error is the next puzzle — debug it before you look up answers.
- Keep sessions focused and combine related steps, so learning stays useful without
  burning through a limited usage allowance on tiny exchanges.
- The result stays free and local as long as possible; cloud services join when a chapter
  genuinely needs them.

**Role split:** the assistant writes the code files. The learner types and runs every
command (server, `curl`, `git`, later Docker, CI and deploy) and reads the output.

## Campaign map

| Chapter | DevOps skill | Milestone | What you learn by doing |
| --- | --- | --- | --- |
| Part I — The Old World (Foundations) | | | |
| 1. The Local Link | HTTP, clients, servers, ports, status codes | Show the title screen from a local server | A browser or `curl` asks; a server listens and replies |
| 2. Save Points | Git basics | Save the title-screen checkpoint | Track files, make a commit, inspect history, restore a change |
| 3. Button Logic | HTML, CSS, JavaScript basics | Move around a small room and inspect its exits | Separate content, appearance, and behavior; read browser errors |
| 4. The First Dungeon | Files, paths, processes, logs, exit codes | Explore a dungeon, find a tool, open a blocked route, kill a stuck process | Find where a program runs, read its output, diagnose a failed command |
| Part II — The Workshop (Build & Ship) | | | |
| 5. Package the Cartridge | Docker | Run the same game in a container | Image versus container, ports, build/run/stop, repeatable environments |
| 6. Quality Check | Automated tests and CI | Catch a broken door before release | Run checks automatically when code changes; read a failed build |
| 7. Ship to a Server | Deployment and DNS | Let another device reach the game; update it safely | Local versus remote, IP and DNS, environment settings, safe rollback |
| Part III — The Live World (Run & Defend) | | | |
| 8. Live Ops | Logs, monitoring, secrets, backups | Detect a problem from logs, fix it, restore a saved run | Keep credentials out of code, practice recovery, watch production |
| 9. The Observatory | Observability and SRE | See the game's health on a dashboard | Structured logging, metrics, alerting, tracing |
| 10. Dangerous Ground | Security | Harden the container and the deployment | TLS, secrets management, container hardening, supply chain |
| 11. The War Room | Incident response | Run an outage drill from runbook to postmortem | Issue triage, rollback, blameless review, runbooks |
| Part IV — The Cosmogony (Scale & Rebuild) | | | |
| 12. Build the World Again | Terraform and infrastructure as code | Describe the Cloudflare hosting as code; plan, apply, destroy | IaC and why changes need review before apply |
| 13. The Edge | Serverless and edge computing | Give the game state at the edge | Workers routing, KV storage, Durable Objects, edge caching |
| 14. The Fleet | Kubernetes | Run the game in a local cluster | Pods, deployments, services, probes, rollouts |
| 15. The Current | Full-pipeline capstone | Ship a second tiny app start to finish | Every chapter wired together on one real project |

## Down the Rabbit Hole

The Codex also carries a **depth branch** for when a skill makes you ask "okay, but how does
that actually *work*?" Three terminal-first tracks — **Linux gut, Networking gut, Ops gut**,
28 pages in a suggested order — from `/proc` and fd tables to NAT, TLS, SBOMs, and the guts
of Kubernetes. Start at [deep/README.md](deep/README.md).

## Progress scoreboard

| Status | Chapters |
| --- | --- |
| Conquered | 1, 2, 3 |
| In progress | 4 (dungeon half done), 5 (just started) + Deep Track 1, page 1 |
| Written, not yet played | 6 – 15 and the rest of the deep tracks |
| Frozen | None |

> Current flag lives in [START.md](../START.md) and is updated at the end of every session.

## Quick reference: tools we use

- `python3 -m http.server`, `curl` — serving and asking for pages (Ch 1)
- `git` — save points (Ch 2)
- a browser console — reading program output (Ch 3)
- `ps`, `tail`, `kill`, `$?` — process surgery (Ch 4)
- `strace`, `/proc`, `systemd` — the rabbit hole branch (deep 1–2)
- `docker` — packaging (Ch 5)
- `node --test` and GitHub Actions — quality gates (Ch 6)
- `wrangler` — shipping to Cloudflare Workers (Ch 7, 12, 13)
- `terraform` — infrastructure as code (Ch 12)
- `kind` — a local Kubernetes cluster (Ch 14)