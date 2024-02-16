import fs from "fs";

function readFile(filePath, encoding) {
    try {
        return fs.readFileSync(filePath, encoding);
    } catch (error) {
        console.error(`Error reading from ${filePath}: ${error.message}`);
        process.exit(1);
    }
}

export { readFile };