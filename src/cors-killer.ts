import { randArray } from "./util";

const CORS_FREE_HOSTS = [
	(hostname: string) => hostname === "i.imgur.com", // imgur画像はCORS許可あり
	(hostname: string) => hostname.endsWith("github.io"), // GitHub PagesはCORS対応
	(hostname: string) => hostname.endsWith("raw.githubusercontent.com"), // GitHub rawもCORSあり
	(hostname: string) => hostname === "cdn.jsdelivr.net", // JSDelivrはCORS対応CDN
	(hostname: string) => hostname === "upload.wikimedia.org", // Wikipedia画像CDN
	(hostname: string) => hostname === "images.unsplash.com", // Unsplash画像はCORS許可
	(hostname: string) => hostname.endsWith("googleusercontent.com"), // Google系画像CDN（Blogger等）
	(hostname: string) => hostname.endsWith("picsum.photos"), // Lorem Picsum（CORSあり）
	(hostname: string) => hostname === "placehold.co", // プレースホルダー画像（CORS対応）
	(hostname: string) => hostname === "dummyimage.com", // プレースホルダー画像（古典的）
];

/**
 * 指定された画像URLを、安全かつCanvasなどで使用できる形に整形する
 */
export const corsKiller = (url: string): string => {
	let u: URL;
	try {
		u = new URL(url);
	} catch (_err) {
		// URLオブジェクト化できなければ無効なURLとみなして空文字を返す
		return "";
	}

	// URL オブジェクトのインスタンスを経由して href を取得する方が安全
	const { href, protocol, hostname } = u;

	// プロキシを通す必要がないスキーマはそのまま返す
	// - data:  → Base64 埋め込み形式の画像など
	// - blob:  → JavaScript 内で生成した Blob URL
	// - file:  → ローカルファイル（ブラウザ制限あり）
	if (["data:", "blob:", "file:"].includes(protocol)) return href;

	// CORS制限のないホワイトリストに含まれていればプロキシ不要
	if (CORS_FREE_HOSTS.some((fn) => fn(hostname))) return href;

	// URL文字長があまりにも長い場合は空文字を返す
	// （ブラウザやプロキシが処理できない可能性が高い）
	if (href.length > 2000) return "";

	// 上記以外はCORS制限がある可能性が高いため、プロキシをランダムに使用して回避
	// プロキシは全て公開・無認証サービス（障害時に備えて複数用意）
	const proxied = randArray([
		`https://api.allorigins.win/raw?url=${href}`, // オープンな汎用プロキシ（やや不安定）
		`https://corsproxy.io/?${href}`, // AllOrigins互換の軽量プロキシ
		`https://api.codetabs.com/v1/proxy?quest=${href}`, // 古くからあるCORS対応プロキシ
	]);
	return proxied ? proxied : "";
};
