# Chapter 13: The Edge

> Part IV — The Cosmogony · DevOps skill: serverless and edge computing

## Goal
Give the game actual server-side state at the edge, so "where does this run?" stops being a question.

## You learn
- **Serverless** doesn't mean no servers; it means none you manage. Code runs on demand.
- The **edge** is the network of locations that answer requests close to the user.
- **KV** is a fast, eventually-consistent key-value store at the edge (a global badge leaderboard!).
- **Durable Objects** are single-instance, consistent state that live somewhere specific.

## Key ideas (skeleton — depth filled during the session)
- Routes: which requests hit the Worker script versus the static assets.
- A global, read-mostly leaderboard of badge wins from the game save (KV).
- Costs of finally-consistent reads and why a "write then read yourself" test can fail.

## Planned drills
1. Add a Worker binding to the project; handle a route with real code.
2. Store badge completions in KV; read the leaderboard back with `curl`.
3. Simulate reading your own recent write and explain the consistency window.

## Finish line
- Describe, in a sentence, what changes when code runs "at the edge."
- Explain why a KV read after a write might not show the new value.
- Add state to the live game and confirm a second device sees it.

## Resume point
Not started.