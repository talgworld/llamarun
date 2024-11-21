***llamarun:*** is a tool that runs llama - phi models easily using prompt text and attached files to generate output and save to specified files 

### How to use llamarun:
- Use `./data/prompts.gam` to add prompts, input and output files
- Make sure `.gam` text spaces are correct in start of each line, like example in `./data/prompts.gam`
- Each prompt should be in one line and have `input` - `output` file. It could be no input file but it should to have output file.
- Add input files in `./input`, output files will be in `./output` 
- After adding `prompts.gam` info run `node main.js` code to generate outputs needed