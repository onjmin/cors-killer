import { describe, expect, it, vi, beforeEach } from "vitest";
import { corsKiller } from "./cors-killer";
import * as util from "./util";

// randArray をモックして毎回同じものを返す
beforeEach(() => {
	vi.spyOn(util, "randArray").mockImplementation((arr) => arr[0]);
});

describe("corsKiller", () => {
	it("data/blob/file スキーマはそのまま返す", () => {
		const dataUrl = "data:image/png;base64,AAA";
		const blobUrl = "blob:https://example.com/12345";
		const fileUrl = "file:///C:/path/to/image.png";

		expect(corsKiller(dataUrl)).toBe(dataUrl);
		expect(corsKiller(blobUrl)).toBe(blobUrl);
		expect(corsKiller(fileUrl)).toBe(fileUrl);
	});

	it("CORSフリーのホストはそのまま返す", () => {
		const urls = [
			"https://i.imgur.com/abc.png",
			"https://example.github.io/abc.png",
			"https://raw.githubusercontent.com/u/r/main/img.png",
			"https://cdn.jsdelivr.net/npm/package/file.png",
			"https://upload.wikimedia.org/wikipedia/commons/a/a9/Example.jpg",
			"https://images.unsplash.com/photo-123",
			"https://lh3.googleusercontent.com/abcd",
			"https://picsum.photos/200/300",
			"https://placehold.co/200x100",
			"https://dummyimage.com/600x400/000/fff",
		];

		for (const url of urls) {
			expect(corsKiller(url)).toBe(url);
		}
	});

	it("無効なURLは空文字を返す", () => {
		expect(corsKiller("not-a-url")).toBe("");
		expect(corsKiller("http://")).toBe(""); // 不完全URL
	});

	it("未知のスキーマ(ftp)はプロキシに変換される", () => {
		const ftpUrl = "ftp://example.com/image.png";
		const result = corsKiller(ftpUrl);
		expect(result).toMatch(/^https:\/\/api\.allorigins\.win\/raw\?url=/);
	});

	it("CORS制限があるホストはプロキシを返す", () => {
		const blockedUrl = "https://example.com/image.png";
		const result = corsKiller(blockedUrl);
		expect(result).toMatch(/^https:\/\/api\.allorigins\.win\/raw\?url=/);
	});
});
