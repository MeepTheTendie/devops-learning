# Backups and restores that get tested

> Track 3 · Ops gut · deeper than Chapter 8

## Goal
Build a backup you have *proven* you can restore, because an untested backup is a rumor.

## One layer deeper
- The rule of the discipline: **3-2-1** — three copies, on two media, one offsite. A copy
  you can only reach from the machine it saved is a hope, not a backup.
- A working backup = a manageable, verifiable snapshot you can *list, diff, and restore into
  a live system under pressure*. Restic does exactly that in one tool: encrypted,
  deduplicated, incrementals with snapshots you can list and restore by name. Dedup means
  "50 versions of a changing folder" costs fractionally more than the folder itself.
- **Restore is the exam.** Momentum discipline: create "thought I lost" scenarios (rm the
  folder, make the disk error) and actually bring the data back, then **verify by hash**
  (`sha256sum` before/after) — confidence you can pronounce the word "backup".
- Automating is the difference between "did a backup last month" and "a backup runs hourly":
  a **systemd timer** (the units page) runs the same restic command reliably, journaled.
- What to back up matters more than how: for this course, the real treasures are the repo,
  the places a config would silently die (dotfiles, the keyring), and any exported game
  save. Backups serve *meaningful* data, not a whole filesystem by reflex.

## Drill (local restic repo — no cloud account; install `restic` if missing)
```
mkdir -p /tmp/restic-repo
RESTIC_REPO=/tmp/restic-repo restic init
mkdir -p /tmp/valuable && echo "the only copy" > /tmp/valuable/seed.conf
RESTIC_REPO=/tmp/restic-repo restic backup /tmp/valuable
RESTIC_REPO=/tmp/restic-repo restic snapshots
# the exam:
rm -rf /tmp/valuable
RESTIC_REPO=/tmp/restic-repo restic restore latest --target /tmp/restored
sha256sum /tmp/valuable/seed.conf /tmp/restored/valuable/seed.conf   # identical?
```
Then (with the assistant) wrap it in a systemd timer and prove a second snapshot lands
without you.

## Rabbit-hole finish line
- Say what 3-2-1 means and which of the three your restic test satisfied.
- Restore a snapshot you deliberately nuked, and prove identity by hash.
- Explain why "I have backups" and "I have a restore drill" are different claims.

## Resume point
Not started.