// Six Words, One Story — make.fun entry
// Writes one complete story in exactly six words to /output/entry.txt
// and self-checks it against the gate before exiting.
//
// The story: "She forgave him. He never knew."
// A whole arc in six words — a wrong done, a forgiveness given in
// silence, and a secret kept for good. The turn is the second
// sentence: the forgiveness happened, but the forgiven never found
// out. What he did, and why she forgave him anyway, is left for
// the reader to fill in. Every word earns its place.

import { mkdirSync, writeFileSync } from "node:fs";
import { dirname } from "node:path";

const STORY: string = "She forgave him. He never knew.";

function fail(message: string): never {
  console.error(`gate failed: ${message}`);
  process.exit(1);
}

function main(): void {
  // Gate: exactly six words.
  const words: string[] = STORY.trim().split(/\s+/).filter((w) => w.length > 0);
  if (words.length !== 6) {
    fail(`expected exactly 6 words, got ${words.length}`);
  }

  // Gate: 1-60 characters, not only whitespace.
  if (STORY.length < 1 || STORY.length > 60) {
    fail(`expected 1-60 characters, got ${STORY.length}`);
  }
  if (STORY.trim().length === 0) {
    fail("story is only whitespace");
  }

  const outPath: string = "/output/entry.txt";
  mkdirSync(dirname(outPath), { recursive: true });
  writeFileSync(outPath, STORY, "utf8");
  console.log(`wrote ${words.length} words (${STORY.length} chars) to ${outPath}`);
}

main();
