# Kernel, modules, and sysctl

> Track 1 · Linux gut · deeper than Chapters 4 & 8

## Goal
Stop treating the kernel as a black box: name yours, read its self-report, and turn the
right runtime knob.

## One layer deeper
- The kernel is a program — with a version (`uname -r`), a boot-time message history
  (`dmesg` / `journalctl -k`), and its own live file cabinets: `/proc` (processes & runtime)
  and `/sys` (the device tree — what the kernel found and how it sees hardware).
- `/proc/sys` holds **runtime knobs**: `net.ipv4.ip_forward` (may this box route?),
  `net.ipv4.ip_unprivileged_port_start` (how low can a non-root bind? 0 on modern kernels,
  which is how containers bind port 80), `vm.swappiness` (how eagerly RAM is swapped),
  `fs.file-max` (how many fds the whole box may hold). `sysctl <name>` reads one;
  `sysctl -w name=value` writes it — but that's *temporary*; a reboot forgets it unless
  it's in `/etc/sysctl.d/*.conf`, loaded at boot.
- The kernel is modular: **modules** are its drivers loaded on demand or at boot.
  `lsmod` = what's loaded; `modinfo` = a module's story; `/lib/modules/$(uname -r)/` is the
  module library that belongs to exactly one kernel. Load a module and you're assembling a
  driver by hand (`modprobe`) — fascinating, needs root, read-only drills below.
- This layer is why "fix the slowness" is a wrong question in ops: the real questions are
  "which knob, which counter, and what does reality say?" Kernel numbers answer.

## Drill (all read-only)
```
uname -a                                # the whole kernel handshake
sysctl vm.swappiness net.ipv4.ip_forward net.ipv4.ip_unprivileged_port_start
cat /proc/cpuinfo | rg 'model name' | head -1
grep -c processor /proc/cpuinfo
lsmod | head -15                        # what's plugged into the running kernel
modinfo ext4 | rg -i 'version|description'   # one module's story
ls /sys/class/net                       # the device tree's view of your NICs
journalctl -k -n 15 --output=short-full # the kernel's own recent diary
```

## Rabbit-hole finish line
- Read a `sysctl` value and explain what the number does to this machine.
- Name two modules currently loaded and say what they give the kernel.
- Find one recent kernel message and narrate what it reported.

## Resume point
Not started.