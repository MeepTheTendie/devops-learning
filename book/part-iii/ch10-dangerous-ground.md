# Chapter 10: Dangerous Ground

> Part III — The Live World · DevOps skill: security

## Goal
Harden the container and the deployment, and keep credentials out of reach.

## You learn
- **TLS** is what makes the `s` in `https`; without it, traffic is readable in transit.
- The **OWASP Top 10** is the standard shortlist of web app dangers.
- Container hygiene: minimal base images, no secrets baked in, no running as root.
- **Supply chain** = trusting what you install; checksums and SBOMs make trust explicit.

## Key ideas (skeleton — depth filled during the session)
- Threat modeling the game in three minutes: what's public, what's editable, who cares.
- The difference between authentication (who you are) and authorization (what you get).
- Why confining the attack surface (fewer packages, non-root) matters more than hoping.

## Planned drills
1. `docker scan` (or `trivy`) the game image; read the findings and fix the real ones.
2. Prove a secret baked into a layer is discoverable and then remove it properly.
3. Add HTTPS headercard checks on the live site; confirm security headers.
4. Generate an SBOM for the image and read what a dependency list actually shows.

## Finish line
- Name the three layers protecting a web request (network, server, code) and what each defends.
- Show a real vulnerability finding and the fix for it.
- Explain why "my code has no bugs" is the wrong security argument.

## Resume point
Not started.