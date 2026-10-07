# Observability end to end

> Track 3 · Ops gut · deeper than Chapter 9

## Goal
Wire logs, metrics, and traces together for the game — then promise reliability in numbers.

## One layer deeper
- The three signals answer three questions. **Logs**: *what* happened (events, in order).
  **Metrics**: *how much / how fast* (counters, gauges, rates over time). **Traces**:
  *one request's full journey* across every hop. Individually each is shallow; together they
  turn a secret panic into a searchable story ("metric spiked at t, trace shows the slow
  hop, log shows the error there").
- **Structured logs** are key=value lines so machines can query them; prose is for the
  human eye only. `filter by status→ group by route → count` is a query, not grep therapy.
- An **SLO** is a promise in numbers ("99.9% of requests succeed this quarter"). You cannot
  measure a promise without metrics, and you cannot reuse the numbers without an agreed
  window. The **error budget** is the small slice you're allowed to spend on experiments and
  failures without having violated the promise.
- Alerting done right: an alert is a *decision rule over a metric*, not "figure out if
  things are bad." If silence means everything is fine and the page means "read this
  runbook now," the alert is doing its job.

## Drill
```
# app side: assistant adds request/error counters + structured log lines to a tiny server
curl -s localhost:8000/stats     # the counters, live
# burner engine: hammer it so the numbers move
for i in $(seq 1 50); do curl -s localhost:8000/ >/dev/null & done; wait
curl -s localhost:8000/stats     # requests and error counts moved; latency tail changed
# logs, queried not greped:
journalctl -u quest --since '5 min ago' --output=json-pretty | head -20
```
Then define one alert over a real metric and simulate the condition until it fires (then turn it off).

## Rabbit-hole finish line
- In ten seconds, use the three signals to say what happened during a spike.
- Read a structured log line and extract its fields as a query filter.
- Write one SLO for the game and show the metric that would confirm it.

## Resume point
Not started.