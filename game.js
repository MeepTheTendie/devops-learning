const MAP = [
  "###############",
  "#.............#",
  "#.............#",
  "#.............#",
  "#.............#",
  "#............D#",
  "#.............#",
  "#.............#",
  "#.............#",
  "#.............#",
  "###############",
];
const TILE = 24;
const room = document.getElementById("room");
const player = document.getElementById("player");
const statusEl = document.getElementById("status");
let x = 1;
let y = 1;

for (let ry = 0; ry < MAP.length; ry++) {
  for (let rx = 0; rx < MAP[ry].length; rx++) {
    const ch = MAP[ry][rx];
    const tile = document.createElement("div");
    tile.className = "tile " + (ch === "#" ? "wall" : ch === "D" ? "door" : "floor");
    tile.style.left = rx * TILE + "px";
    tile.style.top = ry * TILE + "px";
    room.appendChild(tile);
  }
}

function draw() {
  player.style.left = x * TILE + "px";
  player.style.top = y * TILE + "px";
}

function tryMove(dx, dy) {
  const nx = x + dx;
  const ny = y + dy;
  const ch = MAP[ny][nx];
  if (ch === "#") {
    statusEl.textContent = "WALL";
    console.log("wall blocks " + nx + "," + ny);
    return;
  }
  x = nx;
  y = ny;
  if (ch === "D") {
    statusEl.textContent = "EXIT FOUND";
    console.log("exit reached");
  }
  draw();
}

document.addEventListener("keydown", (event) => {
  const moves = { ArrowUp: [0, -1], ArrowDown: [0, 1], ArrowLeft: [-1, 0], ArrowRight: [1, 0] };
  const move = moves[event.key];
  if (!move) return;
  event.preventDefault();
  tryMove(move[0], move[1]);
});

draw();
