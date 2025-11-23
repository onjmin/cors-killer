// src/util.ts
var randArray = (array) => array[Math.floor(Math.random() * array.length)];

// src/cors-killer.ts
var CORS_FREE_HOSTS = [
  (hostname) => hostname === "i.imgur.com",
  // imgur画像はCORS許可あり
  (hostname) => hostname.endsWith("github.io"),
  // GitHub PagesはCORS対応
  (hostname) => hostname.endsWith("raw.githubusercontent.com"),
  // GitHub rawもCORSあり
  (hostname) => hostname === "cdn.jsdelivr.net",
  // JSDelivrはCORS対応CDN
  (hostname) => hostname === "upload.wikimedia.org",
  // Wikipedia画像CDN
  (hostname) => hostname === "images.unsplash.com",
  // Unsplash画像はCORS許可
  (hostname) => hostname.endsWith("googleusercontent.com"),
  // Google系画像CDN（Blogger等）
  (hostname) => hostname.endsWith("picsum.photos"),
  // Lorem Picsum（CORSあり）
  (hostname) => hostname === "placehold.co",
  // プレースホルダー画像（CORS対応）
  (hostname) => hostname === "dummyimage.com"
  // プレースホルダー画像（古典的）
];
var corsKiller = (url) => {
  let u;
  try {
    u = new URL(url);
  } catch (_err) {
    return "";
  }
  const { href, protocol, hostname } = u;
  if (["data:", "blob:", "file:"].includes(protocol)) return href;
  if (CORS_FREE_HOSTS.some((fn) => fn(hostname))) return href;
  if (href.length > 2e3) return "";
  const proxied = randArray([
    `https://api.allorigins.win/raw?url=${href}`,
    // オープンな汎用プロキシ（やや不安定）
    `https://corsproxy.io/?${href}`,
    // AllOrigins互換の軽量プロキシ
    `https://api.codetabs.com/v1/proxy?quest=${href}`
    // 古くからあるCORS対応プロキシ
  ]);
  return proxied ? proxied : "";
};
export {
  corsKiller
};
