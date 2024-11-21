import path from 'path';
import { exec as execPromise } from 'child_process';
import fs from 'fs/promises';
import * as gam from './gam/operations.js';
import * as llama from './process/llama.js';
import * as phi from './process/phi.js';

// choose model "phi" or "llama"
let model = phi;

// Function to execute a command and return a promise
let execCommand = (command) => {
    return new Promise((resolve, reject) => {
        execPromise(command, (error, stdout, stderr) => {
            if (error) {
                reject(`Error: ${error.message}`);
            } else if (stderr && stderr.trim()) {
                console.warn(`Stderr: ${stderr}`);
                resolve(stdout);
            } else {
                resolve(stdout);
            }
        });
    });
};

// Async function to process prompts
let processPrompts = async () => {
    try {
        let data = await fs.readFile('data/prompts.gam', 'utf8'); // Read file asynchronously
        let prompts = gam.branch(data, 'a');
        console.log("Loading Data..")
        
        //execCommand('start cmd /c "node process\\monitor_res.js"');

        for (let index = 0; index < prompts.length; index++) {
            let id = prompts[index];
            let prompt = gam.read(data, id);

            try {
                // Check if output - input file names is in prompt.gam
                let checkOutFilename = gam.isID(data, 'c' + (index + 1));
                let checkInFilename = gam.isID(data, 'b' + (index + 1));

                if (checkOutFilename === false) { // If no output file name in prompt.gam
                    console.warn("Check prompt.gam: there is no output filename in Loc 'c'");
                    continue; // Skip to the next prompt
                }

                if (checkInFilename === true) { // If there is input filename, add its data to prompt
                    let inFile = gam.read(data, 'b' + (index + 1)); // Get filename input from prompt.gam
                    prompt += await fs.readFile(path.resolve('input', inFile), 'utf8'); // Add input file data to prompt
                }

                let outFile = gam.read(data, 'c' + (index + 1)); // Reads output branch in prompt.gam file
                
                // Command to read prompt and run AI model to generate response
                await execCommand(`echo. > ${path.join('process', 'prompt.txt')}`); // Empty prompt.txt
                await fs.writeFile(path.join('process', 'prompt.txt'), prompt); // Add prompt to prompt.txt
                
                // console.log("Started model " + modelTypeArg + ". Waiting for incoming data..");
                await model.run(prompt); // Replace with actual call if needed

                // Wait for the AI model to complete
                console.log('Reading output file..');
                let output = await fs.readFile(path.join('process', 'output.txt'), 'utf8'); // Read AI output
                await fs.writeFile(path.resolve('output', outFile), output); // Write output to new file
                console.log('File written successfully');
            } catch (error) {
                console.error(`Error processing prompt ${id}: ${error} -- make sure Ollama app is running`);
            }
        }
    } catch (error) {
        console.error(`Error reading prompts file: ${error}`);
    }
};

// Call the async function
processPrompts();
