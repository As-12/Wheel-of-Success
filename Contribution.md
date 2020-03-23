# Contribution Guide

## Coding Standards with ESLint + Prettier + AirBnb guideline

This project leverages ESLint and Prettier to enforce frontend code standards based on Airbnb configuration.

A quick setup guide

1. Download the ESLint and Prettier extensions for VSCode.
2. In your project’s root directory, run:
   ```
   npm install -D eslint prettier
   npx install-peerdeps --dev eslint-config-airbnb
   npm install -D eslint-config-prettier eslint-plugin-prettier
   ```
3. Create .eslintrc.json in Project's root directory with the following setting:
   ```
   {
       "extends": ["airbnb", "prettier"],
       "plugins": ["prettier"],
       "rules": {
           "prettier/prettier": ["error"]
       },
   }
   ```
4. Create .prettierrc file in project's root directory with the following content.
   ```
   {
       "printWidth": 100,
       "singleQuote": true
   }
   ```
5. Make sure vscode format code on save (settings.json).
   ```
   "editor.formatOnSave": true
   ```
