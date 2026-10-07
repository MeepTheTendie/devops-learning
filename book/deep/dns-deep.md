# DNS, deep

> Track 2 · Networking gut · deeper than Chapters 7 & 13

## Goal
Trace a hostname from your keyboard to an IP address and understand which layer answered.

## One layer deeper
- DNS is a **distributed phonebook with opinions, split by zones**: a piece of it owns the
  truth for a domain, and everyone else asks. The rounds are: your resolver → root servers
  → TLD servers → the domain's authoritative servers → answer.
- **Records** are typed: `A` (name → IPv4), `AAAA` (name → IPv6), `CNAME` (name → another
  name, to be followed), `MX` (mail, with priority), `TXT` (arbitrary text, incl. proofs of
  ownership). `CNAME` is why `.workers.dev` sites have one real name pointing at another.
- Resolution order matters: `/etc/hosts` wins locally; then the configured resolvers
  (via `/etc/resolv.conf`, or the stub resolver / systemd-resolved / dnsmasq). Then caches
  everywhere — TTL decides how long anyone may remember.
- Your `.workers.dev` site's real target is a Cloudflare edge name and then an IP delivered
  by CDN: one hostname, many IPs, chosen for locality. `dig` shows the chain.

## Drill
```
cat /etc/resolv.conf               # who this machine asks
getent hosts devops-learning.history-atlas.workers.dev    # the OS's answer
dig +short devops-learning.history-atlas.workers.dev      # the CNAME chain
dig +noall +answer devops-learning.history-atlas.workers.dev
dig +short devops-learning.history-atlas.workers.dev A; dig +short ... AAAA
echo '127.0.0.1 test-local' | sudo tee -a /etc/hosts      # local override
getent hosts test-local            # now resolved from /etc/hosts
# (remove the line afterwards)
```
Find the record type at the bottom of the chain — that last `A`/`AAAA` is the real
address Cloudflare serves from.

## Rabbit-hole finish line
- Name the four record types you'd need to explain a typical website.
- Explain why a `CNAME` answer still ends with IP addresses.
- Predict what `getent hosts` does that `dig` alone doesn't (local order: hosts, then DNS).

## Resume point
Not started.