/** @type {import("prettier").Config} */
export default {
  printWidth: 120,
  plugins: ["prettier-plugin-astro"],
  overrides: [
    {
      files: "*.astro",
      options: {
        printWidth: 120,
        parser: "astro",
      },
    },
  ],
};
