export { readFileSync,writeFileSync } from "node:fs";
export { readFile } from "node:fs/promises";
import { createInterface } from "node:readline";
import { stdin,stdout } from "node:process";

export const rl = createInterface({
  input:stdin,
  output:stdout
})