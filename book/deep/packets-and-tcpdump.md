# Packets and tcpdump

> Track 2 · Networking gut · deeper than Chapters 7 & 9

## Goal
See the bytes themselves cross this machine's wire and handshake in front of your eyes.

## One layer deeper
- `tcpdump` sniffs packets by attaching to an interface and printing them. Reading it is a
  superpower: you stop debugging theories and start watching the actual conversation.
- The **three-way handshake** is visible: your `SYN`, the `SYN-ACK` back, your `ACK` — then
  data. Retries show as `retransmission` lines (the sender re-sending after silence) — the
  honest cause of many "slow site" feelings.
- **Filter expressions** narrow capture: host, port, `icmp`, `tcp[tcpflags]`. Cleaning
  output (`-n` no names, `-c` count, `-i lo` for yourself-loopback) is most of the skill.
- `ping` is ICMP, not TCP — it proves the network layer bends, not that a *port* is open
  for business. `tcpdump` is how you learn the two are different experiences.

## Drill
```
# watch your own loopback handshake:
tcpdump -i lo -n -c 20 tcp port 8000 &
python3 -m http.server 8000 &
curl -s localhost:8000/ > /dev/null
# then the live site:
tcpdump -n -i any host devops-learning.history-atlas.workers.dev -c 30 &
curl -s https://devops-learning.history-atlas.workers.dev/ > /dev/null
```
Look for `Flags [S]`, `Flags [S.]`, `Flags [.]` — that triple is the handshake, and it
happened for every one of your requests, including the ones to the live site.

## Rabbit-hole finish line
- Point at a captured handshake and narrate who said what first.
- Distinguish a retransmission from new data in a capture.
- Explain why `ping` working doesn't prove a web server is reachable.

## Resume point
Not started.