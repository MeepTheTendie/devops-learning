# Chapter 7: Ship to a Server

> Part II — The Workshop · DevOps skill: deployment and DNS

## Goal
Let another device reach the game — and then update it without breaking it.

## Sneak preview (already done)
The game is live at **https://devops-learning.history-atlas.workers.dev**, deployed to
Cloudflare Workers from this repo, and byte-verified against the committed source. This
chapter turns that play into understanding.

## You learn
- **Local** means reachable only on your machine; **remote** means reachable from anywhere.
- An IP is a machine's address; a **domain/URL** is a name an operator maps onto that address.
- **DNS** is the phonebook that turns a name like `.workers.dev` into where it lives.
- **Environment settings** are the differences between your machine and production.
- A **safe update** is one you can back out of: keep old versions, verify the new one, roll back if it fails.

## The ideas
`python3 -m http.server` binds to your machine and no one else's. Cloudflare Workers runs the
same folder's files on servers you don't own, then hands out that long `.workers.dev` URL.
That URL is real DNS: a name that resolves to an IP on Cloudflare's edge. When you deploy, you
weren't uploading your machine — you were publishing files to infrastructure that answers for
them everywhere at once.

Deploying is only half the skill: **rollback is the other half.** Production deployments keep
versions; if the new one misbehaves, you point back at the known-good one. Now you also have a
real pet project to shop around: the workspace is a git repo, the live site is a tar-free
deployment, and "safe update" means more than running one command.

## Drill
```
# the assistant keeps the wrangler config (wrangler.jsonc + the copied site) in a staging
# folder, and deploys from there with the project's wrangler binary
cd <staging-dir>     # current setup: /tmp/opencode/dq-deploy
<wrangler-binary> deploy   # current setup: the one in the pokergym repo's node_modules
wrangler pages deployments list      # versions Cloudflare kept for rollback
curl -i https://devops-learning.history-atlas.workers.dev/   # see 200 from the real edge
```
Then change something small, deploy, verify, and **roll back** to the previous version on purpose.

## Finish line
- Say what DNS turns a name into, in one sentence.
- Explain why a loopback URL (`127.0.0.1`) is not something another device can reach.
- Roll a bad deployment back and prove which version is live.

## Resume point
Partially proven: first deploy + byte verification of the live site already match the repo.
Formal DNS/rollback lesson still to come.