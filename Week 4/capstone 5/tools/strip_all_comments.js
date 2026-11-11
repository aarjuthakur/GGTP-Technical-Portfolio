#!/usr/bin/env node
const fs = require('fs');
const path = require('path');
const glob = require('glob');

const projectRoot = path.join(__dirname, '..');

const patterns = [
  'tests/**/*.spec.ts',
  'tests/support/*.ts',
  'pages/*.ts',
  'fixtures/*.ts',
  'config/*.ts',
  'utils/*.ts',
  'playwright.config.ts',
];

let changed = 0;
let total = 0;

patterns.forEach(pattern => {
  const files = glob.sync(pattern, { cwd: projectRoot });
  files.forEach(file => {
    const fullPath = path.join(projectRoot, file);
    const original = fs.readFileSync(fullPath, 'utf8');
    let content = original;

    // Remove all /** ... */ block comments (multi-line JSDoc)
    content = content.replace(/\/\*\*[\s\S]*?\*\/\s*\n?/g, '');

    // Remove // ABOUTME lines and any blank lines around them at end of file
    content = content.replace(/\n*\/\/ ABOUTME:.*\n*/g, '\n');

    // Clean up excessive blank lines (3+ consecutive → 2)
    content = content.replace(/\n{3,}/g, '\n\n');

    // Trim trailing whitespace at end of file, keep single newline
    content = content.trimEnd() + '\n';

    total++;
    if (content !== original) {
      fs.writeFileSync(fullPath, content, 'utf8');
      console.log(`  cleaned: ${file}`);
      changed++;
    }
  });
});

console.log(`\nDone: ${changed} of ${total} files cleaned.`);
