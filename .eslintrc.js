module.exports = {
    root: true,
    parser: "@typescript-eslint/parser",
    plugins: [
        "@typescript-eslint",
    ],
    env: {
        node: true,
        browser: true
    },
    extends: [
        "eslint:recommended",
        "plugin:@typescript-eslint/recommended",
    ],
    rules: {
        "@typescript-eslint/ban-types": "off",
        "@typescript-eslint/no-var-requires": 0,
        "sort-imports": [ "error", {
            "allowSeparatedGroups": true,
            "memberSyntaxSortOrder": [ "single", "multiple", "all", "none" ]
        } ],
        "arrow-spacing": [ "error", {
            "before": true,
            "after": true
        } ],
        "object-curly-spacing": [ "error", "always" ],
        "array-bracket-spacing": [ "error", "always" ],
        "eol-last": [ "error", "always" ],
        "no-var": "error",
        "arrow-parens": [ "error", "always" ]
    }
};
