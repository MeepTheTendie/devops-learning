# Secrets and supply chain

> Track 3 · Ops gut · deeper than Chapters 8 & 10

## Goal
Stop "where do I put the key?" and start "where can a secret leak, and which of these do I
actually defend against?"

## One layer deeper
- A **secret** is anything credentials open a door with: API tokens, passwords, signing
  keys, private connection strings. The industry's best practice is: never in code, never
  in an image, never in a log, injected at runtime from a **secret store** the app asks for
  (environment, keyring, CI secret, cloud secret). Reversibility is the discipline:
  assume it leaks and design so you can rotate (delete + issue a new one) in one command.
- The classic leak paths, each preventable: committed `.env` files (add to `.gitignore` +
  re-scrub history), secrets baked into image **layers** (anyone with the pushed image can
  extract them — `docker history` shows your ARG/ENV values verbatim), secrets echoed into
  **CI logs**, tokens passed in **URLs** (logged by every proxy you don't control), and
  roots-are-everywhere thinking (an enum/scanner finding one token reused across ten tools).
- The **supply chain** is everything between "I wrote code" and "it ran in production":
  the base images, packages, and build tools you didn't write. Trusting it *blindly* is the
  attack. The practice: checksums for downloaded artifacts (`sha256sum` — you already use
  hashes in this book), **SBOMs** (a machine-readable bill of materials: `syft` lists every
  package in an image), vulnerability scanning (`trivy` maps packages → known CVEs),
  signatures (`cosign` verifies an image is the artifact someone vouched for), and pinning
  (exact versions, not "latest").
- The mental shift: taming the supply chain is *remembering who you didn't write* and
  checking them, not trusting your own code more.

## Drill (tool availability varies — run what exists)
```
gh secret list                      # secrets CI is allowed to see (github side is real here)
docker history <your devops image> 2>/dev/null | head     # what layers would reveal
sha256sum <some.downloaded.file>                    # the check that catches tampering
syft <devops image> 2>/dev/null | head -15 || echo "syft not installed (optional)"
trivy image <devops image> 2>/dev/null | head -25 || echo "trivy not installed (optional)"
grep -rn 'password\|token\|api_key' . --include='*.env*' 2>/dev/null || echo "no env spotted"
```

## Rabbit-hole finish line
- Enumerate this project's real secret risk list: which paths exist, which are already closed.
- Say why a secret in an image layer is visible to anyone, with the command that proves it.
- Name the three supply-chain defenses and which threat each covers.

## Resume point
Not started.