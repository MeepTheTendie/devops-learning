import {
  HUB_ROOM,
  BOSS_ROOM,
  ZONES,
  WARDEN,
  INTRO,
  VICTORY,
  CLASSES,
  SAVE_KEY,
  TILE,
} from "./world.js";

const BOSS_KEY = "BOSS";
const ZONE_SPAWN = { x: 7, y: 9 };

const el = {
  room: document.getElementById("room"),
  hud: document.getElementById("hud"),
  status: document.getElementById("status"),
  dialogue: document.getElementById("dialogue"),
  dname: document.getElementById("dname"),
  dtext: document.getElementById("dtext"),
  overlay: document.getElementById("overlay"),
  title: document.getElementById("title"),
  titleMenu: document.getElementById("titleMenu"),
};

let mode = "title";
let zoneKey = null;
let x = 0;
let y = 0;
let badges = [];
let dialogue = null;
let pedestalZone = null;
let pending = null;

function room() {
  if (zoneKey === null) return HUB_ROOM;
  if (zoneKey === BOSS_KEY) return BOSS_ROOM;
  return ZONES.find((z) => z.id === zoneKey);
}

function mapCur() {
  return room().map;
}

function hasBadge(key) {
  return badges.includes(key);
}

function setStatus(msg) {
  el.status.textContent = msg;
}

function renderRoom() {
  el.room.replaceChildren();
  const map = mapCur();
  map.forEach((row, ry) => {
    for (let rx = 0; rx < row.length; rx++) {
      const ch = row[rx];
      const tile = document.createElement("div");
      tile.className = "tile " + (CLASSES[ch] || "floor");
      if (/[A-I]/.test(ch)) tile.classList.add("letter");
      if (CLASSES[ch] === undefined) tile.textContent = ch;
      tile.style.left = rx * TILE + "px";
      tile.style.top = ry * TILE + "px";
      el.room.appendChild(tile);
    }
  });
  const player = document.createElement("div");
  player.id = "player";
  player.style.left = x * TILE + "px";
  player.style.top = y * TILE + "px";
  el.room.appendChild(player);
}

function updateHud() {
  const cur = room();
  const links = badges.map((k) => "[" + k + "]").join(" ");
  el.hud.innerHTML =
    cur.name + " <span class='right'>BADGES " + badges.length + "/9</span><br>" +
    (cur === HUB_ROOM
      ? "WARDEN AT N. DOORS A-I. WYRM AT X."
      : "OBJECTIVE: " + cur.objective) +
    (badges.length ? "<br><span class='done'>" + links + "</span>" : "");
}

function save() {
  try {
    localStorage.setItem(
      SAVE_KEY,
      JSON.stringify({
        zone: zoneKey === null ? "HUB" : zoneKey,
        x: x,
        y: y,
        badges: badges,
      })
    );
    console.log("[SAVE] " + (zoneKey === null ? "HUB" : zoneKey) + " @ " + x + "," + y + " badges=" + badges.join(","));
  } catch (err) {
    console.log("[SAVE] failed: " + err);
  }
}

function hasSave() {
  try {
    const raw = localStorage.getItem(SAVE_KEY);
    if (!raw) return false;
    const s = JSON.parse(raw);
    return Array.isArray(s.badges);
  } catch (err) {
    return false;
  }
}

function continueGame() {
  const s = JSON.parse(localStorage.getItem(SAVE_KEY));
  zoneKey = s.zone === "HUB" ? null : s.zone;
  x = s.x;
  y = s.y;
  badges = s.badges;
  mode = "play";
  el.title.hidden = true;
  renderRoom();
  updateHud();
  setStatus("WELCOME BACK. THE CLUSTER REMEMBERS.");
}

function newGame() {
  zoneKey = null;
  x = HUB_ROOM.spawn.x;
  y = HUB_ROOM.spawn.y;
  badges = [];
  mode = "play";
  el.title.hidden = true;
  renderRoom();
  updateHud();
  setStatus("STEP TO A DOOR (A-I). THE WARDEN AT N EXPLAINS ALL.");
  save();
}

function showText(big, sub, text, next) {
  el.overlay.innerHTML =
    "<span class='big'>" + big + "</span>" +
    (sub ? "<p class='sub'>" + sub + "</p>" : "") +
    "<p>" + text + "</p>" +
    "<p class='prompt'>PRESS ENTER</p>";
  el.overlay.hidden = false;
  pending = next;
  mode = "text";
}

function showBadge(cfg) {
  el.overlay.innerHTML =
    "<span class='big'>BADGE — " + cfg.key + "</span>" +
    "<p>" + cfg.name + " SEALS YOUR RING. THE NEXT DOOR OPENS.</p>" +
    "<p class='prompt'>PRESS ENTER</p>";
  el.overlay.hidden = false;
  pending = () => {
    el.overlay.hidden = true;
    x = HUB_ROOM.spawn.x;
    y = HUB_ROOM.spawn.y;
    zoneKey = null;
    mode = "play";
    renderRoom();
    updateHud();
    setStatus("DOOR " + cfg.id + " ANSWERS. BADGE " + cfg.key + " OBTAINED.");
    console.log("[HUB] badge " + cfg.key + " obtained, returned to hub");
  };
  mode = "badge";
}

function openDialogue(name, lines) {
  dialogue = { name: name, lines: lines, i: 0 };
  el.dname.textContent = name;
  el.dtext.textContent = lines[0];
  el.dialogue.hidden = false;
  mode = "dialogue";
}

function nextLine() {
  dialogue.i += 1;
  if (dialogue.i >= dialogue.lines.length) {
    el.dialogue.hidden = true;
    dialogue = null;
    mode = "play";
    setStatus("");
    renderRoom();
    updateHud();
    return;
  }
  el.dtext.textContent = dialogue.lines[dialogue.i];
}

function openPedestal(cfg) {
  pedestalZone = cfg;
  el.overlay.innerHTML =
    "<span class='big'>THE GOLD PEDESTAL</span>" +
    "<p>" + cfg.question + "</p>" +
    "<input id='pwInput' type='text' autocomplete='off' spellcheck='false' placeholder='TYPE YOUR ANSWER'>" +
    "<p class='prompt'>ENTER TO SEAL — ESC TO STEP BACK</p>";
  el.overlay.hidden = false;
  mode = "password";
  const input = el.overlay.querySelector("#pwInput");
  input.focus();
}

function normalize(str) {
  return str.toLowerCase().replace(/[^a-z0-9]/g, "");
}

function submitPassword() {
  const input = el.overlay.querySelector("#pwInput");
  const typed = input.value;
  const given = normalize(typed);
  const want = normalize(pedestalZone.answer);
  if (given === want) {
    el.overlay.hidden = true;
    if (!hasBadge(pedestalZone.key)) badges.push(pedestalZone.key);
    save();
    console.log("[ZONE " + pedestalZone.id + "] correct: " + pedestalZone.answer);
    showBadge(pedestalZone);
  } else {
    input.value = "";
    setStatus("WRONG. THE LESSON HOLDS THE ANSWER.");
    console.log("[ZONE " + pedestalZone.id + "] wrong answer: '" + typed + "'");
    input.classList.remove("shake");
    void input.offsetWidth;
    input.classList.add("shake");
    input.focus();
  }
}

function stepToDoor(letter) {
  const cfg = ZONES.find((z) => z.id === letter);
  if (!cfg) return null;
  if (cfg.require && !hasBadge(cfg.require)) {
    setStatus("LOCKED. YOU NEED THE " + cfg.require + " BADGE FIRST.");
    console.log("[HUB] door " + cfg.id + " locked: requires " + cfg.require);
    return null;
  }
  zoneKey = cfg.id;
  x = ZONE_SPAWN.x;
  y = ZONE_SPAWN.y;
  setStatus("DOOR " + cfg.id + ": " + cfg.name + ".");
  console.log("[ZONE " + cfg.id + "] entered " + cfg.name);
  save();
  mode = "play";
  renderRoom();
  updateHud();
  return cfg;
}

function stepToBoss() {
  if (badges.length < 9) {
    setStatus("THE WYRM SLEEPS BEHIND " + (9 - badges.length) + " MISSING BADGE" + (badges.length === 8 ? "" : "S") + ".");
    console.log("[HUB] wyrm gate closed: " + (9 - badges.length) + " badges short");
    return;
  }
  zoneKey = BOSS_KEY;
  x = BOSS_ROOM.spawn.x;
  y = BOSS_ROOM.spawn.y;
  setStatus("THE OUTAGE WYRM. EARN ITS SILENCE.");
  console.log("[BOSS] entered the wyrm's lair");
  save();
  mode = "play";
  renderRoom();
  updateHud();
}

function interact() {
  if (mode !== "play") return;
  const ch = mapCur()[y][x];
  if (ch === "N") {
    if (zoneKey === null) openDialogue(WARDEN.npc, WARDEN.lines);
    else {
      const cfg = ZONES.find((z) => z.id === zoneKey);
      openDialogue(cfg ? cfg.npc : "?", cfg ? cfg.lines : []);
    }
  }
}

function stepEffects() {
  const ch = mapCur()[y][x];
  if (ch === ">") {
    zoneKey = null;
    x = HUB_ROOM.spawn.x;
    y = HUB_ROOM.spawn.y;
    setStatus("BACK IN THE CLUSTER.");
    console.log("[HUB] returned from zone portal");
    save();
    mode = "play";
    renderRoom();
    updateHud();
    return;
  }
  if (ch === "N") {
    if (zoneKey === null) {
      openDialogue(WARDEN.npc, WARDEN.lines);
    } else {
      const cfg = ZONES.find((z) => z.id === zoneKey);
      openDialogue(cfg ? cfg.npc : "?", cfg ? cfg.lines : []);
    }
    return;
  }
  if (ch === "P") {
    const cfg = ZONES.find((z) => z.id === zoneKey);
    if (cfg) openPedestal(cfg);
    return;
  }
  if (ch === "X") {
    if (zoneKey === BOSS_KEY) {
      el.overlay.innerHTML =
        "<span class='big'>" + VICTORY.big + "</span>" +
        "<p>" + VICTORY.text + "</p>" +
        "<p class='prompt'>PRESS ENTER</p>";
      el.overlay.hidden = false;
      console.log("[BOSS] wyrm unmade");
      save();
      pending = () => {
        el.overlay.hidden = true;
        mode = "title";
        paintTitle();
      };
      mode = "victory";
      return;
    }
    stepToBoss();
    return;
  }
  if (zoneKey === null && /[A-I]/.test(ch)) {
    const cfg = stepToDoor(ch);
    if (!cfg) return;
  }
}

function move(dx, dy) {
  if (mode !== "play") return;
  const map = mapCur();
  const ny = y + dy;
  const nx = x + dx;
  if (ny < 0 || ny >= map.length || nx < 0 || nx >= map[ny].length) return;
  const ch = map[ny][nx];
  if (ch === "#") {
    setStatus("WALL.");
    console.log("[" + room().name + "] wall at " + nx + "," + ny);
    return;
  }
  x = nx;
  y = ny;
  setStatus("");
  stepEffects();
  if (mode === "play") {
    renderRoom();
    updateHud();
  }
}

function paintTitle() {
  el.overlay.hidden = true;
  el.dialogue.hidden = true;
  el.title.hidden = false;
  el.titleMenu.textContent = hasSave()
    ? "CLICK THE PAGE, THEN PRESS ENTER\nSPACE  CONTINUE"
    : "CLICK THE PAGE, THEN PRESS ENTER";
  mode = "title";
}

function watchFocus() {
  window.addEventListener("focus", () => {
    if (mode === "play") setStatus("KEYBOARD READY.");
  });
  window.addEventListener("blur", () => {
    if (mode === "play") setStatus("CLICK THE GAME TO RECAPTURE THE KEYBOARD.");
  });
}

export function handleKey(e) {
  const k = e.key;
  if (mode === "title") {
    if (k === "Enter") {
      e.preventDefault();
      showText(INTRO.big, INTRO.sub, INTRO.text, () => {
        el.overlay.hidden = true;
        newGame();
      });
    } else if (k === " " && hasSave()) {
      e.preventDefault();
      continueGame();
    }
    return;
  }
  if (mode === "play") {
    if (k === "ArrowUp" || k === "w" || k === "W") {
      e.preventDefault();
      move(0, -1);
    } else if (k === "ArrowDown" || k === "s" || k === "S") {
      e.preventDefault();
      move(0, 1);
    } else if (k === "ArrowLeft" || k === "a" || k === "A") {
      e.preventDefault();
      move(-1, 0);
    } else if (k === "ArrowRight" || k === "d" || k === "D") {
      e.preventDefault();
      move(1, 0);
    } else if (k === "z" || k === "Z" || k === "Enter" || k === " ") {
      e.preventDefault();
      interact();
    }
    return;
  }
  if (mode === "dialogue") {
    if (k === "z" || k === "Z" || k === "Enter" || k === " ") {
      e.preventDefault();
      nextLine();
    }
    return;
  }
  if (mode === "password") {
    if (k === "Enter") {
      e.preventDefault();
      submitPassword();
    } else if (k === "Escape" || k === "Esc") {
      e.preventDefault();
      el.overlay.hidden = true;
      pedestalZone = null;
      mode = "play";
      setStatus("THE PEDESTAL WAITS.");
      renderRoom();
    }
    return;
  }
  if (mode === "text" || mode === "badge" || mode === "victory") {
    if (k === "Enter" || k === " " || k === "z" || k === "Z") {
      e.preventDefault();
      const next = pending;
      pending = null;
      if (next) next();
    }
  }
}

export function start() {
  watchFocus();
  paintTitle();
}