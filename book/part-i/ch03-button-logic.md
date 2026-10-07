# Chapter 3: Button Logic

> Part I — The Old World · DevOps skill: HTML, CSS, JavaScript basics

## Goal
Move around a small room and inspect its exits — and diagnose a real bug from the console.

## You learn
- The three layers: **HTML** = content, **CSS** = appearance, **JavaScript** = behavior.
- The browser runs all three and reports problems in a **console**.
- `TypeError: Cannot read properties of null` means "I tried to use something that isn't there."
- A game loop tracks a player position and redraws it based on which keys are held.

## The ideas
Open the page, press arrow keys, hit walls, reach the exit. The player is an element; walls
are map data; the loop moves the player only when the target square is walkable. When the
player never appears, the browser tells you where in the code it gave up — that message is
the puzzle, not the punishment.

## Drill
```
python3 -m http.server 8000    # serve it again
ls maps src                    # see how the room is split into files
# open the page, move the player with arrow keys
# open <F12> → Console, read every red entry out loud
```

## Finish line
- Name the three files responsible for content, appearance, and behavior.
- Trigger and read one real console error, then name the element it was missing.
- Explain how walls stop the player.

## Resume point
Conquered 2026-10-07: separated content, appearance and behavior across `index.html`,
`style.css`, `game.js`; served the room from a local server, moved a player with arrow keys,
hit walls, reached the exit, read a real console entry, then diagnosed a real bug from
`TypeError: Cannot read properties of null` — the HTML was missing the `#player` element.
Fixed in commit `fef1346`. Save points so far: `8f36a49`, `29c83aa`, `1b81884`, `fef1346`.