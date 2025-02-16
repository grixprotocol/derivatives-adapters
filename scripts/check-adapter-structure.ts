import fs from 'fs';
import path from 'path';
import { execSync } from 'child_process';

interface PullRequestFile {
    filename: string;
}

interface GitHubEvent {
    pull_request: {
        changed_files: PullRequestFile[];
    };
}

const REQUIRED_FILES = [
    'index.ts',
    'README.md',
];

const REQUIRED_METHODS = [
    'fetchExpiryDates',
    'getLongOptionPremium',
    'getShortOptionPremium',
    'listStrikePricesByExpiry',
];

function getChangedAdapters(): string[] {
    try {
        // If in PR (CI environment)
        if (process.env.GITHUB_EVENT_PATH) {
            const event = JSON.parse(fs.readFileSync(process.env.GITHUB_EVENT_PATH, 'utf8')) as GitHubEvent;
            const changedFiles = event.pull_request.changed_files
                .map((file) => file.filename)
                .filter((file: string) => file.startsWith('src/adapters/'));
            
            // Get unique adapter directories
            return [...new Set(changedFiles.map((file: string) => {
                const match = file.match(/src\/adapters\/([^\/]+)/);
                return match ? match[1] : null;
            }).filter((name): name is string => name !== null))];
        } 
        // If local development
        else {
            const gitDiff = execSync('git diff --name-only HEAD').toString();
            const changedFiles = gitDiff.split('\n')
                .filter(file => file.startsWith('src/adapters/'));
            
            return [...new Set(changedFiles.map(file => {
                const match = file.match(/src\/adapters\/([^\/]+)/);
                return match ? match[1] : null;
            }).filter((name): name is string => name !== null))];
        }
    } catch (error) {
        console.error('Error getting changed files:', error);
        // If we can't determine changed files, check all adapters
        return fs.readdirSync(path.join(__dirname, '../src/adapters'))
            .filter(file => fs.statSync(path.join(__dirname, '../src/adapters', file)).isDirectory());
    }
}

function validateAdapter(adapterName: string): boolean {
    const adapterPath = path.join(__dirname, '../src/adapters', adapterName);
    
    // Check if adapter directory exists
    if (!fs.existsSync(adapterPath)) {
        console.error(`Adapter directory not found: ${adapterPath}`);
        return false;
    }

    // Check for required files
    for (const file of REQUIRED_FILES) {
        if (!fs.existsSync(path.join(adapterPath, file))) {
            console.error(`Missing required file: ${file} in ${adapterName}`);
            return false;
        }
    }

    // Check adapter structure
    try {
        const adapter = require(path.join(adapterPath, 'index.ts')).default;
        
        // Verify all required methods exist
        for (const method of REQUIRED_METHODS) {
            if (typeof adapter[method] !== 'function') {
                console.error(`Missing required method: ${method} in ${adapterName}`);
                return false;
            }
        }

        // Verify test parameters exist
        if (!adapter.testParams) {
            console.error(`Missing testParams in ${adapterName}`);
            return false;
        }

        console.log(`✓ Adapter ${adapterName} passed structure validation`);
        return true;
    } catch (error) {
        console.error(`Error validating adapter ${adapterName}:`, error);
        return false;
    }
}

// Get and validate changed adapters
const changedAdapters = getChangedAdapters();
console.log('Checking adapters:', changedAdapters);

let allValid = true;
for (const adapter of changedAdapters) {
    if (!validateAdapter(adapter)) {
        allValid = false;
    }
}

// Exit with appropriate code
process.exit(allValid ? 0 : 1); 