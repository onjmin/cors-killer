import { describe, expect, it } from "vitest";
import { corsKiller } from "../src/cors-killer";

describe("corsKiller", () => {
	it("data URI はそのまま返す", () => {
		const dataUrl = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAA...";
		const result = corsKiller(dataUrl);
		expect(result).toBe(dataUrl);
	});

	it("CORSフリーのホストはそのまま返す", () => {
		const imgurUrl = "https://i.imgur.com/abcdef.png";
		const githubUrl = "https://username.github.io/image.png";
		const rawUrl = "https://raw.githubusercontent.com/user/repo/main/img.png";

		expect(corsKiller(imgurUrl)).toBe(imgurUrl);
		expect(corsKiller(githubUrl)).toBe(githubUrl);
		expect(corsKiller(rawUrl)).toBe(rawUrl);
	});

	it("無効な URL は空文字を返す", () => {
		expect(corsKiller("not-a-url")).toBe("");
		expect(corsKiller("ftp://example.com/image.png")).not.toBe("");
	});

	it("CORS制限があるホストはプロキシURLを返す", () => {
		const blockedUrl = "https://example.com/image.png";
		const result = corsKiller(blockedUrl);
		// プロキシ URL のいずれかが返るはず
		expect(result).toMatch(
			/https:\/\/(api\.allorigins\.win|corsproxy\.io|api\.codetabs\.com)\/.+/,
		);
	});
});
