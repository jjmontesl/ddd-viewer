module.exports = {
    "env": {
        "browser": true,
        "es2015": true,
        "commonjs": true
    },
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
