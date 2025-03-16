#!/usr/bin/env node

/**
 * Documentation generator for protocol adapters
 * 
 * This tool generates documentation for a protocol adapter based on its implementation.
 * It reads the adapter's source code and generates a README.md file with API documentation.
 * 
 * Usage:
 * ```
 * npx ts-node src/perps/tools/generate-docs.ts <adapter-name>
 * ```
 */

import fs from 'fs';
import path from 'path';
import ts from 'typescript';

// Main function
async function main() {
  try {
    // Get adapter name from command line arguments
    const adapterName = process.argv[2];
    if (!adapterName) {
      console.error('Please provide an adapter name');
      console.error('Usage: npx ts-node src/perps/tools/generate-docs.ts <adapter-name>');
      process.exit(1);
    }

    // Paths
    const rootDir = path.resolve(__dirname, '..', '..');
    const adapterDir = path.join(rootDir, 'perps', 'adapters', adapterName.toLowerCase());
    
    // Check if adapter directory exists
    if (!fs.existsSync(adapterDir)) {
      console.error(`Adapter directory ${adapterDir} does not exist`);
      process.exit(1);
    }

    // Read adapter files
    const adapterFiles = getAllFiles(adapterDir);
    
    // Parse adapter files
    const adapterInfo = parseAdapterFiles(adapterFiles);
    
    // Generate README.md
    const readmePath = path.join(adapterDir, 'README.md');
    const readme = generateReadme(adapterName, adapterInfo);
    
    // Write README.md
    fs.writeFileSync(readmePath, readme);
    
    console.log(`✅ Generated README.md for ${adapterName} adapter`);
    console.log(`📁 Location: ${readmePath}`);
  } catch (error) {
    console.error('Error:', error);
    process.exit(1);
  }
}

// Get all files in a directory recursively
function getAllFiles(dir: string): string[] {
  const files: string[] = [];
  
  const entries = fs.readdirSync(dir, { withFileTypes: true });
  
  for (const entry of entries) {
    const fullPath = path.join(dir, entry.name);
    
    if (entry.isDirectory()) {
      files.push(...getAllFiles(fullPath));
    } else if (entry.isFile() && entry.name.endsWith('.ts')) {
      files.push(fullPath);
    }
  }
  
  return files;
}

// Parse adapter files
function parseAdapterFiles(files: string[]): any {
  const adapterInfo: any = {
    config: {},
    methods: {},
    interfaces: {},
  };
  
  for (const file of files) {
    const content = fs.readFileSync(file, 'utf-8');
    const sourceFile = ts.createSourceFile(
      file,
      content,
      ts.ScriptTarget.Latest,
      true
    );
    
    // Parse the source file
    ts.forEachChild(sourceFile, (node) => {
      if (ts.isInterfaceDeclaration(node) && node.name.text.endsWith('AdapterConfig')) {
        // Parse adapter config
        adapterInfo.config.name = node.name.text;
        adapterInfo.config.properties = {};
        
        node.members.forEach((member) => {
          if (ts.isPropertySignature(member) && member.name && ts.isIdentifier(member.name)) {
            const name = member.name.text;
            const type = member.type ? content.substring(member.type.pos, member.type.end) : 'any';
            const optional = member.questionToken !== undefined;
            const jsDoc = getJSDocComment(member);
            
            adapterInfo.config.properties[name] = {
              type,
              optional,
              description: jsDoc,
            };
          }
        });
      } else if (ts.isInterfaceDeclaration(node)) {
        // Parse other interfaces
        adapterInfo.interfaces[node.name.text] = {
          properties: {},
        };
        
        node.members.forEach((member) => {
          if (ts.isPropertySignature(member) && member.name && ts.isIdentifier(member.name)) {
            const name = member.name.text;
            const type = member.type ? content.substring(member.type.pos, member.type.end) : 'any';
            const optional = member.questionToken !== undefined;
            const jsDoc = getJSDocComment(member);
            
            adapterInfo.interfaces[node.name.text].properties[name] = {
              type,
              optional,
              description: jsDoc,
            };
          }
        });
      } else if (ts.isFunctionDeclaration(node) && node.name) {
        // Parse functions
        const name = node.name.text;
        const returnType = node.type ? content.substring(node.type.pos, node.type.end) : 'any';
        const jsDoc = getJSDocComment(node);
        const parameters: any[] = [];
        
        node.parameters.forEach((param) => {
          if (param.name && ts.isIdentifier(param.name)) {
            const paramName = param.name.text;
            const paramType = param.type ? content.substring(param.type.pos, param.type.end) : 'any';
            const optional = param.questionToken !== undefined;
            
            parameters.push({
              name: paramName,
              type: paramType,
              optional,
            });
          }
        });
        
        adapterInfo.methods[name] = {
          returnType,
          parameters,
          description: jsDoc,
        };
      } else if (ts.isClassDeclaration(node) && node.name) {
        // Parse class methods
        const className = node.name.text;
        
        node.members.forEach((member) => {
          if (ts.isMethodDeclaration(member) && member.name && ts.isIdentifier(member.name)) {
            const name = member.name.text;
            const returnType = member.type ? content.substring(member.type.pos, member.type.end) : 'any';
            const jsDoc = getJSDocComment(member);
            const parameters: any[] = [];
            
            member.parameters.forEach((param) => {
              if (param.name && ts.isIdentifier(param.name)) {
                const paramName = param.name.text;
                const paramType = param.type ? content.substring(param.type.pos, param.type.end) : 'any';
                const optional = param.questionToken !== undefined;
                
                parameters.push({
                  name: paramName,
                  type: paramType,
                  optional,
                });
              }
            });
            
            adapterInfo.methods[name] = {
              className,
              returnType,
              parameters,
              description: jsDoc,
            };
          }
        });
      }
    });
  }
  
  return adapterInfo;
}

// Get JSDoc comment for a node
function getJSDocComment(node: ts.Node): string {
  const jsDocComments = (node as any).jsDoc;
  
  if (jsDocComments && jsDocComments.length > 0) {
    return jsDocComments[0].comment || '';
  }
  
  return '';
}

// Generate README.md
function generateReadme(adapterName: string, adapterInfo: any): string {
  const capitalizedName = adapterName.charAt(0).toUpperCase() + adapterName.slice(1);
  
  let readme = `# ${capitalizedName} Adapter for Grix Protocol

This adapter provides a standardized interface for interacting with the ${capitalizedName} perpetual futures protocol within the Grix Protocol ecosystem.

## Table of Contents

- [Installation](#installation)
- [Configuration](#configuration)
- [Basic Usage](#basic-usage)
- [API Reference](#api-reference)
  - [Required Methods](#required-methods)
  - [Optional Methods](#optional-methods)
  - [Extended Methods](#extended-methods)
- [Testing](#testing)

## Installation

To use this adapter, you need to install the ${capitalizedName} SDK:

\`\`\`bash
# npm
npm install ${adapterName.toLowerCase()}-sdk

# yarn
yarn add ${adapterName.toLowerCase()}-sdk

# pnpm
pnpm add ${adapterName.toLowerCase()}-sdk
\`\`\`

## Configuration

The adapter is configured with the following options:

\`\`\`typescript
interface ${capitalizedName}AdapterConfig {
`;

  // Add configuration options
  if (adapterInfo.config.properties) {
    for (const [name, prop] of Object.entries<any>(adapterInfo.config.properties)) {
      readme += `  ${name}${prop.optional ? '?' : ''}: ${prop.type}; ${prop.description ? `// ${prop.description}` : ''}\n`;
    }
  }

  readme += `}
\`\`\`

## Basic Usage

Here are some basic examples of how to use the adapter:

\`\`\`typescript
import { ${capitalizedName}Adapter } from './index';

// 1. Create a new instance of the adapter
const adapter = new ${capitalizedName}Adapter({
  network: 'mainnet', // or 'testnet'
  timeout: 15000, // optional, default is 10000
});

// 2. Use the adapter methods
async function main() {
  try {
    // 3. Get all available trading pairs
    const pairs = await adapter.getPairs();
    console.log('Available pairs:', pairs);

    // 4. Get the current price for BTC-USD
    const price = await adapter.getAssetPrice('BTC-USD');
    console.log('BTC-USD price:', price);

    // 5. Get the current funding rate for ETH-USD
    const fundingRate = await adapter.getFundingRate('ETH-USD');
    console.log('ETH-USD funding rate:', fundingRate);
  } catch (error) {
    console.error('Error:', error);
  }
}

main();
\`\`\`

## API Reference

### Required Methods

`;

  // Add required methods
  const requiredMethods = ['getPairs', 'getAssetPrice', 'getFundingRate'];
  
  for (const methodName of requiredMethods) {
    const method = adapterInfo.methods[methodName];
    
    if (method) {
      readme += `#### \`${methodName}(`;
      
      if (method.parameters) {
        readme += method.parameters
          .map((param: any) => `${param.name}${param.optional ? '?' : ''}: ${param.type}`)
          .join(', ');
      }
      
      readme += `): ${method.returnType}\`\n\n`;
      
      if (method.description) {
        readme += `${method.description}\n\n`;
      } else {
        if (methodName === 'getPairs') {
          readme += `Fetches all available trading pairs from ${capitalizedName}.\n\n`;
          readme += `**Returns:** A promise that resolves to an array of trading pair strings (e.g., \`["BTC-USD", "ETH-USD", ...]\`).\n\n`;
        } else if (methodName === 'getAssetPrice') {
          readme += `Fetches the current price for a specific trading pair.\n\n`;
          readme += `**Parameters:**\n`;
          readme += `- \`pair\`: Trading pair in the format "BASE-QUOTE" (e.g., "BTC-USD")\n\n`;
          readme += `**Returns:** A promise that resolves to the current price as a number.\n\n`;
        } else if (methodName === 'getFundingRate') {
          readme += `Fetches the current funding rate for a specific trading pair.\n\n`;
          readme += `**Parameters:**\n`;
          readme += `- \`pair\`: Trading pair in the format "BASE-QUOTE" (e.g., "BTC-USD")\n\n`;
          readme += `**Returns:** A promise that resolves to the current funding rate as a number.\n\n`;
        }
      }
    }
  }

  readme += `### Optional Methods

`;

  // Add optional methods
  const optionalMethods = ['getNetwork', 'getProtocolName'];
  
  for (const methodName of optionalMethods) {
    const method = adapterInfo.methods[methodName];
    
    if (method) {
      readme += `#### \`${methodName}(`;
      
      if (method.parameters) {
        readme += method.parameters
          .map((param: any) => `${param.name}${param.optional ? '?' : ''}: ${param.type}`)
          .join(', ');
      }
      
      readme += `): ${method.returnType}\`\n\n`;
      
      if (method.description) {
        readme += `${method.description}\n\n`;
      } else {
        if (methodName === 'getNetwork') {
          readme += `Returns the network the adapter is configured for.\n\n`;
          readme += `**Returns:** The network name ('mainnet' or 'testnet').\n\n`;
        } else if (methodName === 'getProtocolName') {
          readme += `Returns the name of the protocol.\n\n`;
          readme += `**Returns:** The protocol name ('${capitalizedName}').\n\n`;
        }
      }
    }
  }

  readme += `### Extended Methods

`;

  // Add extended methods
  const extendedMethods = [
    'getPerpetualsMetadata',
    'getHistoricalFundingRates',
    'getPredictedFundingRates',
    'getPerpsAtOpenInterestCap',
  ];
  
  for (const methodName of extendedMethods) {
    const method = adapterInfo.methods[methodName];
    
    if (method) {
      readme += `#### \`${methodName}(`;
      
      if (method.parameters) {
        readme += method.parameters
          .map((param: any) => `${param.name}${param.optional ? '?' : ''}: ${param.type}`)
          .join(', ');
      }
      
      readme += `): ${method.returnType}\`\n\n`;
      
      if (method.description) {
        readme += `${method.description}\n\n`;
      } else {
        if (methodName === 'getPerpetualsMetadata') {
          readme += `Fetches metadata about all perpetual contracts from ${capitalizedName}.\n\n`;
          readme += `**Returns:** A promise that resolves to an array of perpetual contract metadata.\n\n`;
          
          if (adapterInfo.interfaces.PerpetualMetadata) {
            readme += `\`\`\`typescript\ninterface PerpetualMetadata {\n`;
            
            for (const [name, prop] of Object.entries<any>(adapterInfo.interfaces.PerpetualMetadata.properties)) {
              readme += `  ${name}${prop.optional ? '?' : ''}: ${prop.type}; ${prop.description ? `// ${prop.description}` : ''}\n`;
            }
            
            readme += `}\n\`\`\`\n\n`;
          }
        } else if (methodName === 'getHistoricalFundingRates') {
          readme += `Fetches historical funding rates for a specific trading pair.\n\n`;
          
          if (adapterInfo.interfaces.GetHistoricalFundingRatesParams) {
            readme += `**Parameters:**\n\`\`\`typescript\ninterface GetHistoricalFundingRatesParams {\n`;
            
            for (const [name, prop] of Object.entries<any>(adapterInfo.interfaces.GetHistoricalFundingRatesParams.properties)) {
              readme += `  ${name}${prop.optional ? '?' : ''}: ${prop.type}; ${prop.description ? `// ${prop.description}` : ''}\n`;
            }
            
            readme += `}\n\`\`\`\n\n`;
          }
          
          readme += `**Returns:** A promise that resolves to an array of historical funding rate entries.\n\n`;
          
          if (adapterInfo.interfaces.FundingRateHistory) {
            readme += `\`\`\`typescript\ninterface FundingRateHistory {\n`;
            
            for (const [name, prop] of Object.entries<any>(adapterInfo.interfaces.FundingRateHistory.properties)) {
              readme += `  ${name}${prop.optional ? '?' : ''}: ${prop.type}; ${prop.description ? `// ${prop.description}` : ''}\n`;
            }
            
            readme += `}\n\`\`\`\n\n`;
          }
        } else if (methodName === 'getPredictedFundingRates') {
          readme += `Fetches predicted funding rates for different venues.\n\n`;
          readme += `**Returns:** A promise that resolves to an array of predicted funding rates by asset and venue.\n\n`;
          
          if (adapterInfo.interfaces.AssetPredictedFundingRates) {
            readme += `\`\`\`typescript\ninterface AssetPredictedFundingRates {\n`;
            
            for (const [name, prop] of Object.entries<any>(adapterInfo.interfaces.AssetPredictedFundingRates.properties)) {
              readme += `  ${name}${prop.optional ? '?' : ''}: ${prop.type}; ${prop.description ? `// ${prop.description}` : ''}\n`;
            }
            
            readme += `}\n\`\`\`\n\n`;
          }
        } else if (methodName === 'getPerpsAtOpenInterestCap') {
          readme += `Fetches a list of perpetual contracts that have reached their open interest caps.\n\n`;
          readme += `**Returns:** A promise that resolves to an array of trading pair strings that have reached their open interest caps.\n\n`;
        }
      }
    }
  }

  readme += `## Testing

To run the tests for this adapter:

\`\`\`bash
npm test -- --testPathPattern=src/perps/adapters/${adapterName.toLowerCase()}
\`\`\`
`;

  return readme;
}

// Run the main function
main().catch(console.error); 