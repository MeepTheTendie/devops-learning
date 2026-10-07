# NAT and forwarding

> Track 2 · Networking gut · deeper than Chapters 7 & 5

## Goal
Understand that "your home router" and "a published Docker port" are the same export: the
kernel rewriting addresses while forwarding.

## One layer deeper
- A **router** is a Linux box with `net.ipv4.ip_forward = 1` (see the kernel page) and NAT
  rules. Forwarding = the kernel accepts a packet on one interface and sends it out another
  — the middleman your sockets' default route already implied.
- **Masquerading (SNAT)** rewrites the *source* address on the way out (your laptop's
  private 192.168.x.x → the router's public IP), remembers the conversation in
  **conntrack**, and rewrites the return packets back. That's how a whole house shares one
  public IPv4.
- **DNAT** rewrites the *destination*: "packets to me on TCP/8081 → inside 172.17.0.2:80".
  This is exactly what `docker run -p 8081:80` installs — Docker is your router.
- **conntrack** (`/proc/net/nf_conntrack` / `conntrack -L`) is the kernel's clipboard of
  who's in mid-conversation; NAT only works because return traffic is matched against it.
  Its table and timeouts are why some "works briefly, then dies" NAT bugs happen.
- The modern home-router mental model (and your own machine's role), in one sentence: every
  hop from this laptop to the site is a forwarding decision; this desktop likely only
  forwards between itself and the network (ip_forward = 0 is the honest default).

## Drill (read-only — you are inspecting, not routing)
```
sysctl net.ipv4.ip_forward                         # 0 on this box, probably
ip route get 1.1.1.1                               # the default route: it IS a forwarding answer
cat /proc/net/nf_conntrack | head -20              # active conversations the kernel tracks
ss -tulpn | rg ':(53|80|443|8081)'                 # the host-side doors NAT would serve behind
# docker made a router on your box earlier:
ip -br link show | rg 'docker|veth'                # the bridge and its adapter "wires"
brctl show 2>/dev/null                              # the bridge's learned port table
```

## Rabbit-hole finish line
- Draw the path a reply packet takes back to your browser after a curl to the internet.
- Explain a Docker `-p` mapping in terms of forwarding + DNAT + conntrack.
- Say why `ip_forward=0` is the right default for a desktop.

## Resume point
Not started.