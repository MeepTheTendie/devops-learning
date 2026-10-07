# Down the Rabbit Hole: Hardening in place

> Deepens Chapter 10 · Dangerous Ground

## Goal
Audit this actual machine, close the obvious doors, and know exactly which paranoia is
justified and which is theatre.

## One layer deeper
- Harden with **evidence, not vibes**: list what listens, what listens publicly, who can
  run as root, and what auto-starts at boot. Then reduce each.
- The highest-value targets on any Linux box: exposed services, `root` + SSH with
  passwords, unpatched packages, and secrets sitting in world-readable files.
- SSH hardening is the classic: keys over passwords, no root login, disable empty
  passwords. Every change must be tested (a broken sshd config can lock you out).
- Being a solo box ≠ having no attack surface: anything listening on a non-loopback
  address is reachable by your network. `ss` is the audit; firewalls and binds are the fix.

## Drill (read-only audit first — change nothing yet)
```
ss -tulpn                    # what listens, and where (127.x vs 0.0.0.0/::)
systemctl list-units --type=service --state=running   # what is alive right now
getent passwd | awk -F: '$3==0'    # who has UID 0 (root-class) accounts
last -20                     # who logged in, from where
apt list --upgradable 2>/dev/null | wc -l   # how stale the updates are
grep -c PermitRootLogin /etc/ssh/sshd_config 2>/dev/null || echo "not even configured"
```
Then decide with the assistant which one-door change to make *first*, apply it, and verify
the service still works before touching anything else. Paranoia without a test is theatre.

## Rabbit-hole finish line
- Produce a one-page "this machine's obvious doors" summary from real `ss` output.
- Apply exactly one hardening change and prove the affected service still works.
- Explain why "nothing is important on this box" is not a security model.

## Resume point
Not started.