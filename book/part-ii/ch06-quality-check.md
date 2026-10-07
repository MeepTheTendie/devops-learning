# Chapter 6: Quality Check

> Part II — The Workshop · DevOps skill: automated tests and CI

## Goal
Catch a broken door before release — then make a machine run the check on every change.

## You learn
- A **test** is a small program that asserts something is true and stops loudly if it isn't.
- Test the geometry of the rooms: correct size, reachable exits, no unreachable pedestals.
- **CI** (continuous integration) runs your tests automatically when code changes.
- A **pipeline** is the list of steps the machine runs; a failed step fails the whole build.
- GitHub Actions: a workflow file in `.github/workflows/` that runs on push.

## The ideas
You already reasoned through the map for real — walkable rows, `>` exits, sealed gates.
A test is that same reasoning written down so a machine can run it every time, forever.
A test run that passes answers by conviction (assertions), not by mood.

CI means the moment you push, a machine clones your repo, installs nothing you didn't list,
runs the tests, and reports a check mark or a red X on the commit. The red X is the exciting
part: read the log line by line, find the failing assertion, fix the code, push again.

## Drill part one — tests you run
```
node --test                 # if the assistant adds tests in test/
# or: npm test or pytest, whatever the repo actually uses
```
Run them, break something on purpose (a typo in a map row), run them again, and read how the
failure tells you where the break is.

## Drill part two — CI that runs for you
The assistant writes `.github/workflows/check.yml`:
- trigger: `on: [push]`
- job: checkout → set up Node → `npm test` (or the repo's equivalent)
- the results appear on the commit when you push.

```
git add .github/workflows/check.yml
git commit -m "Add CI: run the map checks on every push"
git push origin main
# watch the commit: a yellow dot → green check or red X
```
Then introduce a deliberate bug in a map file, push, and read the red build's log.

## Finish line
- Explain what an assertion is and why a passing run matters more than no run at all.
- Read a failed CI log and name the exact line that failed.
- Explain why CI should run in a fresh checkout, not on your laptop.

## Resume point
Not started. Queue: verify a mapping test works locally, then add the GitHub Actions workflow.