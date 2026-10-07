import { HUB } from "../maps/hub.js";
import { ZONE_A } from "../maps/zoneA.js";
import { ZONE_B } from "../maps/zoneB.js";
import { ZONE_C } from "../maps/zoneC.js";
import { ZONE_D } from "../maps/zoneD.js";
import { ZONE_E } from "../maps/zoneE.js";
import { ZONE_F } from "../maps/zoneF.js";
import { ZONE_G } from "../maps/zoneG.js";
import { ZONE_H } from "../maps/zoneH.js";
import { ZONE_I } from "../maps/zoneI.js";
import { BOSS } from "../maps/boss.js";

export const TILE = 24;
export const SAVE_KEY = "dq_linked_world_v1";

export const CLASSES = {
  "#": "wall",
  ".": "floor",
  ">": "portal",
  N: "npc",
  P: "ped",
  X: "wyrm",
};

export const HUB_ROOM = {
  map: HUB,
  spawn: { x: 2, y: 7 },
  name: "THE CLUSTER",
};

export const BOSS_ROOM = {
  map: BOSS,
  spawn: { x: 7, y: 9 },
  name: "THE OUTAGE WYRM",
  objective: "WALK TO THE X BENEATH THE PILLAR. CLAIM THE WYRM'S SILENCE.",
};

export const ZONES = [
  {
    id: "A",
    key: "LINK",
    name: "THE LINK",
    require: null,
    map: ZONE_A,
    npc: "MAV",
    lines: [
      "I TEND THE LINK, WHERE ONE MACHINE ASKS AND ANOTHER REPLIES.",
      "WALK TO THE GOLDEN PEDESTAL. IT DEMANDS THE COMMAND THAT ASKS A SERVER TO SPEAK.",
      "SERVERS ANSWER WITH A NUMBER OF CONFIDENCE, LIKE 200 OK.",
    ],
    question: "WHICH COMMAND ASKS A SERVER FOR ITS REPLY PAGE?",
    answer: "curl",
    objective: "WALK TO THE GOLD PEDESTAL (P). NAME HOW A CLIENT ASKS A SERVER TO SPEAK.",
  },
  {
    id: "B",
    key: "SAVE",
    name: "SAVE CATHEDRAL",
    require: "LINK",
    map: ZONE_B,
    npc: "THE COMMIT MONK",
    lines: [
      "EVERY PROMISE YOU SEAL IS KEPT HERE, FOREVER, IN THE CATHEDRAL OF GIT.",
      "ASK THE PEDESTAL HOW TO READ THE SEALED LIST OF YOUR SAVE POINTS.",
    ],
    question: "WHICH COMMAND LISTS YOUR SEALED SAVE POINTS?",
    answer: "git log",
    objective: "THE MONK KEEPS YOUR SAVE POINTS. NAME THE COMMAND THAT READS THEM.",
  },
  {
    id: "C",
    key: "BUTTON",
    name: "BUTTON FORGE",
    require: "SAVE",
    map: ZONE_C,
    npc: "PIXEL",
    lines: [
      "THE FORGE HAS THREE RAW METALS: HTML THE BONE, CSS THE SKIN, JS THE MUSCLE.",
      "THE PEDESTAL ASKS WHICH FILE MAKES THE PAGE MOVE.",
    ],
    question: "WHICH FILE IN THIS PROJECT MAKES THE PAGE MOVE?",
    answer: "game.js",
    objective: "THREE RAW METALS: HTML, CSS, JS. NAME THE FILE THAT RUNS BEHAVIOR.",
  },
  {
    id: "D",
    key: "TOOL",
    name: "THE FIRST DUNGEON",
    require: "BUTTON",
    map: ZONE_D,
    npc: "THE CARTOGRAPHER",
    lines: [
      "MY MAPS ARE TRUE, BUT WITHOUT A NAME FOR YOUR CELL I CANNOT GUIDE YOU OUT.",
      "THE SHELL KNOWS WHERE YOU STAND. THE PEDESTAL DEMANDS THAT COMMAND.",
    ],
    question: "WHICH COMMAND PRINTS THE FOLDER YOU STAND IN?",
    answer: "pwd",
    objective: "THE CARTOGRAPHER FORGOT YOUR CELL. PRINT ITS FULL PATH.",
  },
  {
    id: "E",
    key: "CART",
    name: "CART BAY",
    require: "TOOL",
    map: ZONE_E,
    npc: "CLOUD FOREMAN",
    lines: [
      "A CART IS A SEALED WORLD: RUNTIME, FILES, SETTINGS, ALL CARRIED AS ONE.",
      "THE PEDESTAL ASKS THE COMMAND THAT PACKS IT FROM ITS RECIPE.",
    ],
    question: "WHICH COMMAND BUILDS A CART FROM ITS RECIPE?",
    answer: "docker build",
    objective: "PACK THE WHOLE WORLD INTO ONE CART. NAME THE BUILD COMMAND.",
  },
  {
    id: "F",
    key: "QUALITY",
    name: "QUALITY WASTES",
    require: "CART",
    map: ZONE_F,
    npc: "CYCLONE C",
    lines: [
      "EVERY CHANGE MUST FLY THE STORM BEFORE IT SAILS. THAT IS THE GAUNTLET.",
      "CHECK EARLY, CHECK OFTEN, SHIP SOUND. THE PEDESTAL DEMANDS ITS FULL NAME.",
    ],
    question: "WHAT DO THE LETTERS CI STAND FOR?",
    answer: "continuous integration",
    objective: "EVERY CHANGE SURVIVES THE GAUNTLET BEFORE SHIPPING. NAME THE PRACTICE.",
  },
  {
    id: "G",
    key: "SHIP",
    name: "SHIP STRAIT",
    require: "QUALITY",
    map: ZONE_G,
    npc: "HARBORMASTER NS",
    lines: [
      "SHIPS NEED A CHART: NAMES IN TONGUES, NUMBERS UNDER THEM, ONE MAP.",
      "THE PEDESTAL ASKS THE FULL NAME OF THE ADDRESS BOOK THAT LINKS THEM.",
    ],
    question: "WHAT DOES DNS STAND FOR?",
    answer: "domain name system",
    objective: "THE ADDRESS BOOK OF NAMES AND NUMBERS. SPELL ITS FULL NAME.",
  },
  {
    id: "H",
    key: "OPS",
    name: "OPS BUNKER",
    require: "SHIP",
    map: ZONE_H,
    npc: "THE WATCHER",
    lines: [
      "EVERY PROCESS WHISPERS. WHEN ONE CRIES OUT, I READ ITS LAST WORDS.",
      "THE PEDESTAL ASKS THE COMMAND THAT SHOWS THE END OF A LOG.",
    ],
    question: "WHICH COMMAND READS THE LAST LINES OF A LOG?",
    answer: "tail",
    objective: "THE WATCHER READS A LOG'S FINAL WORDS. NAME THE COMMAND.",
  },
  {
    id: "I",
    key: "WORLD",
    name: "THE WORLD ENGINE",
    require: "OPS",
    map: ZONE_I,
    npc: "THE ARCHITECT",
    lines: [
      "WINDS, HOSTS, FIREWALLS — I SING THEM INTO BEING WITH FILES OF WORDS.",
      "WRITE THE WORLD, PLAN THE CHANGE, APPLY IT, AND RISE AGAIN. ITS TOOL?",
    ],
    question: "WHICH TOOL DESCRIBES AND BUILDS YOUR WORLD AS CODE?",
    answer: "terraform",
    objective: "INFRASTRUCTURE AS CODE. NAME THE TOOL THAT BUILDS THE WORLD.",
  },
];

export const WARDEN = {
  npc: "THE WARDEN",
  lines: [
    "I AM THE WARDEN OF THE CLUSTER, WHERE ALL YOUR WORLDS ARE LINKED.",
    "NINE DOORS A-I. EACH HOLDS A GOLD PEDESTAL WITH ONE QUESTION.",
    "ANSWER TRUE, EARN THE BADGE, AND THE NEXT DOOR OPENS.",
    "EARN ALL NINE, AND THE WYRM AT X CAN SLEEP NO LONGER.",
  ],
};

export const INTRO = {
  big: "DEVOPS QUEST",
  sub: "THE LINKED WORLD",
  text: "The Cluster is a grid of servers woven together and humming. But the Outage Wyrm has poisoned its nine domains, and the gates of the linked world have rusted shut. Walk the doors A-I. Question every golden pedestal. Earn all nine badges. Then face the Wyrm.",
};

export const VICTORY = {
  big: "THE WYRM IS UNMADE",
  text: "Nine badges ring — LINK, SAVE, BUTTON, TOOL, CART, QUALITY, SHIP, OPS, WORLD. The Cluster hums true again, and your skills will rebuild it anywhere. Press ENTER to return to the title. Your save remains.",
};