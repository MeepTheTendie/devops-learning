# Users, permissions, and capabilities

> Track 1 · Linux gut · deeper than Chapters 4 & 10

## Goal
Deconstruct identity: what a user actually is (a number), how permissions decide, and two
machines that quietly grant power — setuid and capabilities.

## One layer deeper
- A user is a **UID** with a name. `root` is just the one with UID 0. `/etc/passwd` maps
  names → numbers and is world-readable on purpose; password hashes live in `/etc/shadow`
  (root-only). `getent` is the modern way to ask — it also consults LDAP/nsswitch.
- Every process runs as *a set of identities*: real UID (who started it), effective UID
  (who it *acts* as right now), and saved UID. Switching effective UID is how a program
  temporarily wears a borrowed hat without throwing away its own.
- `ls -l`'s first column is type + 9 permission bits — but there are **three more bits**:
  setuid (s for the owner), setgid (s for the group: inherit the directory's group, e.g.
  sharing folders), and sticky (t for other, like `/tmp` — only the owner may delete).
- **setuid**: an executable with that bit runs with the *file owner's* identity, not yours.
  `/usr/bin/passwd` is a famous one — it must write `/etc/shadow`. This is both the point
  and the classic bug farm (a setuid root binary with a buffer overflow = root).
- The modern shrink: **capabilities** split root into ~40 discrete pieces. `getcap` shows
  which a binary holds; container runtimes drop everything and grant back what's needed.
  That's why "runs as root in a container" is far weaker than "root on my laptop."
- `sudo` is a setuid-gated delegator: the policy in `/etc/sudoers` says *who may run what*
  with a password, `NOPASSWD`, or not at all. `sudo -l` prints *your* allowance.

## Drill
```
id                                      # uid, gid, groups — all numbers underneath
getent passwd $(whoami)                 # the name→number record
ls -l /usr/bin/passwd                   # the s in the owner column => setuid
getcap -r /usr/bin /usr/sbin 2>/dev/null | head -15      # who holds capabilities
sudo -l                                 # what sudo would allow YOU (read-only)
ls -ld /tmp                             # sticky t = only owner may delete in here
stat -c '%U(%u) %G(%g) mode=%a' /etc/shadow              # root-only, and why
```

## Rabbit-hole finish line
- Read a `getent passwd` line and a ten-character `ls -l` entry completely.
- Explain why `passwd` can write `/etc/shadow` without you running as root.
- Say the difference between real and effective UID, and give one example of each at work.

## Resume point
Not started.