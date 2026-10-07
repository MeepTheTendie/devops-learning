# HTTP under a microscope

> Track 2 · Networking gut · deeper than Chapters 1 & 7

## Goal
See a real HTTP conversation byte-for-byte — and read the headers like the contract they are.

## One layer deeper
- `curl -v` prints the *actual protocol*, not the pretty version: your `GET /path HTTP/1.1`
  plus headers, then the server's status line plus its headers, then body. Everything you
  think you know about "the web" lives in those lines.
- Headers are the negotiation: `Host` (which virtual site on a shared IP), `Content-Length`
  (exact bytes that follow), `Transfer-Encoding: chunked` (streamed, no length known),
  `Connection` (keep-alive reuse), `Cache-Control` (what may be cached and for how long),
  `ETag`/`If-None-Match` (conditional: "nothing changed? give me nothing, 304").
- Status codes are families: `2xx` fine, `3xx` "ask elsewhere" (`301/308` permanent,
  `302/307` temporary, `304` not modified), `4xx` your fault, `5xx` the server's. Earlier
  you saw `/` → `307` → `/index.html` on the live site; that is the test site redirecting.
- `curl -d` is a *body with a method*; `-X POST` alone sends no body, `-X` merely overrides
  the verb. `-L` follows redirects, `-i` shows headers+body, `--compressed` asks for gzip.
- HTTP/1.1 fits one request per connection; HTTP/2 multiplexes on one; HTTP/3 rides UDP +
  QUIC. That's the "why is it called the web but downloaded as files" story's transport.

## Drill
```
curl -v >/dev/null https://devops-learning.history-atlas.workers.dev/        # the handshake verbatim
curl -sSI https://devops-learning.history-atlas.workers.dev/    # status + every header
curl -s -o /dev/null -w 'status:%{http_code} bytes:%{size_download} t:%{time_total}\n' \
     https://devops-learning.history-atlas.workers.dev/book/README.md
curl -s -o /dev/null -w 'status:%{http_code}\n' -H 'Host: broken.example' \
     https://devops-learning.history-atlas.workers.dev/          # headers are the contract
curl -s -L -o /dev/null -w 'followed to: %{url_effective}\n' https://devops-learning.history-atlas.workers.dev/
```

## Rabbit-hole finish line
- Read one raw request and one raw response from `curl -v` end to end.
- Explain what `Cache-Control` and `ETag` do to a repeat request, in your own words.
- Say what `307` meant when the live site's `/` jumped to `/index.html`.

## Resume point
Not started.