# Signals and syscalls

> Track 1 · Linux gut · deeper than Chapter 4

## Goal
Talk to a running process with a signal, then watch it make actual calls into the kernel.

## One layer deeper
- A **signal** is a tiny message, not data: `SIGTERM` (15) = "please stop and clean up";
  `SIGINT` (2) = what Ctrl-C means; `SIGKILL` (9) = the kernel tears it down now, no
  cleanup, not even catchable; `SIGSTOP`/`SIGCONT` = pause and resume. Programs can *catch*
  most signals to run their own goodbye; SIGKILL and SIGSTOP are the two you can't ignore.
- A process that dies from a signal exits with code **128 + signal number** — 129 SIGINT,
  143 SIGTERM, 137 SIGKILL. That's why `echo $?` reads 143 after a graceful kill and 137
  after a kill -9. This is checkable history, not trivia.
- **Syscalls** are the only way a userspace program touches the kernel: opening a file,
  binding a socket, forking — every one goes through an instruction the kernel gates.
- `strace` records that conversation in order. It's the difference between "the program
  misbehaved" and "here is the exact second it misbehaved."

## Drill
```
python3 -m http.server 8000 &
! = (echo $!)
strace -p $! -f -e trace=network &        # attach, follow children, only network syscalls
curl -s localhost:8000/ > /dev/null; curl -s localhost:8000/game.js > /dev/null
kill $!                                   # be gentle first
wait $! ; echo "exited: $?"               # 143 = 128 + SIGTERM
python3 -m http.server 8000 &
P2=$!
kill -9 $P2; wait $P2 ; echo "exited: $?" # 137 = 128 + SIGKILL
```
Read the strace output and find the moment a `recvfrom`/`sendto` pair happened — that was
curl and the server shaking hands through the kernel.

## Rabbit-hole finish line
- Predict a process's exit code from the signal you sent it, then prove it.
- Point to one syscall in a strace log and say what it meant for the program.
- Explain the difference between a process *ignoring* a signal and being unable to.

## Resume point
Not started.