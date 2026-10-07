# IPv6 and dual-stack

> Track 2 · Networking gut · deeper than Chapters 7 & 13

## Goal
Stop treating IPv6 as an exotic add-on. On the modern internet, v6 is the new protocol and
v4 is the carefully preserved legacy.

## One layer deeper
- IPv4's 4.3 billion addresses ran out; IPv6's 128-bit space (2^128 addresses) is the
  replacement. Form: eight groups of hex (`2606:4700::6810:84e5`), `::` compresses zeros.
  Loopback is `::1`; link-local is `fe80::` (always auto-assigned, only this link).
- Every stack that has an address plans for **dual-stack**: a hostname resolves to both
  `A` (v4) and `AAAA` (v6) records; clients pick per policy. `getent hosts` shows both;
  `curl -6` forces v6; `curl -4` forces v4.
- **SLAAC** is automatic v6 addressing: a host derives an address from its own MAC and a
  router's prefix — no DHCP needed. Seeing `fe80::` interfaces appear with zero config is
  the proof.
- v6 changes mental models: NAT largely vanishes on v6 (no shortage to hide behind); every
  device can be globally addressable; firewalls gain importance (the firewall page) precisely
  because "hidden behind NAT" is gone. Containers and Cloudflare both run v6 natively.
- Why you care learning it now: you will troubleshoot "it works here, not there" problems
  whose root cause is one side going v6 and the other not.

## Drill
```
ip -6 addr show                                # do you have v6 at all?
ip -6 route show                               # default via a v6 gateway, or none
getent ahosts devops-learning.history-atlas.workers.dev   # both families listed?
dig +short AAAA devops-learning.history-atlas.workers.dev # does the edge answer v6?
curl -6 -s -o /dev/null -w 'v6 status:%{http_code}\n' https://devops-learning.history-atlas.workers.dev/ || echo "no v6 route here"
curl -4 -s -o /dev/null -w 'v4 status:%{http_code}\n' https://devops-learning.history-atlas.workers.dev/
```

## Rabbit-hole finish line
- Decode one IPv6 address: split the groups, name the bits that are the prefix vs the host.
- Explain why NAT is vanishing on v6 and what firewall role replaces it.
- Prove the live site answers on which address families your machine can reach.

## Resume point
Not started.