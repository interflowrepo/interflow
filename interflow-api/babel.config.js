module.exports = {
  presets: [
    [
      "@babel/preset-env",
      {
        targets: {
          node: "current",
        },
      },
    ],
    "@babel/preset-typescript",
  ],
  plugins: [
    [
      "module-resolver",
      {
        alias: {
          "@controller": "./app/controller",
          "@database": "./app/database",
          "@models": "./app/models",
          "@routes": "./app/routes",
          "@middleware": "./app/middleware",
        },
      },
    ],
    ["@babel/plugin-proposal-decorators", { legacy: true }],
    ["@babel/plugin-transform-flow-strip-types"],
    ["@babel/plugin-proposal-class-properties", { loose: true }],
    [
      "inline-dotenv",
      {
        path: "./.env",
      },
    ],
  ],
  ignore: ["**/*.spec.ts"],
};
