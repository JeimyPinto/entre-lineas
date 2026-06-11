#!/usr/bin/env tsx
/**
 * Interface Finder Script
 * 
 * Usage: npx tsx scripts/find-interfaces.ts <search-term>
 * 
 * This script searches for existing interfaces in the codebase
 * to avoid duplication when creating new components.
 */

import { glob } from 'glob';
import { readFileSync } from 'fs';
import { resolve } from 'path';

const PROJECT_ROOT = resolve(__dirname, '..');
const SRC_DIR = resolve(PROJECT_ROOT, 'src');

interface InterfaceMatch {
  file: string;
  line: number;
  name: string;
  content: string;
}

function findInterfaces(searchTerm: string): InterfaceMatch[] {
  const matches: InterfaceMatch[] = [];
  
  // Search in TypeScript files
  const files = glob.sync('**/*.ts', { cwd: SRC_DIR, absolute: true });
  
  const interfaceRegex = /^(\s*)export\s+interface\s+(\w+)/gm;
  const typeRegex = /^(\s*)export\s+type\s+(\w+)/gm;
  
  for (const file of files) {
    const content = readFileSync(file, 'utf-8');
    const lines = content.split('\n');
    
    for (let i = 0; i < lines.length; i++) {
      const line = lines[i];
      
      // Check for interface
      const interfaceMatch = line.match(/export\s+interface\s+(\w+)/);
      if (interfaceMatch) {
        const name = interfaceMatch[1];
        if (name.toLowerCase().includes(searchTerm.toLowerCase())) {
          matches.push({
            file: file.replace(PROJECT_ROOT + '/', ''),
            line: i + 1,
            name,
            content: line.trim()
          });
        }
      }
      
      // Check for type aliases
      const typeMatch = line.match(/export\s+type\s+(\w+)/);
      if (typeMatch) {
        const name = typeMatch[1];
        if (name.toLowerCase().includes(searchTerm.toLowerCase())) {
          matches.push({
            file: file.replace(PROJECT_ROOT + '/', ''),
            line: i + 1,
            name,
            content: line.trim()
          });
        }
      }
    }
  }
  
  return matches;
}

function printResults(matches: InterfaceMatch[], searchTerm: string) {
  console.log(`\n🔍 Searching for interfaces/types matching: "${searchTerm}"\n`);
  
  if (matches.length === 0) {
    console.log('❌ No matches found. You may need to create a new interface.');
    return;
  }
  
  console.log(`✅ Found ${matches.length} match(es):\n`);
  
  // Group by file
  const byFile = new Map<string, InterfaceMatch[]>();
  for (const match of matches) {
    if (!byFile.has(match.file)) {
      byFile.set(match.file, []);
    }
    byFile.get(match.file)!.push(match);
  }
  
  for (const [file, fileMatches] of byFile) {
    console.log(`📁 ${file}`);
    for (const match of fileMatches) {
      console.log(`   Line ${match.line}: ${match.content}`);
    }
    console.log('');
  }
  
  // Suggest imports
  console.log('💡 Suggested imports:');
  for (const [file] of byFile) {
    const importPath = file
      .replace('src/', '@/')
      .replace('.ts', '');
    console.log(`   import { ${matches.filter(m => m.file === file).map(m => m.name).join(', ')} } from '${importPath}';`);
  }
}

// Main execution
const searchTerm = process.argv[2];

if (!searchTerm) {
  console.log('Usage: npx tsx scripts/find-interfaces.ts <search-term>');
  console.log('Example: npx tsx scripts/find-interfaces.ts Artist');
  process.exit(1);
}

const matches = findInterfaces(searchTerm);
printResults(matches, searchTerm);