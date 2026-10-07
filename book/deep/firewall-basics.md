# Firewalls

> Track 2 · Networking gut · deeper than Chapter 10

## Goal
Filter what may enter and leave this box, with rules, and prove the filter works.

## One layer deeper
- A firewall is a set of rules in the kernel's packet path — not a program that "watches".
  Linux's modern tool is **nftables**; `ufw` is a friendly wrapper on top of it.
- Rules are evaluated top-down: **first match wins**. A typical chain policy is `drop` with
  explicit `allow` rules above it — the order is the point.
- Loopback must stay open (your own machine's chatter); the rules that matter are about
  *non-loopback* traffic. Reading a rule means: if packet matches (interface/addr/port/
  proto), then verdict (accept/drop), then log or not.
- The honest workflow for a solo box: find what listens publicly (`ss`), write rules for
  the *returns* too (established/related), apply, and test from a different interface if
  possible. A firewall you never test on the loopback is self-deception.

## Drill (this machine is a desktop — inspect first, change nothing)
```
sudo nft list ruleset 2>/dev/null | head -40 || sudo iptables -L -v -n 2>/dev/null | head -20
sudo ufw status verbose 2>/dev/null     # the friendly view, if ubuntu-family
ss -tulpn                               # what's actually listening, public vs loopback
```
If you add a rule, do it with the assistant holding the safe-revert plan:
```
sudo ufw allow from 192.168.0.0/16 to any port 22 proto tcp   # example: ssh from LAN only
sudo ufw enable
sudo ufw status verbose
```

## Rabbit-hole finish line
- Read your machine's current rules and say which services they protect.
- Explain the difference between "listening" and "allowed", with an example.
- Add one rule, prove the connection behavior changed, then revert it.

## Resume point
Not started.