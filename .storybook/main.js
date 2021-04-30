const path = require("path");

module.exports = {
  "stories": [
    "../src/**/*.stories.mdx",
    "../src/**/*.stories.@(js|jsx|ts|tsx)"
  ],
  "addons": [
    "@storybook/addon-links",
    "@storybook/addon-essentials",
    "@storybook/addon-actions",
  ],
  "core": {
    "builder": "webpack5"
  },

  "webpackFinal": async (config) => {
    return {
      ...config,
      resolve: {
        alias: {
          "~": path.resolve(__dirname, "../src"),
        },
        extensions: [".tsx", ".ts", ".js"],
      },
    }
  }
}