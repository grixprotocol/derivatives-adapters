#!/usr/bin/env node

/**
 * CLI tool for generating new protocol adapters
 * 
 * This tool creates a new protocol adapter based on the template adapter.
 * It copies the template adapter to a new directory and replaces all occurrences
 * of "Template" with the new protocol name.
 * 
 * Usage:
 * ```
 * npx ts-node src/perps/tools/create-adapter.ts
 * ```
 */

import fs from 'fs';
import path from 'path';
import { execSync } from 'child_process';
import readline from 'readline';

// Create readline interface for user input
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

// Prompt the user for input
function prompt(question: string): Promise<string> {
  return new Promise((resolve) => {
    rl.question(question, (answer) => {
      resolve(answer);
    });
  });
}

// Main function
async function main() {
  try {
    console.log('🚀 Grix Protocol Adapter Generator 🚀');
    console.log('-----------------------------------');
    console.log('This tool will help you create a new protocol adapter for the Grix Protocol.');
    console.log('');

    // Get protocol name
    const protocolName = await prompt('What is the name of your protocol? ');
    if (!protocolName) {
      throw new Error('Protocol name is required');
    }

    // Format protocol name
    const protocolNameLower = protocolName.toLowerCase();
    const protocolNameCapitalized = protocolName.charAt(0).toUpperCase() + protocolName.slice(1);

    // Get SDK package name
    const sdkPackage = await prompt('What is the npm package name for your protocol SDK? (Leave empty if none) ');

    // Get features
    console.log('\nSelect the features you want to implement:');
    console.log('1. Historical Funding Rates');
    console.log('2. Predicted Funding Rates');
    console.log('3. Open Interest Cap');
    console.log('4. All of the above');
    console.log('5. None of the above (required methods only)');
    const featuresInput = await prompt('Enter the numbers of the features you want to implement (comma-separated): ');
    
    const features = new Set<string>();
    
    if (featuresInput.includes('1') || featuresInput.includes('4')) {
      features.add('historicalFundingRates');
    }
    
    if (featuresInput.includes('2') || featuresInput.includes('4')) {
      features.add('predictedFundingRates');
    }
    
    if (featuresInput.includes('3') || featuresInput.includes('4')) {
      features.add('openInterestCap');
    }

    // Paths
    const rootDir = path.resolve(__dirname, '..', '..');
    const templateDir = path.join(rootDir, 'perps', 'adapters', 'template');
    const targetDir = path.join(rootDir, 'perps', 'adapters', protocolNameLower);

    // Check if target directory already exists
    if (fs.existsSync(targetDir)) {
      const overwrite = await prompt(`Directory ${targetDir} already exists. Overwrite? (y/n) `);
      if (overwrite.toLowerCase() !== 'y') {
        console.log('Aborting...');
        rl.close();
        return;
      }
      
      // Remove existing directory
      fs.rmSync(targetDir, { recursive: true, force: true });
    }

    // Create target directory
    fs.mkdirSync(targetDir, { recursive: true });
    fs.mkdirSync(path.join(targetDir, 'methods'), { recursive: true });
    fs.mkdirSync(path.join(targetDir, 'tests'), { recursive: true });

    // Copy and customize files
    copyAndCustomizeDirectory(templateDir, targetDir, protocolNameLower, protocolNameCapitalized, features);

    // Install SDK package if provided
    if (sdkPackage) {
      console.log(`\nInstalling ${sdkPackage}...`);
      try {
        execSync(`npm install ${sdkPackage}`, { stdio: 'inherit' });
        console.log(`✅ Installed ${sdkPackage}`);
      } catch (error) {
        console.error(`❌ Failed to install ${sdkPackage}. Please install it manually.`);
      }
    }

    console.log(`\n✅ Adapter for ${protocolNameCapitalized} created successfully!`);
    console.log(`📁 Location: ${targetDir}`);
    console.log('\nNext steps:');
    console.log(`1. Implement the required methods in ${targetDir}/methods/`);
    console.log(`2. Update the README.md file with your protocol-specific information`);
    console.log(`3. Write tests for your adapter in ${targetDir}/tests/`);
    console.log(`4. Run the tests: npm test -- --testPathPattern=src/perps/adapters/${protocolNameLower}`);

    rl.close();
  } catch (error) {
    console.error('Error:', error);
    rl.close();
    process.exit(1);
  }
}

// Copy and customize a directory
function copyAndCustomizeDirectory(
  sourceDir: string,
  targetDir: string,
  protocolNameLower: string,
  protocolNameCapitalized: string,
  features: Set<string>
) {
  // Read all files and directories in the source directory
  const entries = fs.readdirSync(sourceDir, { withFileTypes: true });

  for (const entry of entries) {
    const sourcePath = path.join(sourceDir, entry.name);
    const targetPath = path.join(targetDir, entry.name.replace('template', protocolNameLower));

    if (entry.isDirectory()) {
      // Create the target directory
      fs.mkdirSync(targetPath, { recursive: true });
      
      // Recursively copy and customize the directory
      copyAndCustomizeDirectory(sourcePath, targetPath, protocolNameLower, protocolNameCapitalized, features);
    } else {
      // Skip files for features that are not selected
      if (entry.name === 'getHistoricalFundingRates.ts' && !features.has('historicalFundingRates')) {
        continue;
      }
      
      if (entry.name === 'getPredictedFundingRates.ts' && !features.has('predictedFundingRates')) {
        continue;
      }
      
      if (entry.name === 'getPerpsAtOpenInterestCap.ts' && !features.has('openInterestCap')) {
        continue;
      }

      // Read the file content
      let content = fs.readFileSync(sourcePath, 'utf-8');
      
      // Replace all occurrences of "Template" with the protocol name
      content = content.replace(/Template/g, protocolNameCapitalized);
      content = content.replace(/template/g, protocolNameLower);
      
      // Remove imports and exports for features that are not selected
      if (!features.has('historicalFundingRates')) {
        content = content.replace(/import.*getHistoricalFundingRates.*;\n/g, '');
        content = content.replace(/export \* from ['"]\.\/getHistoricalFundingRates['"];\n/g, '');
      }
      
      if (!features.has('predictedFundingRates')) {
        content = content.replace(/import.*getPredictedFundingRates.*;\n/g, '');
        content = content.replace(/export \* from ['"]\.\/getPredictedFundingRates['"];\n/g, '');
      }
      
      if (!features.has('openInterestCap')) {
        content = content.replace(/import.*getPerpsAtOpenInterestCap.*;\n/g, '');
        content = content.replace(/export \* from ['"]\.\/getPerpsAtOpenInterestCap['"];\n/g, '');
      }
      
      // Write the customized content to the target file
      fs.writeFileSync(targetPath, content);
      
      console.log(`✅ Created ${targetPath}`);
    }
  }
}

// Run the main function
main().catch(console.error); 