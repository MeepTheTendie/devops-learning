# Terraform and IaC

> Track 3 · Ops gut · deeper than Chapter 12

## Goal
Describe real infrastructure as reviewable code, then let review-before-change do its job.

## One layer deeper
- **IaC** is "infrastructure expressed as a file with a diff." Terraform is declarative:
  your `.tf` says what you *want*; the binary works out how.
- Three moving pieces: **providers** (how Terraform talks to Cloudflare/AWS/whatever),
  **resources** (each concrete thing: a worker, a project, a DNS record), and **state**
  (Terraform's memory of what it actually created — reality's double-entry ledger).
- The discipline is the plan: `terraform plan` reads state, computes the diff to desired,
  and prints "will create x, will change y, will destroy z" with no side effects. `apply`
  makes it so. **Never apply from memory; never apply when you skipped the plan.**
- **Drift** is reality slipping from state (someone clicked in a console). A frozen
  `terraform plan` diff is how you *see* drift. `destroy` is the ultimate test of the code:
  if the code really describes the world, it can rebuild it from nothing.

## Drill
```
# assistant authors terraform for the devops-learning Cloudflare project (main.tf)
terraform init
terraform fmt -check && terraform validate      # code hygiene before state
terraform plan                                  # read it like a git diff — predict first
terraform apply                                 # confirm with 'yes' only after you read it
terraform state list                            # the ledger of what now exists
terraform destroy                               # the real test: can the code say goodbye?
```
After destroy: re-`apply` and prove the live site comes back from the code alone.

## Rabbit-hole finish line
- Read a `plan` and predict every action before applying.
- Explain state vs. desired vs. actual in three sentences.
- Rebuild a deleted environment from code and verify it live.

## Resume point
Not started.