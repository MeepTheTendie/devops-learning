# Memory and cgroups

> Track 1 · Linux gut · deeper than Chapters 4 & 5

## Goal
Read the machine's memory like the kernel sees it, and understand the budget mechanism
containers ride on.

## One layer deeper
- `free` is a summary; `/proc/meminfo` is the kernel's own ledger. **buff/cache** is not
  "wasted" memory — it's the kernel lending RAM to disk reads, always reclaimable on demand.
  The kernel's job is to *not waste RAM*, which is why it caches aggressively.
- A process doesn't see "its" RAM directly: the kernel maps pages, lazily allocates them
  on first write (**copy-on-write** is why forking a giant browser is cheap — the pages
  are shared until one side writes).
- A **cgroup** is a set of processes with a budget and a meter. v2 cgroups give each group
  its own `memory.max`, `cpu.max`, and live usage counters. This — not namespaces — is
  what actually *stops a container from eating the host.*
- When a cgroup hits its memory ceiling, the kernel picks a victim to **OOM-kill** — and
  that is why a container "just died" while the host was fine. `dmesg` has the autopsy.
- **Pressure Stall Information** (`/proc/pressure/`) is the machine telling you how often
  it's *waiting* for CPU/memory/IO — the difference between "100% busy" and "actually suffering."

## Drill
```
free -h                      # the summary; watch buff/cache, not just percent
head -5 /proc/meminfo        # the ledger itself
cat /proc/pressure/cpu /proc/pressure/memory   # waiting time, the honest signal
systemd-cgtop                # cgroup meters, live, if systemd is PID 1
# then a cheap show of per-cgroup accounting:
docker run -d --name fat -m 128m --memory-swap 128m redis:alpine
systemd-cgtop                # find the redis cgroup: capped at 128m
docker rm -f fat
```

## Rabbit-hole finish line
- Correct someone who calls buff/cache "wasted RAM" in a sentence.
- Explain *why* a container with a memory cap died while the host was fine, and where the
  evidence lives.
- Read `/proc/pressure/memory` and say whether this machine is hurting.

## Resume point
Not started.