# Down the Rabbit Hole: The network stack

> Deepens Chapters 7 & 13 · Ship to a Server / The Edge

## Goal
Trace a single request from your keystroke to Cloudflare's edge and back, naming every hop.

## One layer deeper
- An **interface** is a real or virtual network door on the machine. `lo` (loopback) is the
  machine talking to itself; `enp*`/`eth*` is a physical link; `docker0`/`veth*` are
  container plumbing.
- A **socket** is an endpoint of a connection: an interface + an IP + a port. `ss -tulpn`
  shows every socket in the whole machine's kernel at once.
- `hostname → IP` is **DNS**, and it's a *sequence*: your resolver, recursive servers,
  authoritative servers. `127.0.0.1` is a special IP that means *this machine itself* —
  which is exactly why your laptop's server is invisible to other devices.
- When you `curl https://…`, the moment the TCP connection opens is a real, observable,
  kernel-visible event. Watching ports go LISTEN → SYN → connection is watching the stack
  do its one job.
- "The edge" later (Ch 13) is just many machines in a distributed cast playing the same
  server role — same socket rules, more of them, closer to people.

## Drill
```
ip -brief a                  # interfaces: lo, the ethernet link, the docker virtuals
ip route                     # where packets go when they leave
ss -tulpn                    # every listening socket and who owns it
# serve + connect + watch:
python3 -m http.server 8000 &
ss -tulpn | rg ':8000'       # the LISTEN socket for your server
curl -s localhost:8000/ >/dev/null
ss -tn state established | rg ':8000'   # the moment a connection exists
getent hosts devops-learning.history-atlas.workers.dev   # DNS answer: name → IPs
dig +short devops-learning.history-atlas.workers.dev     # the CNAME → where it really resolves
kill %1
```

## Rabbit-hole finish line
- Name your machine's interfaces and say which one the outside world can reach.
- Explain why `127.0.0.1:8000` is unreachable from a phone, despite being a fine address.
- Read one `ss` line and translate it to plain English: who listens, on what, where.

## Resume point
Not started.