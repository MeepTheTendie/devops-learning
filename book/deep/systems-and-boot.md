# Down the Rabbit Hole: Boot and services

> Deepens Chapters 4 & 8 · The First Dungeon / Live Ops

## Goal
Answer "who brought this machine to life and who keeps it alive?" — and make your game a
proper citizen of the machine.

## One layer deeper
- PID 1 (`systemd`) is the first process the kernel hands control to at boot; it starts
  everything else and adopts every orphan. `init` is the old name for this patriarch.
- A **unit file** is the recipe systemd uses: what to run, when, under whom, and what to do
  if it dies. `systemctl enable` schedules it at boot; `disable` unreserves it.
- **journald** collects logs from every service into one machine-readable journal;
  `journalctl` is how you read it. It's `tail -f` for the whole system.
- The boot chain: firmware → bootloader → kernel → PID 1 → units. One "slow boot" diagnosis
  is a whole lesson in what this stack means.
- The gap between `python3 -m http.server 8000 &` (caretaker-of-nothing) and a **service**
  (auto-start, auto-restart, logs, killed cleanly) is a big chunk of "Linux rabbit hole."

## Drill
```
systemctl status            # who's alive right now, and the boot time
systemd-analyze             # how long the boot took, user vs system
journalctl -u ssh -n 20     # last 20 lines of the ssh service's journal
systemctl list-units --type=service --state=running   # what's running, all of it
```
Then (with the assistant's unit file ready): bring the game up as a service.
```
sudo systemctl daemon-reload
sudo systemctl start quest
sudo systemctl status quest --no-pager
journalctl -u quest -f      # follow the game's logs like tail -f
sudo systemctl restart quest
sudo systemctl stop quest
```

## Rabbit-hole finish line
- Explain in your own words what PID 1 does, and why killing it would not just break one
  program.
- Read one journal entry for a service and say which unit produced it.
- Make a service auto-restart itself after a crash and prove it happened in the journal.

## Resume point
Not started.