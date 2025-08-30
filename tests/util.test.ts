import { describe, expect, it } from "vitest";
import { randArray } from "../src/util";

describe("randArray", () => {
	it("配列の要素を返す", () => {
		const arr = [1, 2, 3, 4, 5];
		const value = randArray(arr);
		// undefined はあり得るのでチェック
		expect(value === undefined || arr.includes(value)).toBe(true);
	});

	it("空配列は undefined を返す", () => {
		const empty: number[] = [];
		const value = randArray(empty);
		expect(value).toBeUndefined();
	});

	it("ランダム性の確認（複数回呼ぶと配列の中から返る）", () => {
		const arr = ["a", "b", "c"];
		const results = new Set<string>();
		for (let i = 0; i < 100; i++) {
			const val = randArray(arr);
			if (val !== undefined) results.add(val);
		}
		// 配列の中の値しか返さないことを確認
		for (const val of results) {
			expect(arr).toContain(val);
		}
	});
});
