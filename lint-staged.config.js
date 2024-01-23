module.exports = {
  "**/*.{js,jsx,ts,tsx}": ["npx eslint -c .eslintrc.js --fix"],
  // '**/*.{css,less}': [
  // 'npx stylelint  --aei --config  .stylelintrc.js   --fix ',
  // ],
  "**/*.{js,jsx,ts,tsx,md,html,css,less}": "npx prettier --write",
};
