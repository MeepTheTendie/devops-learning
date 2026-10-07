# Down the Rabbit Hole

The deep track of the Codex — a terminal-first curriculum for actually *understanding* the
machine, one layer beneath every chapter. No credentials, no filler: wanting to know how the
box works is its own reason. Every page follows the same loop: peel back one layer, run a
drill in the terminal, explain it in your own words.

Three tracks. Work each track top-to-bottom; pages lean on the ones above them.

## Track 1 — Linux gut (the kernel's side of your box)

The layer ricing and scripting never force you into: what a process is, what a file is, how
identity and permissions work, and which knobs the kernel actually listens to.

| # | Page | Deeper than | The layer you peel back |
| --- | --- | --- | --- |
| 1 | [Processes and /proc](processes-and-proc.md) | Ch 4 | How a command becomes a process; the kernel's live filesystem |
| 2 | [Pipes and file descriptors](pipes-and-file-descriptors.md) | Ch 4 | Everything in bash is a table of numbered slots; what `|` and `2>&1` move |
| 3 | [Signals and syscalls](signals-and-syscalls.md) | Ch 4 | Messages processes send; programs talking to the kernel; exit codes 128+n |
| 4 | [Users, permissions, capabilities](users-and-permissions.md) | Ch 4 & 10 | UIDs, setuid, sticky bits, capabilities, and what sudo really delegates |
| 5 | [Filesystems and inodes](filesystems-and-inodes.md) | Ch 4 | A file is a pointer: inodes, hard/sym links, mounts, the ten-bit mode |
| 6 | [Memory and cgroups](memory-and-cgroups.md) | Ch 5 | buff/cache truth, lazy pages, cgroup budgets, OOM, pressure metrics |
| 7 | [Kernel, modules, sysctl](kernel-and-sysctl.md) | Ch 4 & 8 | Version, dmesg, /proc/sys knobs, lsmod, the device tree |
| 8 | [Boot and services](systems-and-boot.md) | Ch 4 & 8 | PID 1, unit files, journald, the whole boot chain |
| 9 | [Storage and disks](storage-and-disks.md) | Ch 8 | Block devices, LVM, fstab, "full but not full", SMART |

## Track 2 — Networking gut (one request, every hop)

From keystroke to edge and back: addresses, routing, the socket table, DNS, the bytes
themselves, encryption, and the firewall that decides who gets in.

| # | Page | Deeper than | The layer you peel back |
| --- | --- | --- | --- |
| 1 | [A request end to end](the-network-stack.md) | Ch 7 | One curl from keystroke to edge and back |
| 2 | [Interfaces and routing](interfaces-and-routing.md) | Ch 7 | NICs, addresses, how the kernel picks the door per destination |
| 3 | [Sockets and connections](sockets-and-ss.md) | Ch 7 | The connection lifecycle, in states you can watch |
| 4 | [HTTP under a microscope](http-under-a-microscope.md) | Ch 1 & 7 | Raw requests; headers as the contract; status families |
| 5 | [DNS, deep](dns-deep.md) | Ch 7 & 13 | Resolvers, record types, CNAME chains, cache and TTL |
| 6 | [NAT and forwarding](nat-and-forwarding.md) | Ch 5 & 7 | ip_forward, SNAT/masquerade, DNAT, conntrack — how every `-p` really works |
| 7 | [Packets and tcpdump](packets-and-tcpdump.md) | Ch 9 | The bytes crossing the wire; watching a handshake |
| 8 | [TLS and HTTPS](tls-and-https.md) | Ch 10 | Handshakes, chains, SANs, impersonation |
| 9 | [IPv6 and dual-stack](ipv6-and-beyond.md) | Ch 7 & 13 | ::1 vs 127.0.0.1, AAAA, SLAAC, why NAT is dying |
| 10 | [Firewalls](firewall-basics.md) | Ch 10 | Filtering what enters and leaves; order-aware rules |

## Track 3 — Ops gut (running things for real)

The layer between "works on my machine" and "runs in production": what containers are
beneath, how they network, CI pipelines, IaC, observability, secrets, backup, hardening,
and the scheduler at scale.

| # | Page | Deeper than | The layer you peel back |
| --- | --- | --- | --- |
| 1 | [Beneath the container](containers-beneath.md) | Ch 5 | What `docker run` actually does: namespaces, cgroups, unions |
| 2 | [Container networking](container-networking.md) | Ch 5 & 7 | veth pair, bridge, and how a port map is really done |
| 3 | [Pipelines and CI](pipelines-and-ci.md) | Ch 6 | From typed command to automated pipeline that can't lie |
| 4 | [Terraform and IaC](terraform-and-iac.md) | Ch 12 | Declarative infra, plan/apply, state, and rebuild-without-memory |
| 5 | [Observability end to end](observability-and-slos.md) | Ch 9 | Logs + metrics + traces; SLOs and error budgets |
| 6 | [Secrets and supply chain](secrets-and-supply-chain.md) | Ch 8 & 10 | Leak paths, SBOMs, scanning, signatures — trusting what you didn't write |
| 7 | [Backups and restores](backups-and-restores.md) | Ch 8 | 3-2-1, restic, and restoring in anger with hash verification |
| 8 | [Hardening in place](hardening-in-place.md) | Ch 10 | Auditing this machine with evidence, not vibes |
| 9 | [Scheduling at scale](scheduling-at-scale.md) | Ch 14 | Kubernetes = scheduler + reconciliation loop on Linux guts |

Reading together: the three tracks interlock on purpose. A container's isolation (T1.7,
T1.6) is what T3.1 unpacks; a published port (T2.6) is what T3.2 rides on; the CI artifact
(T3.3) is what the IaC deploys (T3.4) and observability watches (T3.5).

Rules are the same everywhere: the learner runs the commands, the assistant reads the output
with them, and the finish lines ask for demonstrations, not definitions. Anything that
needs `sudo` is flagged; the default drills are read-only until a page says otherwise.