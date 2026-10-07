# Down the Rabbit Hole

A cross-cutting branch of the Codex. Each chapter teaches a skill; this branch goes one
**layer deeper** at the same touchpoints, because the itch to really understand the machine
is best scratched against software you already run. Every page follows the same loop:
**peel back one layer, run a drill, explain in your own words.**

| Touchpoint | Deepens chapter | What you peel back |
| --- | --- | --- |
| [Processes and /proc](processes-and-proc.md) | 4 · The First Dungeon | How a command becomes a process; the kernel's live filesystem; signals; strace |
| [Boot and services](systems-and-boot.md) | 4 & 8 · First Dungeon / Live Ops | systemd as PID 1, unit files, journald versus log files, the boot chain |
| [Beneath the container](containers-beneath.md) | 5 · Package the Cartridge | What `docker run` actually does: namespaces, cgroups, layers, overlayfs |
| [The network stack](the-network-stack.md) | 7 & 13 · Ship / The Edge | Sockets, loopback versus real interfaces, how a port becomes a connection, DNS steps |
| [Hardening in place](hardening-in-place.md) | 10 · Dangerous Ground | Auditing and hardening this very machine, not a toy |
| [Scheduling at scale](scheduling-at-scale.md) | 14 · The Fleet | What Kubernetes adds on top of containers: scheduler, reconciliation, probes |

Rules are the same as the main book: the learner runs the commands; the assistant explains
the idea and reads the output with you. No page is a list of trivia — each ends at a
**rabbit-hole finish line** you should be able to demonstrate, not recite.