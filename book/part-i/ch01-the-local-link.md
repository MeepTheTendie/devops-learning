# Chapter 1: The Local Link

> Part I — The Old World · DevOps skill: HTTP, clients, servers, ports, status codes

## Goal
Show the title screen from a local server, then prove you understand who asks and who answers.

## You learn
- There is no "the internet" in play yet — one machine, two programs, one conversation.
- A web **request** is a message asking for something; a **response** is a message back.
- A **server** listens on a port; a **client** opens the conversation.
- Status codes are how a server says how it went (200 = fine, 404 = not here).

## The ideas
The title screen is just a file (`index.html`). Your browser can open it as a plain file,
but a web app is meant to be *served*: a program listens on a port and hands the file to
anyone who asks. Serving over HTTP is not the same as opening a file — and it's definitely
not a ping.

## Drill
```
python3 -m http.server 8000        # listen on port 8000
curl -i http://127.0.0.1:8000/     # ask for the page, show headers too
curl http://127.0.0.1:8000/missing # see a 404
curl -i http://127.0.0.1:8000/     # again after editing the file — new text, same server
```
Then stop the server (Ctrl-C) and watch the same `curl` fail to connect.

## Finish line
- Explain to someone what role `curl` played versus the server program.
- Read a status code from a response and say what it means.
- Say why a web request is not a ping.

## Resume point
Conquered 2026-10-07: served `index.html` with Python on `127.0.0.1:8000`, read it with
`curl`, saw a 200 and a 404, stopped the server and watched the connection fail, edited
the file and confirmed the running server returned the new text.