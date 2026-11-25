// Render a PIXART file (browser-style IIFE exposing PIXART.draw/ids) to PNGs, and build before/after sheets.
// usage: node tools/render.mjs <pixart.js> <outDir> [--scale 6]
//        node tools/render.mjs --compare <v1/pixart.js> <v2/pixart.js> <outDir> [--titles titles.json]
import { readFileSync, writeFileSync, mkdirSync } from "node:fs";
import { deflateSync } from "node:zlib";
import vm from "node:vm";
import { join } from "node:path";

const CRC = new Uint32Array(256).map((_, n) => { let c = n; for (let k = 0; k < 8; k++) c = c & 1 ? 0xedb88320 ^ (c >>> 1) : c >>> 1; return c >>> 0; });
const crc = (b) => { let c = 0xffffffff; for (const x of b) c = CRC[(c ^ x) & 255] ^ (c >>> 8); return (c ^ 0xffffffff) >>> 0; };
function chunk(type, data) { const t = Buffer.from(type), len = Buffer.alloc(4), c = Buffer.alloc(4); len.writeUInt32BE(data.length); c.writeUInt32BE(crc(Buffer.concat([t, data]))); return Buffer.concat([len, t, data, c]); }
export function png(w, h, rgb) { // rgb: Uint8Array w*h*3
  const raw = Buffer.alloc((w * 3 + 1) * h);
  for (let y = 0; y < h; y++) { raw[y * (w * 3 + 1)] = 0; Buffer.from(rgb.buffer, rgb.byteOffset + y * w * 3, w * 3).copy(raw, y * (w * 3 + 1) + 1); }
  const ihdr = Buffer.alloc(13); ihdr.writeUInt32BE(w, 0); ihdr.writeUInt32BE(h, 4); ihdr[8] = 8; ihdr[9] = 2;
  return Buffer.concat([Buffer.from([137, 80, 78, 71, 13, 10, 26, 10]), chunk("IHDR", ihdr), chunk("IDAT", deflateSync(raw, { level: 9 })), chunk("IEND", Buffer.alloc(0))]);
}
const hex = (c) => { c = c.replace("#", ""); if (c.length === 3) c = c.split("").map((x) => x + x).join(""); return [parseInt(c.slice(0, 2), 16), parseInt(c.slice(2, 4), 16), parseInt(c.slice(4, 6), 16)]; };

export function load(file) {
  const ctx = { Math, Uint8Array, Float32Array, Array, Object, String, Number }; vm.createContext(ctx);
  vm.runInContext(readFileSync(file, "utf8") + "\n;this.PIXART=PIXART;", ctx);
  return ctx.PIXART;
}

class Canvas {
  constructor(w, h, bg = "#1b1b22") { this.w = w; this.h = h; this.d = new Uint8Array(w * h * 3); this.rect(0, 0, w, h, bg); }
  rect(x, y, w, h, c) { const [r, g, b] = hex(c); for (let j = Math.max(0, y); j < Math.min(this.h, y + h); j++) for (let i = Math.max(0, x); i < Math.min(this.w, x + w); i++) { const k = (j * this.w + i) * 3; this.d[k] = r; this.d[k + 1] = g; this.d[k + 2] = b; } }
  art(a, x, y, s) { for (let j = 0; j < a.h; j++) for (let i = 0; i < a.w; i++) this.rect(x + i * s, y + j * s, s, s, a.buf[j * a.w + i]); }
  text(str, x, y, c, s, font) { for (const ch of str.toUpperCase()) { const f = font[ch]; if (f) for (let j = 0; j < 5; j++) for (let i = 0; i < 3; i++) if (f[j * 3 + i] === "1") this.rect(x + i * s, y + j * s, s, s, c); x += 4 * s; } }
  save(file) { writeFileSync(file, png(this.w, this.h, this.d)); }
}
const FONT = { A:"010101111101101",B:"110101110101110",C:"011100100100011",D:"110101101101110",E:"111100110100111",F:"111100110100100",G:"011100101101011",H:"101101111101101",I:"111010010010111",J:"001001001101010",K:"101101110101101",L:"100100100100111",M:"101111111101101",N:"110101101101101",O:"010101101101010",P:"110101110100100",Q:"010101101110011",R:"110101110101101",S:"011100010001110",T:"111010010010010",U:"101101101101111",V:"101101101101010",W:"101101111111101",X:"101101010101101",Y:"101101010010010",Z:"111001010100111","0":"111101101101111","1":"010110010010111","2":"110001010100111","3":"110001010001110","4":"101101111001001","5":"111100110001110","6":"011100111101111","7":"111001010010010","8":"111101111101111","9":"111101111001110",".":"000000000000010","-":"000000111000000","'":"010010000000000","#":"101111101111101","&":"010101010101011" };

const args = process.argv.slice(2), opt = (k, d) => { const i = args.indexOf(k); return i >= 0 ? args.splice(i, 2)[1] : d; };
const scale = +opt("--scale", 6), titles = (() => { const f = opt("--titles", null); return f ? JSON.parse(readFileSync(f, "utf8")) : {}; })();
if (args[0] === "--compare") {
  const [, f1, f2, out] = args, A = load(f1), B = load(f2); mkdirSync(out, { recursive: true });
  const ids = B.ids, per = 12, cols = 2, s = 4, aw = 64 * s, ah = 48 * s, pad = 16, lab = 22, cw = aw * 2 + 8 + pad * 2, ch = ah + lab + pad;
  for (let p = 0; p * per < ids.length; p++) {
    const page = ids.slice(p * per, p * per + per), rows = Math.ceil(page.length / cols), c = new Canvas(cw * cols, ch * rows + pad + 24);
    c.text("BEFORE (V1)  VS  AFTER (V2)", pad, 10, "#9a9aa8", 2, FONT);
    page.forEach((id, i) => { const x = (i % cols) * cw + pad, y = Math.floor(i / cols) * ch + pad + 24;
      c.text(((titles[id] || id) + "").slice(0, 32), x, y, "#e8e8f0", 2, FONT);
      c.art(A.draw(id), x, y + lab - 6 + 6, s); c.art(B.draw(id), x + aw + 8, y + lab, s); });
    c.save(join(out, `compare-${p + 1}.png`)); console.log("wrote", join(out, `compare-${p + 1}.png`));
  }
} else {
  const [file, out] = args, P = load(file); mkdirSync(out, { recursive: true });
  for (const id of P.ids) { const a = P.draw(id), c = new Canvas(a.w * scale, a.h * scale); c.art(a, 0, 0, scale); c.save(join(out, id + ".png")); }
  console.log(`wrote ${P.ids.length} images to ${out}`);
}
