import fs from 'fs';
import path from 'path';

// Function to convert GAM format to JSON
const gamToJSON = (data) => {
    let dataLines = data.split('\n').map(line => line.endsWith('\r') ? line.slice(0, -1) : line);

    let spaces = [];
    dataLines.forEach(line => { // Record spaces of each line
        let space = 0;
        for (let s = 0; s < line.length; s++) {
            if (line[s] == ' ') {
                space++;
            } else {
                return spaces.push(space);
            }
        }
    });

    // Calculate levels
    let levels = spaces.reduce((acc, value) => Math.max(acc, value), 0) + 1;

    let list = [];
    for (let l = 0; l < levels; l++) {
        list.push(0);
    } // Make new empty levels list [0, 0, 0, 0]

    let bigList = [];
    let Path = 0;
    spaces.forEach((space, i) => {  // Generate number ID lists
        if (Path > 1) {
            throw new Error(`Path error: space value > 1, line ${Number(i + 1)}\n file: ${file}`);
        } else if (Path < 0) {
            for (let p = 1; p <= Math.abs(Path); p++) { // Convert -path to +path
                let m = p + space;
                list[m] = 0;
            }
            list[space] += 1; // It should be here to work successfully
        } else {
            list[space] += 1;
        }

        Path = spaces[i + 1] - space;
        bigList.push(list.slice());
    });

    let id = [];
    const convertNumToWords = (val) => {
        id = [];
        const alphabet = 'abcdefghijklmnopqrstuvwxyz';
        while (val > 0) {
            id.push(alphabet[(val - 1) % 26]);
            val = Math.floor((val - 1) / 26);
        }
        id.reverse();
        return id.join("");
    };

    let bigl = [];
    bigList.forEach(bl => {  // Convert to GAM-ID format
        bl.forEach((l, i) => {
            if (i % 2 === 0) {
                bl[i] = convertNumToWords(l);
            }
            if (i % 2 === 1) {
                bl[i] === 0 ? bl[i] = '' : '';
            }
        });
        bigl.push(bl.join(""));
    });

    let jl = {}; // Convert to JSON
    dataLines.forEach((d, i) => {
        let lID = bigl[i];
        jl[lID] = d;
    });

    return jl;
};

export { gamToJSON };
