module.exports = {
  ignorePatterns: [
    "node_modules/*",
    ".next/*",
    ".out/*",
    ".env*",
    ".eslintrc.js",
    "!.prettierrc.js",
  ], // we want to lint .prettierrc.js (ignored by default by eslint)
  plugins: ["@typescript-eslint"],
  extends: [
    "eslint:recommended",
    "plugin:tailwind/recommended",
    "plugin:prettier/recommended",
    "plugin:@typescript-eslint/recommended",
    "plugin:@typescript-eslint/eslint-recommended",
    "next/core-web-vitals",
    "plugin:@next/next/recommended",
  ],
  rules: {
    "react/prop-types": "off",
    "react/display-name": "off",
    "react/react-in-jsx-scope": "off",
    "react/jsx-filename-extension": ["error", { extensions: [".tsx", ".jsx"] }],
    "newline-before-return": "error",
    "no-unsafe-optional-chaining": "off",
    "jsx-a11y/anchor-is-valid": "off",
    "@typescript-eslint/ban-ts-comment": ["warn"],
    "@typescript-eslint/no-unused-vars": ["error"],
    "@typescript-eslint/no-var-requires": ["error"],
    "@typescript-eslint/explicit-module-boundary-types": ["off"],
    "@typescript-eslint/explicit-function-return-type": ["off"],
    "import/named": "warn",
    "import/export": "warn",
    "import/no-cycle": "error",
    "import/no-relative-parent-imports": "off",
    "import/no-unassigned-import": [
      "error",
      { allow: ["**/*.css", "**/*.png", "**/*.svg", "**/*.jpg", "**/*.jpeg"] },
    ],
    "import/order": [
      "error",
      {
        groups: [
          ["builtin", "external"],
          "internal",
          ["parent", "sibling", "index"],
          "type",
        ],
        pathGroups: [
          {
            pattern: "ui",
            group: "internal",
            position: "before",
          },
        ],
        pathGroupsExcludedImportTypes: ["builtin", "external"],
        "newlines-between": "always",
        alphabetize: {
          order: "asc",
          caseInsensitive: true,
        },
      },
    ],
  },
  settings: {
    "import/internal-regex": "^(?:@/|src/lib)",
  },
};
