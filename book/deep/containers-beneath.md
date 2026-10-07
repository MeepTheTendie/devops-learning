# Down the Rabbit Hole: Beneath the container

> Deepens Chapter 5 · Package the Cartridge

## Goal
Explain what `docker run` actually does under the hood — and stop saying "magic box".

## One layer deeper
- A container is **not a virtual machine.** No guest kernel. It's ordinary processes
  running on your kernel, wearing two disguises:
  - **namespaces** — separate views of the world: PIDs, the network stack, mounts,
    users, hostname, filesystem root. Inside, process 1 looks like the king; outside,
    it's a normal child with a big ID.
  - **cgroups** — budgets and meters: how much CPU, memory, and IO this group may use,
    and how much it is using right now.
- An **image** is a stack of read-only **layers** (one per Dockerfile instruction).
- The writable filesystem a container sees is a **union mount (overlayfs)**: your changes
  go on top and hide the layers, never editing them. That's why rebuilding a layer is
  cheap and containers share one copy of the base image.
- This whole chapter is reason number one that "Linux rabbit hole" is bottomless: the
  container you ran in five minutes is, at the bottom, /proc, syscalls, and scheduling.

## Drill
```
docker run -d --name sneaky -p 8082:80 nginx:alpine
docker top sneaky         # the container's processes seen from OUTSIDE
docker inspect sneaky --format '{{.State.Pid}}'   # its PID in YOUR kernel
cat /proc/<that-pid>/status | rg 'NSpid|^Name'    # namespaces: two IDs, one process
docker exec sneaky ps -ef              # from INSIDE it thinks it's PID 1, alone
docker stats --no-stream               # cgroup meters: CPU, memory limits live
docker rm -f sneaky
```
(Skip the `docker run` only if you skipped Chapter 5's cartridge; otherwise this piggybacks on the same image.)

## Rabbit-hole finish line
- Give the one-sentence definition of a container that survives a "but wouldn't it need its
  own kernel?" objection.
- Prove with one command that a container process and your host share a kernel.
- Say which cgroups limit your game image is subject to right now.

## Resume point
Not started.