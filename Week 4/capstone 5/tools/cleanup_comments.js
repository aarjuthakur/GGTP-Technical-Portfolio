#!/usr/bin/env node
/**
 * Remove long comment headers from all code files and add one-line description at the end
 */

const fs = require('fs');
const path = require('path');
const glob = require('glob');

function getOneLinDescription(filePath) {
  const fileName = path.basename(filePath);
  const dirName = path.dirname(filePath).split(path.sep).pop();

  // Extract TC number if it exists
  const tcMatch = fileName.match(/TC-(\d+)/);

  if (tcMatch) {
    const tcNum = tcMatch[1];
    // For test files, use a generic description
    if (fileName.includes('spec.ts')) {
      return `// ABOUTME: ${tcNum} - ${fileName.replace('.spec.ts', '').replace(/TC-\d+-/, '')}`;
    }
  }

  // For POM files
  if (fileName.includes('Page') && fileName.includes('.ts')) {
    return `// ABOUTME: ${fileName.replace('.ts', '')} - Page Object Model`;
  }

  // For fixture files
  if (dirName === 'fixtures' || fileName.includes('Fixture')) {
    return `// ABOUTME: ${fileName.replace('.ts', '')} - Test data and fixtures`;
  }

  // For config files
  if (dirName === 'config') {
    return `// ABOUTME: ${fileName.replace('.ts', '')} - Configuration`;
  }

  // For utils files
  if (dirName === 'utils') {
    return `// ABOUTME: ${fileName.replace('.ts', '')} - Utility functions`;
  }

  // Default
  return `// ABOUTME: ${fileName.replace('.ts', '')}`;
}

function cleanFile(filePath) {
  let content = fs.readFileSync(filePath, 'utf8');

  // Find and remove the multi-line comment block at the start
  const commentBlockRegex = /^\/\*\*[\s\S]*?\*\/\n*/;
  const hasCommentBlock = commentBlockRegex.test(content);

  if (hasCommentBlock) {
    content = content.replace(commentBlockRegex, '');

    // Remove any leading empty lines
    content = content.replace(/^\n+/, '');

    // Add the one-line description at the end
    const oneLinDesc = getOneLinDescription(filePath);
    content = content.trimEnd() + '\n\n' + oneLinDesc + '\n';

    fs.writeFileSync(filePath, content, 'utf8');
    console.log(`✓ ${filePath}`);
    return true;
  }
  return false;
}

const projectRoot = path.join(__dirname, '..');
const filePatterns = [
  'tests/**/*.spec.ts',
  'pages/*.ts',
  'fixtures/*.ts',
  'config/*.ts',
  'utils/*.ts',
];

let totalFiles = 0;
let cleanedFiles = 0;

filePatterns.forEach(pattern => {
  const files = glob.sync(pattern, { cwd: projectRoot });

  files.forEach(file => {
    const fullPath = path.join(projectRoot, file);
    totalFiles++;
    if (cleanFile(fullPath)) {
      cleanedFiles++;
    }
  });
});

console.log(`\n✓ Cleaned ${cleanedFiles} of ${totalFiles} files`);
