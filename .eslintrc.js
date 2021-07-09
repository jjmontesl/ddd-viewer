module.exports = {
    "env": {
        "browser": true,
        "es2015": true,
        //"commonjs": true
    },
    "ignorePatterns": [ "**/ddd-viewer/**/*.js", "**/ddd-viewer/**/*.ts" ],
    "extends": [
        "eslint:recommended",
        "plugin:@typescript-eslint/recommended"
    ],
    "parser": "@typescript-eslint/parser",
    "parserOptions": {
        "ecmaVersion": 12,
        "sourceType": "module"
    },
    "plugins": [
        "@typescript-eslint"
    ],
    "rules": {
        "indent": [
            "error",
            4
        ],
        "quotes": [
            "error",
            "double"
        ],
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
        "no-console": [
            "warning",
            "always"
        ]
        "@typescript-eslint/no-non-null-assertion": "off",
        "@typescript-eslint/no-inferrable-types": "off",
        "@typescript-eslint/no-empty-function": "off",  
        "@typescript-eslint/no-unused-vars": "warn"

    }
};
