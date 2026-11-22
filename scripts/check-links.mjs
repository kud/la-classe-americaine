#!/usr/bin/env node
/**
 * Chapter 6 ships V1's two bonus videos only if they are alive (§2). This checks
 * them and prints what to set in content/films.ts. Dead links are dropped, not shipped.
 */
const LINKS = ["https://www.dailymotion.com/video/x8zvay", "https://www.dailymotion.com/video/x14u5j"];
for (const url of LINKS) {
  const id = url.split("/").pop();
  try {
    const res = await fetch(`https://api.dailymotion.com/video/${id}?fields=title,status,private`, { signal: AbortSignal.timeout(10_000) });
    const data = await res.json();
    const alive = res.ok && data.status === "published" && !data.private;
    console.log(`${alive ? "alive" : "dead "} ${url} ${data.title ? `« ${data.title} »` : ""}`);
  } catch (e) {
    console.log(`unreachable ${url} (${e.message}) — leave alive: false`);
  }
}
