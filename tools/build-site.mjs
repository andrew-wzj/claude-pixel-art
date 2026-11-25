// Builds the rating issue form and the GitHub Pages gallery from gallery/*/artworks.json.
// usage: node tools/build-site.mjs
import { readFileSync, writeFileSync, mkdirSync } from "node:fs";

const REPO = "andrew-wzj/claude-pixel-art";
const G = "gallery/going-going-gone";
const arts = JSON.parse(readFileSync(`${G}/artworks.json`, "utf8"));
const label = (a) => `${a.id} · ${a.title}`;
const yq = (s) => JSON.stringify(s); // JSON strings are valid YAML double-quoted strings
const esc = (s) => s.replace(/[&<>"]/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;" })[c]);
const scores = ["5 - great / 很好", "4 - good / 好", "3 - okay / 一般", "2 - weak / 较差", "1 - bad / 很差"];

mkdirSync(".github/ISSUE_TEMPLATE", { recursive: true });
writeFileSync(".github/ISSUE_TEMPLATE/rate.yml", `name: Rate an artwork / 给作品打分
description: Compare the old (v1) and new (v2) pixel art for one artwork and score them.
title: "[Rating] "
labels: ["rating"]
body:
  - type: markdown
    attributes:
      value: |
        See both versions in the gallery: https://${REPO.split("/")[0]}.github.io/${REPO.split("/")[1]}/
        在画廊里对比两个版本，然后在下面打分。
  - type: dropdown
    id: artwork
    attributes:
      label: Artwork / 作品
      options:
${arts.map((a) => `        - ${yq(label(a))}`).join("\n")}
    validations:
      required: true
  - type: dropdown
    id: better
    attributes:
      label: Which version is better? / 哪一版更好？
      options:
        - "v2 (new / 新版)"
        - "v1 (old / 旧版)"
        - "About the same / 差不多"
    validations:
      required: true
  - type: dropdown
    id: v1-score
    attributes:
      label: Score for v1 (old) / 给 v1（旧版）打分
      options:
${scores.map((s) => `        - ${yq(s)}`).join("\n")}
    validations:
      required: true
  - type: dropdown
    id: v2-score
    attributes:
      label: Score for v2 (new) / 给 v2（新版）打分
      options:
${scores.map((s) => `        - ${yq(s)}`).join("\n")}
    validations:
      required: true
  - type: textarea
    id: comment
    attributes:
      label: What would make it better? (optional) / 还能怎么改进？（选填）
`);

const rateUrl = (a) => `https://github.com/${REPO}/issues/new?template=rate.yml&title=${encodeURIComponent("[Rating] " + a.title)}&artwork=${encodeURIComponent(label(a))}`;
let lastGroup = "";
const cards = arts.map((a) => {
  const head = a.group !== lastGroup ? `<h2>${esc(a.group)}</h2>` : ""; lastGroup = a.group;
  return `${head}<article>
  <div class="pair">
    <figure><img src="${G}/v1/png/${a.id}.png" alt="${esc(a.title)}, v1" loading="lazy" width="384" height="288"><figcaption>v1 · old / 旧版</figcaption></figure>
    <figure><img src="${G}/v2/png/${a.id}.png" alt="${esc(a.title)}, v2" loading="lazy" width="384" height="288"><figcaption>v2 · new / 新版</figcaption></figure>
  </div>
  <div class="meta"><div><h3>${esc(a.title)}</h3><p>${esc(a.artist)} (parody)</p></div>
  <a class="rate" href="${rateUrl(a)}" target="_blank" rel="noopener">Rate / 打分</a></div>
</article>`;
}).join("\n");

writeFileSync("index.html", `<!doctype html>
<html lang="en">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<title>Claude Pixel Art: rate v1 vs v2</title>
<style>
:root{--bg:#15151c;--card:#1f1f29;--ink:#ecebf2;--muted:#a3a1b3;--line:#33334a;--accent:#f6b13c}
@media (prefers-color-scheme: light){:root{--bg:#f4f2ee;--card:#fff;--ink:#1d1b22;--muted:#5d5a66;--line:#ddd8cf;--accent:#b86a00}}
*{box-sizing:border-box}
body{margin:0;background:var(--bg);color:var(--ink);font:16px/1.55 system-ui,-apple-system,"Segoe UI",sans-serif}
header,main{max-width:1180px;margin:0 auto;padding:0 20px}
header{padding-top:40px;padding-bottom:12px}
h1{font-size:clamp(1.8rem,4vw,2.6rem);margin:0 0 .4rem;letter-spacing:-.01em}
header p{color:var(--muted);max-width:70ch;margin:.3rem 0}
header a{color:var(--accent)}
h2{grid-column:1/-1;margin:28px 0 0;font-size:1.25rem;border-bottom:1px solid var(--line);padding-bottom:6px}
main{display:grid;grid-template-columns:repeat(auto-fill,minmax(min(100%,520px),1fr));gap:16px;padding-bottom:60px}
article{background:var(--card);border:1px solid var(--line);border-radius:12px;padding:12px}
.pair{display:grid;grid-template-columns:1fr 1fr;gap:8px}
figure{margin:0}
img{width:100%;height:auto;display:block;image-rendering:pixelated;border-radius:6px}
figcaption{font-size:.8rem;color:var(--muted);margin-top:4px}
.meta{display:flex;justify-content:space-between;align-items:center;gap:12px;margin-top:10px}
h3{margin:0;font-size:1.05rem}
.meta p{margin:0;color:var(--muted);font-size:.9rem}
.rate{flex:none;background:var(--accent);color:#1d1b22;text-decoration:none;font-weight:700;padding:8px 14px;border-radius:8px}
.rate:hover{filter:brightness(1.1)}
.rate:focus-visible{outline:3px solid var(--ink);outline-offset:2px}
</style>
</head>
<body>
<header>
  <h1>Can Claude learn pixel art? Rate v1 vs v2</h1>
  <p>Claude drew these 36 parody artworks in code, at 64×48 pixels. <strong>v1</strong> was its first try. <strong>v2</strong> was redrawn after studying how good pixel art is made. Tell us which is better: click <strong>Rate</strong> under any artwork. Rating needs a GitHub account.</p>
  <p>Claude 用代码画了这 36 幅恶搞名画（64×48 像素）。<strong>v1</strong> 是第一次尝试，<strong>v2</strong> 是学习像素画技法之后重画的。点每幅画下面的 <strong>打分</strong> 按钮，告诉我们哪一版更好（需要 GitHub 账号）。</p>
  <p><a href="https://github.com/${REPO}">Source and notes on GitHub / 源代码与学习笔记</a></p>
</header>
<main>
${cards}
</main>
</body>
</html>
`);
console.log(`built index.html and .github/ISSUE_TEMPLATE/rate.yml for ${arts.length} artworks`);
