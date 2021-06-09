/* eslint-disable no-mixed-spaces-and-tabs */
module.exports = {
	"root": true,
	"parser": "vue-eslint-parser",
	"env": {
		"browser": true,
		"es2015": true,
		"commonjs": true
	},
	"extends": [
		"plugin:@typescript-eslint/recommended",
    	"plugin:vue/essential",
    	"@vue/typescript",
		"eslint:recommended"
  	],
	
	// "parserOptions": {
	// 	"parser": "@typescript-eslint/parser",
	// },
	"plugins": [
		"@typescript-eslint"
	],
	"rules": {
		"vue/no-unused-components": "off",
		"camelcase": [
			"warn",
			{
				"properties": "always"
			}
		],
		"comma-style": [ "warn", "last" ],
		"eqeqeq": [ "error", "always" ],
		"eol-last": [ "warn" ],
		"no-undef": 2,
		"indent": [
			"error",
			"tab"
		],
		// "quotes": [
		// 	"error",
		// 	"double"
		// ],
		"semi": [
			"error",
			"always"
		],
		"object-curly-spacing": [
			"error",
			"always"
		],
		"array-bracket-spacing": [
			"error",
			"always"
		],
		"space-in-parens": [
			"error",
			"always",
			{
				"exceptions": [
					"{}",
					"[]",
					"()",
					"empty"
				]
			}
		]
	}
};
