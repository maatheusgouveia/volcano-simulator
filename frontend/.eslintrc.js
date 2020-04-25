module.exports = {
	env: {
		browser: true,
		jest: true,
		es6: true,
	},
	extends: [
		'plugin:react/recommended',
		'airbnb',
		'prettier',
		'prettier/react',
	],
	globals: {
		Atomics: 'readonly',
		SharedArrayBuffer: 'readonly',
		__DEV__: true,
	},
	parser: '@typescript-eslint/parser',
	parserOptions: {
		ecmaFeatures: {
			jsx: true,
		},
		ecmaVersion: 2018,
		sourceType: 'module',
	},
	plugins: [
		'react',
		'@typescript-eslint',
		'jsx-a11y',
		'import',
		'react-hooks',
		'prettier',
		'import-helpers',
	],
	rules: {
		'prettier/prettier': 'error',
		'prettier/prettier': ['error', { endOfLine: 'auto' }],
		'react/jsx-filename-extension': [
			'error',
			{ extensions: ['.js', '.jsx'] },
		],
		'import/prefer-default-export': 'off',
		'no-unused-vars': [
			'error',
			{ argsIgnorePattern: '^_', args: 'after-used' },
		],
		'react/jsx-one-expression-per-line': 'off',
		'global-require': 'off',
		'react-native/no-raw-text': 'off',
		'no-param-reassign': 'off',
		'no-underscore-dangle': 'off',
		camelcase: 'off',
		'no-console': ['error', { allow: ['tron'] }],
		'react-hooks/rules-of-hooks': 'error',
		'react-hooks/exhaustive-deps': 'warn',
		'max-classes-per-file': [
			'error',
			5,
		] /* TODO: Retirar esta linha quando todos os arquivos tiverem só uma classe */,
		'react/jsx-props-no-spreading': 'off',
		'import-helpers/order-imports': [
			'warn',
			{
				newlinesBetween: 'always',
				groups: [
					'/^react/',
					'/^styled/',
					'module',
					'/^@/',
					'/^~/',
					'/^@shared/',
					['parent', 'sibling', 'index'],
				],
				alphabetize: { order: 'asc', ignoreCase: true },
			},
		],
		'no-plusplus': ['error', { allowForLoopAfterthoughts: true }],
	},
	settings: {
		'import/resolver': {
			'babel-plugin-root-import': {
				rootPathSuffix: 'src',
			},
		},
	},
};
