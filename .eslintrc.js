const eslintrcImportPlugin = {
  plugins: ["import"],
  settings: {
    "import/internal-regex": "^(?:@/|src/lib)",
    "import/resolver": {
      node: {
        paths: ["."],
      },
    },
  },
  extends: [
    "plugin:import/recommended", // eslint-plugin-import
    "plugin:import/errors", // eslint-plugin-import
    "plugin:import/warnings", // eslint-plugin-import
  ],
  rules: {
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
  typescriptConfig: {
    settings: {
      "import/parsers": {
        "@typescript-eslint/parser": [".ts", ".tsx"],
      },
      "import/resolver": {
        // eslint-import-resolver-typescript
        typescript: {
          project: ".",
          alwaysTryTypes: true,
        },
      },
    },
    extends: [
      "plugin:import/typescript", // Import plugin (eslint-plugin-import)
    ],
  },
};

module.exports = {
  env: {
    browser: true,
    commonjs: true,
    es6: true,
    node: true,
  },
  parserOptions: {
    ecmaVersion: 2020,
  },
  ignorePatterns: ["node_modules/*", ".next/*", ".out/*", "!.prettierrc.js"], // we want to lint .prettierrc.js (ignored by default by eslint)
  settings: {
    ...eslintrcImportPlugin.settings,
    react: {
      version: "detect",
    },
  },
  plugins: [...eslintrcImportPlugin.plugins],
  extends: [
    "eslint:recommended", // eslint
    "plugin:react/recommended", // eslint-plugin-react
    "plugin:react-hooks/recommended", // eslint-plugin-react-hooks
    "plugin:tailwind/recommended", // eslint-plugin-tailwind
    "plugin:jsx-a11y/recommended", // eslint-plugin-jsx-a11y
    "plugin:prettier/recommended", // eslint-config-prettier
    ...eslintrcImportPlugin.extends,
  ],
  rules: {
    "react/prop-types": "off",
    "react/display-name": "off",
    "react/react-in-jsx-scope": "off",
    "react-hooks/exhaustive-deps": "warn",
    "react-hooks/rules-of-hooks": "error",
    "react/jsx-filename-extension": ["error", { extensions: [".tsx", ".jsx"] }],
    "newline-before-return": "error",
    "no-unsafe-optional-chaining": "off",
    "jsx-a11y/anchor-is-valid": "off", // This rule is not compatible with Next.js's <Link /> components
    "prettier/prettier": ["error", {}, { usePrettierrc: true }],
    ...eslintrcImportPlugin.rules,
  },
  overrides: [
    {
      files: ["**/*.ts", "**/*.tsx"],
      plugins: ["@typescript-eslint"],
      parser: "@typescript-eslint/parser",
      settings: {
        ...eslintrcImportPlugin.typescriptConfig.settings,
      },
      extends: [
        ...eslintrcImportPlugin.typescriptConfig.extends,
        "plugin:@typescript-eslint/recommended",
        "plugin:@typescript-eslint/eslint-recommended",
      ],
      rules: {
        "@typescript-eslint/ban-ts-comment": ["warn"],
        "@typescript-eslint/no-unused-vars": ["error"],
        "@typescript-eslint/no-var-requires": ["error"],
        "@typescript-eslint/explicit-module-boundary-types": ["off"],
        "@typescript-eslint/explicit-function-return-type": ["off"],
      },
    },
  ],
};
