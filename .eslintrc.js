module.exports = {
    root: true,
    parser: "@typescript-eslint/parser",
    plugins: [
        "@typescript-eslint",
    ],
    extends: [
        "eslint:recommended",
        "plugin:@typescript-eslint/recommended",
    ],
    rules: {
        "@typescript-eslint/ban-types": "off",
        "sort-imports": ["error", {
            "allowSeparatedGroups": true,
            "memberSyntaxSortOrder": ["single", "multiple", "all", "none"]
        }],
        "arrow-spacing": ["error", {
            "before": true,
            "after": true
        }],
        "object-curly-spacing": ["error", "always"]
    }
};