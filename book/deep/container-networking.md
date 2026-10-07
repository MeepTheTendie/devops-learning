# Container networking

> Track 3 · Ops gut · deeper than Chapters 5 & 7

## Goal
Explain what a published port *really is* — a plumbing job between two kernel features —
and map a container's network by hand.

## One layer deeper
- A container gets its own network **namespace** (Track 1 memory: namespaces give it a
  private world). Inside, there's an `eth0` and, typically, no way out except through the
  host.
- The host runs a **virtual ethernet pair** (`veth`): one end lives inside the container,
  the other is plugged into a **bridge** (like `docker0`) on the host. The bridge behaves
  like a tiny switch: container ↔ host ↔ internet all via that bridge.
- `-p 8081:80` does *not* move a program: it installs a **DNAT rule** — traffic arriving at
  host port 8081 is translated and forwarded into the container on port 80. It's routing
  and masquerading (NAT), the same machinery Track 2 covered for the whole machine.
- This is why two containers can map the *host's* port 80 only once, but both can hold port
  80 inside their own namespaces. Same number, different worlds.

## Drill
```
docker run -d --name wired -p 8083:80 nginx:alpine
ip link show                       # a new veth* appeared on the host
brctl show 2>/dev/null || ip -br link show | rg docker
docker inspect wired --format '{{range .NetworkSettings.Networks}}{{.IPAddress}}{{end}}'
docker exec wired ip addr show eth0          # the container's private world
docker exec wired ip route                   # its default route → the bridge
ss -tulpn | rg ':8083'                       # the host-side list — the DNAT door
curl -sI localhost:8083/ | head -1
docker rm -f wired                          # watch the veth disappear too
```

## Rabbit-hole finish line
- Name the two ends of a veth pair and where each lives.
- Explain why `-p` can collide on the host but not inside containers.
- Trace one `curl localhost:8083` to the container's `eth0` in your own words.

## Resume point
Not started.