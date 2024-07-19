module.exports = {
    root: true,
    env: {
        es6: true,
        node: true,
    },
    extends: [
        "eslint:recommended",
        "plugin:import/errors",
        "plugin:import/warnings",
        "plugin:import/typescript",
        "google",
        "plugin:@typescript-eslint/recommended",
    ],
    parser: "@typescript-eslint/parser",
    parserOptions: {
        project: ["tsconfig.json"],
        sourceType: "module",
        tsconfigRootDir: __dirname,
    },
    ignorePatterns: [
        "/dist/**/*", // Ignore built files.
        "/dev_test/**/*",
        "/src/test.ts",
		"/coverage/**",
        ".eslintrc.js",
    ],
    plugins: [
        "@typescript-eslint",
        "import",
    ],
    rules: {
        "quotes": ["error", "double"],
        "import/no-unresolved": 0,
        "indent": ["error", 4],
        "max-len": ["error", 200],
        "new-cap": "off",
        "valid-jsdoc": "off",
        "@typescript-eslint/ban-ts-comment": "off",
        "@typescript-eslint/no-explicit-any": "off",
        "no-async-promise-executor": "off",
        "import/export": 0,
    },
};
