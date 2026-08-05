"use client";

export function readFileAsDataUrl(file: File): Promise<string> {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => resolve(String(reader.result));
    reader.onerror = () => reject(new Error("Impossible de lire le fichier sélectionné."));
    reader.readAsDataURL(file);
  });
}

export async function fetchAsDataUrl(url: string): Promise<string> {
  const response = await fetch(url);
  if (!response.ok) throw new Error(`Impossible de charger l'image (${response.status}).`);
  const blob = await response.blob();
  return readFileAsDataUrl(new File([blob], "asset", { type: blob.type }));
}

export function escapeXml(value: string): string {
  return value
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&apos;");
}

export function downloadDataUrl(dataUrl: string, filename: string) {
  const anchor = document.createElement("a");
  anchor.href = dataUrl;
  anchor.download = filename;
  document.body.appendChild(anchor);
  anchor.click();
  anchor.remove();
}

export function downloadText(content: string, filename: string, mime = "text/plain;charset=utf-8") {
  const blob = new Blob([content], { type: mime });
  const url = URL.createObjectURL(blob);
  downloadDataUrl(url, filename);
  URL.revokeObjectURL(url);
}

export async function svgToPngDataUrl(svg: string, width: number, height: number): Promise<string> {
  const svgBlob = new Blob([svg], { type: "image/svg+xml;charset=utf-8" });
  const objectUrl = URL.createObjectURL(svgBlob);

  try {
    const image = new Image();
    image.decoding = "async";
    const loaded = new Promise<void>((resolve, reject) => {
      image.onload = () => resolve();
      image.onerror = () => reject(new Error("Le rendu de la carte a échoué."));
    });
    image.src = objectUrl;
    await loaded;

    const canvas = document.createElement("canvas");
    canvas.width = width;
    canvas.height = height;
    const context = canvas.getContext("2d");
    if (!context) throw new Error("Canvas indisponible dans ce navigateur.");
    context.imageSmoothingEnabled = true;
    context.imageSmoothingQuality = "high";
    context.drawImage(image, 0, 0, width, height);
    return setPngDpi(canvas.toDataURL("image/png", 1), 600);
  } finally {
    URL.revokeObjectURL(objectUrl);
  }
}

function crc32(bytes: Uint8Array) {
  let crc = 0xffffffff;
  for (const byte of bytes) {
    crc ^= byte;
    for (let bit = 0; bit < 8; bit += 1) crc = (crc >>> 1) ^ (0xedb88320 & -(crc & 1));
  }
  return (crc ^ 0xffffffff) >>> 0;
}

/** Ajoute le chunk PNG pHYs afin que les logiciels d'impression détectent 600 dpi. */
function setPngDpi(dataUrl: string, dpi: number) {
  const base64 = dataUrl.split(",")[1];
  const binary = atob(base64);
  const source = Uint8Array.from(binary, (character) => character.charCodeAt(0));
  const pixelsPerMeter = Math.round(dpi / 0.0254);
  const type = Uint8Array.from([0x70, 0x48, 0x59, 0x73]); // pHYs
  const data = new Uint8Array(9);
  const dataView = new DataView(data.buffer);
  dataView.setUint32(0, pixelsPerMeter);
  dataView.setUint32(4, pixelsPerMeter);
  data[8] = 1;

  const crcInput = new Uint8Array(type.length + data.length);
  crcInput.set(type);
  crcInput.set(data, type.length);
  const chunk = new Uint8Array(4 + type.length + data.length + 4);
  const chunkView = new DataView(chunk.buffer);
  chunkView.setUint32(0, data.length);
  chunk.set(type, 4);
  chunk.set(data, 8);
  chunkView.setUint32(chunk.length - 4, crc32(crcInput));

  // Signature PNG (8 octets) + chunk IHDR (25 octets).
  const insertAt = 33;
  const output = new Uint8Array(source.length + chunk.length);
  output.set(source.subarray(0, insertAt));
  output.set(chunk, insertAt);
  output.set(source.subarray(insertAt), insertAt + chunk.length);

  let encoded = "";
  const blockSize = 0x8000;
  for (let offset = 0; offset < output.length; offset += blockSize) {
    encoded += String.fromCharCode(...output.subarray(offset, offset + blockSize));
  }
  return `data:image/png;base64,${btoa(encoded)}`;
}

export async function copyRichHtml(html: string, plainText: string) {
  if (navigator.clipboard && "ClipboardItem" in window) {
    const item = new ClipboardItem({
      "text/html": new Blob([html], { type: "text/html" }),
      "text/plain": new Blob([plainText], { type: "text/plain" }),
    });
    await navigator.clipboard.write([item]);
    return;
  }

  const container = document.createElement("div");
  container.innerHTML = html;
  container.style.position = "fixed";
  container.style.opacity = "0";
  container.style.pointerEvents = "none";
  document.body.appendChild(container);

  const selection = window.getSelection();
  const range = document.createRange();
  range.selectNodeContents(container);
  selection?.removeAllRanges();
  selection?.addRange(range);
  document.execCommand("copy");
  selection?.removeAllRanges();
  container.remove();
}
