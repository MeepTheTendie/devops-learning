# Sockets and connections

> Track 2 · Networking gut · deeper than Chapter 7

## Goal
Read a connection's lifecycle from the kernel's own socket table and watch states change.

## One layer deeper
- A **socket** is an endpoint: (interface, IP, port, protocol). A server *listens* on one;
  a client *connects* to one; the kernel then tracks each live conversation separately.
- TCP is a state machine you can observe live in `ss`: `LISTEN` (server waiting),
  `SYN-SENT` (client trying), `ESTAB` (conversation on), `FIN-WAIT`/`TIME-WAIT` (the
  graceful goodbye dance), and `CLOSE` (gone). TIME-WAIT lingering is not a leak — it's the
  kernel keeping late packets from colliding with the next connection's.
- `ss -tulpn` is the whole machine's socket directory: which IP:port, which process owns
  it, state included. It answers "what is exposed on this box" faster and more honestly
  than any firewall listing.

## Drill
```
ss -tulpn                      # everyone listening or connected, with owners
python3 -m http.server 8000 &
ss -tulpn | rg ':8000'         # the LISTEN socket, owned by python3
ss -tn state established       # before any curl: nothing
(curl -s localhost:8000/ >/dev/null &)
ss -tn state established | rg ':8000'    # the ESTAB entry: two addresses, one socket
ss -tn state time-wait | rg ':8000'      # the goodbye lingering
kill %1
```

## Rabbit-hole finish line
- Read one `ss` line aloud: who listens, where, in what state, owned by what.
- Name two TCP states and what made the connection enter each.
- Explain why a burst of TIME-WAIT sockets is normal, not a misconfiguration.

## Resume point
Not started.