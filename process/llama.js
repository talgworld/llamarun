import ollama from 'ollama';
import fs from 'fs';

export async function run(query) {
    const message = { role: 'user', content: query };
    const response = await ollama.chat({ model: 'llama3', messages: [message], stream: true });

    let responseText = '';
    for await (const part of response) {
        process.stdout.write(part.message.content);
        responseText += part.message.content;
    }

    // Write the response to a file
    fs.writeFileSync('process/output.txt', responseText);
    console.log('\nResponse saved to output.txt');
}
