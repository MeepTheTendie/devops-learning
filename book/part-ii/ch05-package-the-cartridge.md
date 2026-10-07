# Chapter 5: Package the Cartridge

> Part II — The Workshop · DevOps skill: Docker

## Goal
Run the exact same game in a container, instead of `python3 -m http.server` on your machine.

## You learn
- An **image** is the recipe: every file, setting, and start command baked in.
- A **container** is one running instance booted from that recipe.
- `Dockerfile` is the recipe file; `docker build` bakes it; `docker run` boots it.
- **Ports** are how the outside world reaches a process inside a container.
- Images are built in **layers** — a changed instruction only rebuilds the layers after it.

## The ideas
"Works on my machine" is the classic lie. A container takes the whole recipe — the game
files, the web server, the runtime — and runs it identically anywhere Docker exists.
You can boot the same cartridge a hundred times and get the same game. `docker ps` shows the
running instances (like `ps` in the previous chapter); `docker images` shows the baked recipes.

The game is a static site, so the smallest honest container is a tiny web server serving the
folder. A `Dockerfile` for that looks like:

```
FROM nginx:alpine
COPY . /usr/share/nginx/html
```

That means: start from the small nginx image, then put the current folder where nginx serves
files from. Two magic lines, but each one hides a real question — which nginx, which files,
which folder — and those questions are the lesson.

## Drill — first
```
docker ps      # what's running right now (you should see the toku-tracker container)
docker images  # what recipes exist locally
```
Read both tables out loud before building anything.

## Drill — the cartridge
The assistant writes the `Dockerfile`. The learner runs:
```
docker build -t devops-quest .      # bake the image
docker images                       # the new recipe appears
docker run -d -p 8081:80 --name quest devops-quest   # boot it, map host 8081 → container 80
docker ps                           # the running instance
curl -i http://127.0.0.1:8081/      # it's serving the game
docker stop quest                   # stop it
docker ps -a                        # stopped, not deleted
docker rm quest                     # delete the instance (image stays)
```

## Finish line
- Explain image versus container in your own words.
- Name which flag maps a host port to a container port, and the direction of that arrow.
- Diagnose what "Address already in use" means when you start a second container on the same port.
- Rebuild the image after a change and say which parts were cached.

## Resume point
Started 2026-10-07: Docker 29.7.2 confirmed installed; `docker ps` shows a running
`toku-tracker-php-tracker` (a real container you did not build — leave it alone).
The Dockerfile task is next.