# Chapter 4: The First Dungeon

> Part I — The Old World · DevOps skill: files, paths, processes, logs, exit codes

## Goal part one (conquered): the Linked World
Explore the campaign map, find the tool (find/ls), open a blocked route (Git), and read the
console logs a running game produces.

## You learn, part one
- A project is a tree of files; `find` and `ls -R` walk it for you.
- Some files hold *data* (the room grids in `maps/*.js`), some hold *logic*
  (`src/world.js` has the story and answers, `src/engine.js` runs the game).
- Log entries like `[ZONE ...]` are the program talking about itself as it runs.

## Goal part two (this session): process surgery
Find a program you made run, read its output as it changes, and stop it cleanly. Then read a
failed command's **exit code** and turn it into a decision.

## You learn, part two
- A **process** is one running copy of a program, with a numeric id (`PID`).
- `ps` lists processes; `tail -f` follows a log as it grows; `kill` asks a process to stop.
- Every command exits with a **status code**: 0 means success, anything else is an error.
  `$?` holds the last one. `&&` runs the next command only on success, `||` only on failure.
- A command can fail before it ever "prints an error" — the exit code is the ground truth.

## The ideas
Your `python3 -m http.server` isn't magic: it's a process with a PID, and you can find it,
watch it, and stop it with the same tools an operator uses in production. Logs are a program
writing its life story to a file — `tail -f` is how you read the newest page live. When a
command exits nonzero, that number is its last word; scripting with `&&` and `||` means you
wrote a decision in shell the moment it failed.

## Drill part two
```
python3 -m http.server 8000 &
ps aux | rg http.server          # find the process, note its PID
echo $?                          # see the exit code of the previous command (0)
kill <PID>                       # stop the server
ls maps && echo "maps exist"     # && runs only on success
ls /definitely/not/here || echo "nope"   # || runs only on failure
ls /definitely/not/here; echo $?          # nonzero, but the next line still ran
```

## Finish line
- Find a running process you created, read its PID, and stop it with `kill`.
- Use `tail -f` on a log and explain what "following" means.
- Say what exit code 0 means, and use `&&` and `||` to make a command behave differently on success versus failure.

## Resume point
Conquered 2026-10-07: explored the new file tree (`ls -R maps`, `find . -type f`), read
`src/world.js` for the badge order and pedestal answers, read live `[ZONE ...]` console
entries, and committed the Linked World.