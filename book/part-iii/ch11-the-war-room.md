# Chapter 11: The War Room

> Part III — The Live World · DevOps skill: incident response

## Goal
Run an outage drill end to end: notice, respond, fix, review — without panicking.

## You learn
- A **runbook** is the pre-written answer to a known problem ("site down" → steps 1-3).
- **Triage** is deciding severity fast, not fixing fastest.
- The goal of an incident is to restore service, then to learn — in that order.
- A **blameless postmortem** asks what the system did, not who to fire.
- Communication during an outage is part of the fix.

## Key ideas (skeleton — depth filled during the session)
- Writing the "it's broken" runbook for our own site before anything breaks.
- Severity levels and when each one grants the power to roll back.
- Practicing rollback as an incident procedure, timed, with someone watching logs.

## Planned drills
1. Write a 5-step runbook for the live site. Review it for what a scared person would need.
2. Run a scripted, timed outage: notification → read runbook → roll back → verify → postmortem.
3. Write the postmortem in blameless language: timeline, what went well, action items.

## Finish line
- Take a live outage from notice to restored service using a runbook, under five minutes.
- Write one postmortem that names system causes, not people.
- Explain why panicking is a process failure, not a character flaw.

## Resume point
Not started.