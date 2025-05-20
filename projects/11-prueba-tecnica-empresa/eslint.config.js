import react from "@eslint/react";
import globals from "globals";
import tseslint from "typescript-eslint";
import pluginReact from "eslint-plugin-react";
import { defineConfig } from "eslint/config";


export default defineConfig([
  {
    files: ["**/*.{js,mjs,cjs,ts,jsx,tsx}"],
    plugins: { react },
    extends: ["plugin:react/recommended"],
    parseOptions: {
      project: './tsconfig.json'
    },
    rules: {
      '@typescript-eslint/explicit-function-return-type': 'off',
      'react/react-in-jsx-scope': 'off'
    }
  },
  {
    files: ["**/*.{js,mjs,cjs,ts,jsx,tsx}"],
    languageOptions: {
      globals: globals.browser
    }
  },
  tseslint.configs.recommended,
  pluginReact.configs.flat.recommended,
]);
