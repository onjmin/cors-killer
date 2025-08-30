import { defineConfig } from "vitest/config";

export default defineConfig({
	test: {
		coverage: {
			provider: "v8", // ここで v8 or istanbul を選択
			reporter: ["text", "json", "html"],
			reportsDirectory: "./tests/unit/coverage",
			include: ["src/**/*.{ts,js}"], // カバレッジ対象
			exclude: [
				"src/index.ts",
				"src/**/*.d.ts",
				"tsup.config.ts",
				"vitest.config.ts",
				"tests/**/*",
			],
		},
	},
});
