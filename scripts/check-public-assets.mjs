import { existsSync, readFileSync } from "node:fs";
import { resolve } from "node:path";

const source=readFileSync(resolve("lib/site-data.ts"),"utf8");
const paths=new Set([...source.matchAll(/["'`](\/images\/[^"'`]+)["'`]/g)].map(match=>match[1]));
for(const slug of [...source.matchAll(/slug:\s*["']([^"']+)["'][\s\S]{0,280}?category:/g)].map(match=>match[1]).slice(-3))paths.add(`/images/aba/news/${slug}.webp`);
const missing=[...paths].filter(path=>!existsSync(resolve("public",path.slice(1))));
if(missing.length){console.error("Images publiques absentes :\n"+missing.join("\n"));process.exit(1)}
console.log(`${paths.size} références d’images publiques vérifiées.`);
