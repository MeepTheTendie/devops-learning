# DevOps Quest: Session start — resume here

This is the permanent door back into the adventure. Open this file on any given day, run the
ritual, and you know exactly where you are and what's next — even if no one has touched the
chat in weeks.

## The entrance ritual (2 minutes)

The book lives in two places that agree with each other:
- **On disk:** `/home/meep/Projects/devops-learning/book/` — start here when working.
- **Live:** https://devops-learning.history-atlas.workers.dev/book/ — the same pages, served.

The game is the memory palace and the checkpoint; the terminal is the workshop.
```
cd /home/meep/Projects/devops-learning
python3 -m http.server 8000        # if you want the playable game at 127.0.0.1:8000
cat book/README.md                 # the campaign (15 chapters, 4 parts)
cat book/deep/README.md            # the deep tracks (28 pages, 3 tracks)
```

## The session loop (every page)

1. **Open the current page** (see the flag below).
2. Read its **Goal** and **One layer deeper** — slowly; the ideas are the point.
3. **Run the drill** in the terminal and read every line of output as a message to you.
4. Re-read the **finish line** and say the answer in your own words (out loud counts).
5. **Update the flag below, and commit the book.** The book remembering your progress is
   the whole trick:
   ```
   git add book && git commit -m "Resume: Track 1, page 2 (file descriptors), drills done"
   git push origin main
   ```
6. Move to the next page in track order, or branch to whatever itches that session.

## Where you are now (the flag — updated each session)

- **Campaign chapters:** 1, 2, 3 conquered. 4 in progress (dungeon half done).
  5 (Docker) started — the `Dockerfile` task is next.
- **Deep tracks:** Track 1 · Linux gut, **page 1 "Processes and /proc" — drill given,
  not yet reported.** Page 2 ("Pipes and file descriptors") is queued right behind it.
- **Next action when you sit down:** run the Track 1 page 1 warm-up (below), report the
  four outputs, then go to page 2.

## Cold-start battery (5 minutes — tells you if you're warm)

Run these; anything fuzzy means redo that page before moving on.
```
ps -o pid,ppid,stat,cmd -p $$            # page 1: who am I, who's my parent, what state
readlink /proc/$$/fd/0                   # page 1/2: what stdin currently is
echo hi | wc -c                          # page 2: a pipe moving bytes (expect 3)
ss -tulpn | head -5                      # networking: everyone listening, with owners
getent hosts devops-learning.history-atlas.workers.dev   # DNS: the stack's phonebook on tap
```

## The three doors

- [The campaign — 4 parts, 15 chapters](book/README.md)
- [Track 1 · Linux gut](book/deep/README.md#track-1--linux-gut-the-kernels-side-of-your-box)
- [Track 2 · Networking gut](book/deep/README.md#track-2--networking-gut-one-request-every-hop)
- [Track 3 · Ops gut](book/deep/README.md#track-3--ops-gut-running-things-for-real)
- [Glossary — every term in the book](book/glossary.md)