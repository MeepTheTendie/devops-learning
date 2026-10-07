# Interfaces and routing

> Track 2 · Networking gut · deeper than Chapter 7

## Goal
Name every network door on this machine, then trace how the kernel decides which door a
packet leaves by.

## One layer deeper
- An **interface** is a real or virtual network door: `lo` (this machine, talking to
  itself), `enp*`/`eth*` (physical NICs), `wlan*` (Wi-Fi), `veth*`/`docker0` (container
  plumbing), `tun*`/`tap*` (VPNs). Each has addresses.
- An **address** is not the interface; an interface may hold many addresses (real IPv4,
  link-local, IPv6). `ip -brief a` is the one-page truth.
- **Routing** is the kernel's answer to "which door for this destination?" A **route** is a
  (prefix, gateway, interface) triplet. The default route is the catch-all for "the
  internet"; anything more specific wins.
- `127.0.0.1` is a full loopback *to yourself* — it never crosses a real interface, which
  is exactly why a server bound there is invisible to other devices.
- Binding matters more than people think: a server that listens on `0.0.0.0` answers on
  every interface; on `127.0.0.1` it answers to none. Reading your own sockets tells you
  your real exposure faster than any firewall tool.

## Drill
```
ip -brief a                  # every door and its addresses
ip addr show lo              # loopback: protocol 127.0.0.1/8 + ::1/128 are its truth
ip route                     # destination-prefix → gateway → out-interface
ip -br route                 # same, one line each
ip route get 1.1.1.1         # ask the kernel: "which way to the internet?"
ip route get 127.0.0.1       # and which way to myself
cat /proc/net/dev            # the kernel's raw per-interface counters
```

## Rabbit-hole finish line
- Say which interface faces the outside world and which addresses live on it.
- Use `ip route get` to explain *why* two destinations use different doors.
- Explain the difference in visibility between a server bound to `127.0.0.1` and `0.0.0.0`.

## Resume point
Not started.