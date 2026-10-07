# Chapter 2: Save Points

> Part I — The Old World · DevOps skill: Git basics

## Goal
Save the title-screen checkpoint, inspect history, and restore a change you've undone.

## You learn
- Git tracks changes to files in a folder (a **repository**), not the whole machine.
- `git status` — what changed; `git add` — stage it; `git commit` — save a named snapshot.
- `git log` — read the history; `git show <hash>:<file>` — view an old snapshot.
- `git restore` — throw away an uncommitted mistake.
- The default branch name is just a label for the "main line" of history.

## The ideas
A commit is a save point: a snapshot of the files plus a message saying what you did.
You can always return to any save point. Going back needs a parent (the commit before a
commit), and git log is how you find which save point you need. It is called `git log`, not
"git checkpoint" — the save points are commits.

## Drill
```
git status                    # what changed since the last save point
git add index.html            # stage the change
git commit -m "message"       # save a snapshot
git log --oneline             # read the history, newest first
git show <hash>:index.html    # view an old version without touching your files
git diff                      # what a change actually contains
git restore <file>            # discard an uncommitted mistake
```

## Finish line
- Create a commit, read the log, and name the two commits in order.
- Recover what a file looked like at a specific older commit.
- Explain the difference between `git add` and `git commit`.

## Resume point
Conquered 2026-10-07: inspected the folder, read `git status`, staged and made two commits
(`8f36a49`, `29c83aa`), read `git log --oneline`, viewed an old saved version with
`git show <hash>:index.html`, discarded an uncommitted mistake with `git restore`, and
identified changes with `git diff`.