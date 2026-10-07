# Storage and disks

> Track 1 · Linux gut · deeper than Chapter 8

## Goal
See storage the way the kernel does: block devices underneath, filesystems on top, and the
plumbing (LVM, fstab) that makes "grow the disk" sound easy.

## One layer deeper
- The kernel talks to **block devices** (`/dev/sda`, `/dev/nvme0n1`); filesystems live on
  top of them. A **partition** is a slice of a device; a filesystem is a structure inside
  that slice.
- **LVM** splits a logical volume across one or more physical volumes: a filesystem sits on
  a logical volume, so you can grow the filesystem by giving the volume more space, then
  extending the filesystem — most of the "resize a disk live" magic you've heard about.
- **fstab** is the boot-time map of what to mount where. A bad fstab line can strand a
  machine in rescue mode — which is why this page is also about reading it carefully.
- “Disk full” checks are never one command: `df -h` (filesystems), `du` (content), and
  `lsof +L1` (deleted files still held open) each answer a *different* question.
- SMART data is the drive arguing for itself: `smartctl` can read temperature, reallocated
  sectors, and the drive's own verdict.

## Drill (read-only — do not write to block devices without supervision)
```
lsblk                       # the tree: devices, sizes, mounts — the whole layout
findmnt                     # who is mounted where, and with what options
blkid                       # filesystem types and UUIDs assigned by the kernels
df -h                       # filesystem fullness
cat /etc/fstab              # read what will mount at boot; note any swap
smartctl -a /dev/nvme0n1 | rg -i 'health|temperature|reallocated'   # or /dev/sda
```

## Rabbit-hole finish line
- Draw (in words) the chain from a block device to a file path, naming each layer.
- Explain why "remove a big file and df still says full" and the command that proves it.
- Say why you would never add a line to fstab without knowing its mount point and type.

## Resume point
Not started.