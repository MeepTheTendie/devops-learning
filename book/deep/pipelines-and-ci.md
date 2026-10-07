# Pipelines and CI

> Track 3 · Ops gut · deeper than Chapter 6

## Goal
Watch the same steps you run by hand become a pipeline a machine runs on every change.

## One layer deeper
- CI is *automation with a memory*: on every push a clean machine: checks out the repo,
  installs dependencies, runs tests, builds an artifact, and reports — all from a file that
  lives in the repo. The file is the pipeline's recipe, reviewed like code.
- A **workflow** begins with triggers (`on: push`, `on: pull_request`), organizes **jobs**
  (separate clean environments, can run in parallel), and breaks each job into **steps**
  (commands in order). A step failing fails the job; a job failing fails the build; the
  commit wears the red X.
- Steps talk through the **filesystem and artifacts**: build in step 2, upload in step 3,
  download in a later job. That's also why CI can't lie — every step starts from a fresh
  world declared by the workflow.
- The gap you personally need to cross: the difference between "I ran this on my laptop and
  it worked" and "a machine reproved it from nothing." The pipeline is the proof.

## Drill
```
# repo-side (assistant adds .github/workflows/check.yml):
#   on: [push]
#   job: checkout → setup-node → npm test (or the repo's equivalent)
git add .github/workflows/check.yml
git commit -m "CI: run checks on every push"
git push origin main
# watch the commit: yellow circle → green or red. Then:
# introduce a deliberate bug in a map file, push, and read the failing step's log
```
The learning happens in the failing run: find the step that failed, read *its* log lines,
and say which assertion (Ch 6) broke.

## Rabbit-hole finish line
- Name the three parts of a workflow and what each job's steps share (and don't).
- Read a red build and point to the exact step and line that failed.
- Explain why CI reruns from a clean world, not "on top of my laptop's state."

## Resume point
Not started.