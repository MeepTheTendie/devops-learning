# File descriptors and pipes

> Track 1 · Linux gut · deeper than Chapters 2 & 4

## Goal
Realize that everything you've done in bash — redirects, pipes, `/dev/null` — is one
mechanism: a table of numbers pointed at things.

## One layer deeper
- Every process holds a **file descriptor table**: slot 0 = stdin, 1 = stdout, 2 = stderr.
  Redirection isn't syntax magic, it's *re-pointing a slot*. `>/dev/null` moves slot 1 to
  the null device; `2>&1` says "copy slot 1's target to slot 2's target". Order matters:
  `>file 2>&1` re-points stdout then points stderr at it; `2>&1 >file` is the classic bug.
- A **pipe** (`|`) is a kernel channel with a buffer: the writer's stdout (1) is wired to
  the reader's stdin (0). It's the oldest Unix superpower and it *throttles*: when the
  buffer is full, the writer simply blocks — that backpressure is why `yes | head -n 3`
  stops, while `yes` alone runs forever.
- **Heredocs** (`<<`), process substitution (`<(cmd)`), and named pipes (`mkfifo`) are all
  the same idea wearing hoodies: text delivered through an fd, not a temp file.
- A file can be opened, the **name deleted, and the data kept alive** as long as one fd
  holds it — that's `lsof +L1` output (deleted-but-open) and the classic "df is full, du
  shows nothing" mystery from the filesystems page.
- Every process walks toward its fd table. `ls -l /proc/<pid>/fd` and `lsof -p <pid>` are
  X-rays of that table; syscalls from the syscalls page (`open`/`read`/`write`) are how it
  uses the slots.

## Drill
```
echo hi | wc -c                          # a pipe: one process's 1 → another's 0
ls -l /proc/$$/fd | head                 # THIS shell's fd table
readlink /proc/$$/fd/0                   # what stdin currently is (terminal)
bash -c 'exec 9>/tmp/fdtest; echo x >&9; readlink /proc/$$/fd/9; rm -f /tmp/fdtest'
sleep 60 & P=$!; ls -l /proc/$P/fd       # a running program's open handles; kill $P
yes | head -n 3                          # backpressure: the pipe buffer forces a stop
cat <(echo "I arrived via a pipe, no temp file")
```

## Rabbit-hole finish line
- Explain `2>&1 > file` vs `> file 2>&1` out loud, as slot moves.
- Show a running process's fd table and identify its terminals and sockets.
- Describe the event the moment `yes | head` stops: who blocked and why.

## Resume point
Not started.