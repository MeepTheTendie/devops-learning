# TLS and HTTPS

> Track 2 · Networking gut · deeper than Chapter 10

## Goal
Tear down what `https://` is *actually* protecting: handshake, certificate, chain, and the
impersonation it exists to stop.

## One layer deeper
- HTTPS puts a **TLS handshake** ahead of the HTTP conversation. Its point: prove who
  you're talking to and agree a secret only you two know. After that, bytes are encrypted
  with that secret — symmetric, and fast.
- A **certificate** is a name bound to a public key, signed by someone. The browser decides
  trust by following the **chain**: leaf (the site) ← intermediate(s) ← root (in trust
  store). A **SAN** lists which names the leaf may speak for; expiry and name mismatch fail
  the chain.
- `openssl s_client` does a public handshake from the terminal and prints every step,
  including the server's certificate, the chain sent, and the cipher offered.
- True-measured paranoia: TLS protects *in transit*. Anyone between you and the server gets
  ciphertext. The impersonation case is when a name's DNS answer (Ch: DNS) points at a
  server holding a *different, trusted* certificate — that's the real man-in-the-middle.

## Drill
```
curl -sSI https://devops-learning.history-atlas.workers.dev   # the TLS handshake, front row
openssl s_client -connect devops-learning.history-atlas.workers.dev:443 \
  -showcerts -brief 2>/dev/null
# -state to watch the handshake states, -showcerts to dump the chain
echo | openssl s_client -connect devops-learning.history-atlas.workers.dev:443 2>/dev/null \
  | rg 'subject=|issuer=|Verify return code|Protocol|Cipher'
```
Read the verification line: `ok` means the chain walked all the way to a root this machine
already trusts.

## Rabbit-hole finish line
- Sketch the chain for the live site: leaf name, issuer, and cipher in use.
- Explain in a sentence what the handshake's real job is, beyond "encrypts stuff."
- Say why a name that resolves to a server with a *different* cert is the danger case.

## Resume point
Not started.