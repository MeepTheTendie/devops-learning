# Down the Rabbit Hole: Processes and /proc

> Deepens Chapter 4 · the gateway page for the whole branch

## Goal
Watch a command *become* a process, find it on the kernel's own view of the machine, talk to
it with a signal, and see its every move in syscalls. Then decide on its exit code.

## One layer deeper
- A command isn't magic: the shell finds the file, forks a child, and the kernel runs it.
  Every running copy is a **process** with its own number and its own memory.
- `/proc` is the kernel exposing the machine as files. `/proc/<pid>/` is one process's
  whole life story (its command line, its working directory, its open files).
- **Signals** are short messages to a process. `SIGTERM` (15) says "please stop" —
  graceful. `SIGKILL` (9) says "now" — no cleanup. `Ctrl-C` sends `SIGINT` (2).
- `strace` attaches and records every **syscall** the process makes — literally the
  conversation between a program and the kernel. This is X-ray vision.
- An **exit code** is the process's final word to its parent: `0` = I'm done and it
  worked; not `0` = something up to and including a signal.

## Drill
```
python3 -m http.server 8000 &
echo $!                 # the shell's answer: the PID it just started
ps -o pid,ppid,stat,cmd -p $!      # read this process; PPID should be your shell
cat /proc/$!/cmdline ; echo         # what the kernel thinks it's running
ls /proc/$!/cwd                     # its working directory, kernel style
strace -p $! -e trace=network       # attach and... it's mostly idle
curl -s localhost:8000/ >/dev/null
# (strace should suddenly show the socket chatter — run again and watch)
kill $!                 # SIGTERM — graceful
kill -9 $!              # SIGKILL — instant, no goodbye
ls /no/such/dir ; echo $?      # a command that fails: nonzero
python3 -m http.server 8000 & ; kill -TERM $! ; wait $! ; echo $?   # killed = ≥128+signal
```

## Rabbit-hole finish line
- Show a process mid-run in `/proc`, and name the two files that prove which command it is
  and where it's working from.
- Make `strace` show a real socket operation, and narrate what the syscall means.
- Explain, with an experiment, why a process killed by a signal exits with a code above 128.

## Resume point
Gateway session in progress — continues in chat, one drill at a time.