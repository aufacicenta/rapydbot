module.exports = {
  parser: "@typescript-eslint/parser",
  parserOptions: {
    tsconfigRootDir: __dirname,
    ecmaVersion: 2018,
    sourceType: "module",
    ecmaFeatures: {
      jsx: true,
    },
    project: ["./tsconfig.eslint.json", "./cypress/tsconfig.eslint.json"],
  },
  plugins: [
    "react",
    "react-hooks",
    "import",
    "@typescript-eslint",
    "testing-library",
    "jest",
    "jest-dom",
    "prettier",
    "unused-imports",
  ],
  extends: [
    "plugin:import/errors",
    "plugin:import/warnings",
    "plugin:import/typescript",
    "plugin:unicorn/recommended",
    "plugin:react/recommended",
    "plugin:jsx-a11y/recommended",
    "plugin:testing-library/recommended",
    "plugin:testing-library/react",
    "plugin:jest-dom/recommended",
    "airbnb",
    "airbnb/hooks",
    "airbnb-typescript",
    "plugin:jest-formatting/recommended",
    "plugin:prettier/recommended",
    "prettier",
  ],
  env: {
    browser: true,
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
    "padding-line-between-statements": ["error", { blankLine: "always", prev: "*", next: ["return", "if", "switch"] }],
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

    // React
    "react/jsx-filename-extension": [1, { extensions: [".ts", ".tsx"] }],
    "react/jsx-props-no-spreading": 0,
    "react/prop-types": 0,
    "react/display-name": 0,
    "react-hooks/rules-of-hooks": "error",
    "react-hooks/exhaustive-deps": "off",
    "react/require-default-props": "off",
    "react/no-unused-prop-types": "off",
    "react/react-in-jsx-scope": "off",
    "react/destructuring-assignment": "off",
    "react/no-unescaped-entities": "off",
    "react/function-component-definition": [
      1,
      {
        namedComponents: "arrow-function",
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
      { vars: "all", varsIgnorePattern: "^_", args: "after-used", argsIgnorePattern: "^_" },
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

    // a11y
    "jsx-a11y/anchor-is-valid": "off",

    // jest-formatting
    "jest-formatting/padding-around-describe-blocks": 2,
    "jest-formatting/padding-around-test-blocks": 2,

    "prettier/prettier": "error",
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
      files: ["**/*.module.scss.d.ts"],
      extends: ["airbnb-typescript", "plugin:prettier/recommended"],
      plugins: ["prettier"],
      rules: {
        camelcase: 0,
        "import/no-default-export": 0,
      },
    },
    {
      files: ["src/pages/**/*.tsx", "src/**/*.story.tsx", "src/pages/**/*.ts"],
      rules: {
        "import/no-default-export": "off",
      },
    },
    {
      files: ["src/tests/index.tsx", "src/api/**/*"],
      rules: {
        "no-restricted-imports": "off",
      },
    },
    {
      files: [
        "src/pages/api/codegen/index.ts",
        "src/pages/api/codegen/resolvers-types.ts",
        "src/pages/api/codegen/index.tsx",
      ],
      rules: {
        "@typescript-eslint/no-explicit-any": "off",
        "@typescript-eslint/ban-types": "off",
        "no-shadow": "off",
        "import/newline-after-import": "off",
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
    {
      files: ["src/api/mock/resolvers/**/*"],
      rules: {
        "@typescript-eslint/no-explicit-any": "off",
      },
    },
  ],
};
