# DevOps Quest: lesson map

## The game we are building

An original, tiny, Game Boy Advance-inspired browser adventure, drawing on the exploration, dungeons, and item-gated paths of Zelda and the interconnected map and ability-gated backtracking of Metroid. The player explores, solves simple environmental puzzles, and opens new routes by learning DevOps skills. The game itself gives each lesson a visible result; the real project files teach the underlying tools. We will keep the focus on exploration and problem-solving rather than creature collecting or team battles.

We will build it in small, playable steps. First it is a page served by a program on your Linux machine. Later it gets JavaScript, movement, simple art, tests, a container, an automated build, and eventually a deployment. No GBA ROM, emulator, cloud account, or paid service is needed to start.

## Campaign map

| Chapter | DevOps skill | Game milestone | What you learn by doing |
| --- | --- | --- | --- |
| 1. The Local Link | HTTP, clients, servers, ports, status codes | Show the title screen from a local server | A browser or `curl` asks; a server listens and replies |
| 2. Save Points | Git basics | Save the title-screen checkpoint | Track files, make a commit, inspect history, restore a change |
| 3. Button Logic | HTML, CSS, JavaScript basics | Move around a small room and inspect its exits | Separate content, appearance, and behavior; read browser errors |
| 4. The First Dungeon | Files, paths, processes, logs, exit codes | Explore a dungeon, find a tool, and open a blocked route | Find where a program runs, read its output, diagnose a failed command |
| 5. Package the Cartridge | Docker | Run the same game in a container | Image versus container, ports, build/run/stop, repeatable environments |
| 6. Quality Check | Automated tests and CI | Catch a broken door before release | Run checks automatically when code changes; understand a failed build |
| 7. Ship to a Server | Deployment and DNS | Let another device reach the game | Local versus remote, IP and DNS, environment settings, safe updates |
| 8. Live Ops | Logs, monitoring, secrets, backups | Add a map that reveals explored rooms and restore a saved run | Detect problems, keep credentials out of code, practice recovery |
| 9. Build the World Again | Terraform and cloud concepts | Describe a small hosting setup as code | Infrastructure as code and why changes need review |

Kubernetes is an optional later expansion after containers and deployment feel familiar.

## Session format

Each session follows this loop: set a small game goal, learn one idea, make one or two changes, run the game, inspect the result, then explain what happened in your own words. If something breaks, we use the error as the next puzzle. I will avoid giving you a wall of commands before you have a chance to try the step.

## Resume point: Chapter 2 complete

Completed 2026-10-07:

- Chapter 1: served `index.html` with Python on `127.0.0.1:8000`, read it with `curl`, saw a 200 and a 404, stopped the server and watched the connection fail, edited the file and confirmed the running server returned the new text. A web request is not a ping.
- Chapter 2: inspected the folder, read `git status`, staged and made two commits (`8f36a49`, `29c83aa`), read `git log --oneline`, viewed an old saved version with `git show <hash>:index.html`, discarded an uncommitted mistake with `git restore`, and identified changes with `git diff`.

Role split: the assistant writes the game's code files; the learner types and runs the commands (server, `curl`, `git`, later Docker and deploy) and reads the output. One feature per chapter.

## Resume point: Chapter 3 complete

Completed 2026-10-07:

- Chapter 3: separated content, appearance and behavior across `index.html`, `style.css`, `game.js`; served the room from a local server, moved a player with arrow keys, hit walls, reached the exit, read a real console entry, then diagnosed a real bug from `TypeError: Cannot read properties of null` — the HTML was missing the `#player` element. Fixed it in a follow-up commit (`fef1346`). Save points so far: `8f36a49`, `29c83aa`, `1b81884`, `fef1346`.

Role split: the assistant writes the game's code files; the learner types and runs the commands (server, `curl`, `git`, later Docker and deploy) and reads the output. One feature per chapter.

### In progress: Chapter 4 — The Linked World (world map + gating)

The tiny two-room dungeon grew into the full campaign map: the hub `THE CLUSTER` (a 15×11 grid
served from `index.html`) links nine doors labelled `A`–`I`, one per lesson. Each door is a small
labyrinth with a gold `P` pedestal and an `N` companion. The player reads a password, the
companion drops a hint, and the pedestal asks the one question from that lesson; a right answer
seals a badge (`LINK`, `SAVE`, `BUTTON`, `TOOL`, `CART`, `QUALITY`, `SHIP`, `OPS`, `WORLD`) and
opens the next door. The `X` gate in the hub stays shut until all nine badges, then the `OUTAGE
WYRM` gives up its silence. Progress autosaves to `localStorage` and continues from the title
screen.

Architecture mirrors the lessons: `maps/*.js` hold the tile grids (one file per room), `src/world.js`
holds the story, questions, answers and badge order, `src/engine.js` runs movement, warps, gates,
dialogue and save, and `game.js` still only boots the engine. The old `maps/room1.js` and
`maps/room2.js` were replaced; the chapter-3 `TypeError` lesson still applies to the new files.

The learner:

1. Serves the folder again with `python3 -m http.server 8000`, opens the page, talks to the WARDEN at `N`, and completes Zone A (`curl`) to earn the first badge.
2. Explores the new file tree: `ls -R maps`, `find . -type f`, and opens `src/world.js` to read the badge order and the pedestal answers.
3. Reads the `[ZONE ...]` console entries that live play produced.
4. Adds the new files to Git and commits them with an explicit message.

Answers are checked loosely on purpose: spaces, punctuation and case do not matter, so `git log`, `GitLog` and `gitls...` resolve like the real shell commands the lessons teach.

### Chapter 4 finish line (world map session)

- Name the file that holds the map of the hub room and the file that holds the pedestal answers.
- Walk through at least three doors and seal at least two badges in the browser.
- Explain what `>` tiles do, and how a locked door tells you which badge it needs.
- Commit the linked world with `git add` and a message that says what it does.
