import fs from "fs";
import path from "path";
import { Dictionary } from "./index";

export function getDict(name: string, basePath?: string): Dictionary {
  return {
    adjectives: getDictFile(path.join(name, "adjectives.txt"), basePath),
    nouns: getDictFile(path.join(name, "nouns.txt"), basePath),
    verbs: getDictFile(path.join(name, "verbs.txt"), basePath),
  };
}

export function getDictFile(name: string, basePath?: string): string[] {
  basePath = basePath || path.resolve(__dirname, "../dict");

  const file = path.resolve(basePath, name);
  return fs.readFileSync(file, "utf-8").trim().split("\n");
}
