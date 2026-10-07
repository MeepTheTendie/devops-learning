import { start, handleKey } from "./src/engine.js";

document.addEventListener("keydown", handleKey);
start();