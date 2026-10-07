# Filesystems and inodes

> Track 1 · Linux gut · deeper than Chapter 4

## Goal
Stop thinking of a "file" as a thing and start thinking of it as a pointer — then use mount
and link mechanics as tools.

## One layer deeper
- A file's *name* is a **directory entry**; the file itself is an **inode** — a numbered
  record holding the data's location, owner, permissions, and size. Several names can point
  at one inode: that's a **hard link**. `rm` only removes a name; the inode survives while
  any name (or any open handle) still references it.
- On a disk, a file isn't contiguous — it lives in blocks scattered across the device; the
  inode is the map. “Files” do not even have to live on one disk: **mount** grafts one
  filesystem (a device, or even a pseudo-filesystem like `/proc`) onto a directory.
- Permission bits are ten characters, not three numbers: the first is **type** (`d` dir,
  `-` file, `l` symlink, `b` block device, `p` pipe). The last three sets are user/group/
  other, and they're rwx bits (4/2/1).
- A **symlink** is a tiny file whose content is a path; the kernel follows it. Hard links
  cannot cross filesystems or point at directories; symlinks can do both.
- `du` measures what's *in* files; `df` shows filesystem usage. "Disk full but files seem
  small" usually means a deleted-but-still-open file is holding the space hostage.

## Drill
```
echo hi > /tmp/kar.tmp
ls -li /tmp/kar.tmp                    # the inode number, in the first column
ln /tmp/kar.tmp /tmp/kar-hard          # hard link: same inode, another name
ln -s /tmp/kar.tmp /tmp/kar-soft       # symlink: a file holding a path
ls -li /tmp/kar.tmp /tmp/kar-hard /tmp/kar-soft
stat /tmp/kar.tmp                      # inode, links count, blocks
df -h / ; du -sh /var/log              # filesystem space vs file contents
find /tmp -type f -links 0 2>/dev/null # orphaned-open-file candidates are elsewhere
```

## Rabbit-hole finish line
- Show a hard link and a symlink to the same file and explain what `ls -li` reveals about
  each. 
- Explain "disk full" despite small `du` output, and name the command that proves it.
- Give the kernel's own definition of a file (inode, not name).

## Resume point
Not started.