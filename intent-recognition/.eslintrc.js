module.exports = {
  parser: "@typescript-eslint/parser",
  parserOptions: {
    tsconfigRootDir: __dirname,
    ecmaVersion: 2018,
    sourceType: "module",
    project: ["./tsconfig.eslint.json"],
  },
  plugins: ["import", "@typescript-eslint", "jest", "prettier", "unused-imports"],
  extends: [
    "plugin:import/errors",
    "plugin:import/warnings",
    "plugin:import/typescript",
    "plugin:unicorn/recommended",
    "plugin:prettier/recommended",
    "prettier",
  ],
  env: {
    browser: false,
    es6: true,
    jest: true,
  },
  settings: {
    "import/resolver": {
      node: {
        paths: ["src"],
        moduleDirectory: ["node_modules", "src/"],
        extensions: [".ts", ".tsx"],
      },
    },
  },
  reportUnusedDisableDirectives: true,
  rules: {
    // Eslint
    "no-console": "off",
    "brace-style": ["error", "1tbs", { allowSingleLine: false }],
    "padding-line-between-statements": [
      "error",
      { blankLine: "always", prev: "*", next: ["return", "if", "switch"] },
    ],
    "no-use-before-define": 0,
    "@typescript-eslint/no-use-before-define": 1,
    "arrow-body-style": ["warn", "as-needed"],
    indent: 0,

    // Imports
    "import/no-default-export": "off",
    "import/no-extraneous-dependencies": 0,
    "import/prefer-default-export": 0,
    "import/order": [
      "error",
      {
        groups: [
          ["external", "builtin"],
          ["internal", "parent"],
          ["sibling", "index"],
        ],
        "newlines-between": "always",
      },
    ],
    // We need it because of https://stackoverflow.com/questions/59265981/typescript-eslint-missing-file-extension-ts-import-extensions
    "import/extensions": [
      "error",
      "ignorePackages",
      {
        js: "never",
        jsx: "never",
        ts: "never",
        tsx: "never",
      },
    ],
    "no-restricted-imports": [
      "error",
      {
        paths: [
          {
            name: "@testing-library/react",
            importNames: ["render", "screen", "fireEvent", "act", "cleanup", "wait", "waitFor"],
            message: "Import from 'tests' instead.",
          },
          {
            name: "@testing-library/react-hooks",
            importNames: ["renderHook", "act"],
            message: "Import from 'tests' instead.",
          },
          {
            name: "urql",
            importNames: ["useQuery", "useMutation", "useSubscription"],
            message: "Import generated hook from 'api' instead.",
          },
        ],
      },
    ],

    // Typescript
    "@typescript-eslint/explicit-function-return-type": 0,
    "@typescript-eslint/no-non-null-assertion": 0,
    "@typescript-eslint/no-explicit-any": 1,
    "@typescript-eslint/ban-ts-ignore": 0,
    "@typescript-eslint/consistent-type-definitions": ["error", "type"],
    "@typescript-eslint/prefer-optional-chain": "error",
    "@typescript-eslint/explicit-module-boundary-types": 0,
    "@typescript-eslint/member-ordering": [
      2,
      {
        typeLiterals: ["signature", "field", "method", "constructor"],
      },
    ],
    "@typescript-eslint/ban-types": ["error"],
    "@typescript-eslint/no-empty-function": [
      "error",
      {
        allow: [],
      },
    ],
    "@typescript-eslint/indent": "off",
    "@typescript-eslint/no-unused-vars": "off",
    "unused-imports/no-unused-imports": "error",
    "unused-imports/no-unused-vars": [
      "warn",
      {
        vars: "all",
        varsIgnorePattern: "^_",
        args: "after-used",
        argsIgnorePattern: "^_",
      },
    ],

    // Unicorn
    "unicorn/filename-case": "off",
    "unicorn/prevent-abbreviations": "off",
    "unicorn/no-null": "off",
    "unicorn/prefer-set-has": "off",
    "unicorn/no-useless-undefined": "off",
    "unicorn/no-unreadable-array-destructuring": "off",
    "unicorn/prefer-array-find": "off",
    "unicorn/explicit-length-check": "off",
    "unicorn/prefer-array-some": "off",
    "unicorn/prefer-dom-node-append": "off",
    "unicorn/prefer-dom-node-remove": "off",
    "unicorn/no-array-reduce": "off",
    "unicorn/consistent-destructuring": "off",
    "unicorn/no-array-for-each": "off",

    "prettier/prettier": "error",

    "jest/expect-expect": [
      "error",
      {
        assertFunctionNames: ["expect", "fc.assert"],
      },
    ],
  },
  overrides: [
    {
      files: ["**/*.test.tsx", "**/*.test.ts", "src/api/mock/server.ts"],
      extends: ["plugin:jest/recommended"],
      rules: {
        "@typescript-eslint/no-explicit-any": 0,
      },
    },
    {
      files: ["src/tests/index.tsx", "src/api/**/*"],
      rules: {
        "no-restricted-imports": "off",
      },
    },
    {
      files: ["*.d.ts"],
      rules: {
        "spaced-comment": "off",
        "@typescript-eslint/consistent-type-definitions": "off",
        "@typescript-eslint/triple-slash-reference": "off",
      },
    },
  ],
};
