import { julr } from "@julr/tooling-configs/eslint";

export function baseEslintConfig(extra = {}) {
	return julr(
		{
			jsonc: false,
			typescript: {
				forceDecorators: true,
				tsconfigPath: ["./tsconfig.json", "./inertia/tsconfig.json"],
			},
		},
		{
			ignores: [
				"apps/server/types/db.ts",
				"**/.adonisjs/**",
				"**/build/**",
				"build/**",
			],
		},
		{
			rules: {
				"@typescript-eslint/no-redeclare": "off",
				"@typescript-eslint/no-empty-object-type": "off",
			},
			...extra,
		},
	);
}
