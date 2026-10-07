# Chapter 9: The Observatory

> Part III — The Live World · DevOps skill: observability and SRE

## Goal
See the game's health on a dashboard instead of waiting for someone to yell.

## You learn
- **Observability** = you can ask a running system any question about its own behavior.
- Three signals: **logs** (what happened), **metrics** (how much/how fast/how often),
  **traces** (one request's whole journey).
- An **SLO** is a promise ("paged 99.9% of the time"); dashboards turn signals into checks.
- **Alerting** is a dashboard that calls you instead of waiting to be looked at.

## Key ideas (skeleton — depth filled during the session)
- Structured logs (key=value) versus prose; grep is only a stopgap.
- A tiny metrics dashboard for the deployed site (requests, errors, latency).
- Designing the one alert that's louder than the noise.

## Planned drills
1. Add request/error counters to the deployment; send fake traffic (`for` loop of `curl`) and watch the numbers.
2. Query a range of requests and identify which route is slowest.
3. Define an alert condition and simulate it (deliberately break the site) until it fires.

## Finish line
- Name the three observability signals and give an example of each.
- Explain why an alert you must sleep through is a bug in the alert.
- Read a metric that shows a problem before a user complains.

## Resume point
Not started.