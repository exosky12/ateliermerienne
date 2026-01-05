import { julr } from '@julr/tooling-configs/eslint';

export function baseEslintConfig(extra = {}) {
	return julr(
		{
			jsonc: false,
			typescript: {
				forceDecorators: true,
				tsconfigPath: ['./tsconfig.json', './inertia/tsconfig.json'],
			},
		},
		{
			ignores: ['apps/server/types/db.ts'],
		},
		{
			rules: {
				'@typescript-eslint/no-redeclare': 'off',
				'@typescript-eslint/no-empty-object-type': 'off',
				'perfectionist/sort-imports': [
					'error',
					{
						groups: ['side-effect', 'builtin', 'external', 'internal', 'parent', 'sibling', 'index', 'type'],
						internalPattern: ['^#.+', '^~/.+'],
						newlinesBetween: 'never',
						order: 'asc',
						type: 'alphabetical',
					},
				],
			},
			...extra,
		}
	);
}
