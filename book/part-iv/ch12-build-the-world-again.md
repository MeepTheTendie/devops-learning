# Chapter 12: Build the World Again

> Part IV — The Cosmogony · DevOps skill: Terraform and infrastructure as code

## Goal
Describe the Cloudflare hosting as code, then plan, apply, and destroy it — and rebuild it.

## You learn
- **Infrastructure as code (IaC)** = the deployment setup lives in a file, reviewed like code.
- **Declarative** means you say what you want ("a Worker named X"), not how to build it.
- `terraform plan` shows the diff before it changes anything; `apply` does it; `destroy` removes it.
- A **state file** is IaC's memory of what it created; drift is when reality and state disagree.

## Key ideas (skeleton — depth filled during the session)
- The real deployment (the Cloudflare project, its config, the deployed assets) as Terraform.
- Plan → review → apply as the discipline; why you never skip the plan.
- Destroy and rebuild the whole hosting from scratch, then point the domain back.

## Planned drills
1. Author `main.tf` for the devops-learning project (wrangler config expressed as code).
2. `terraform plan` and read the diff like a git diff.
3. `terraform apply`, verify the site, `terraform destroy`, watch it vanish, then rebuild.

## Finish line
- Explain declarative vs. imperative with the site as your example.
- Read a `terraform plan` and predict what will change before applying.
- Rebuild a deleted environment from code alone and verify it works.

## Resume point
Not started.