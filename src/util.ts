/**
 * ランダム抽出
 */
export const randArray = <T>(array: readonly T[]): T | undefined =>
	array[Math.floor(Math.random() * array.length)];
