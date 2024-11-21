import fs from 'fs';
import path from 'path';
import { gamToJSON } from './gamToJson.js';
// import { toID } from './converters.js';

// // Function to separate an ID
// function separate(id, key) {
//     let separatedArray = [];
    
//     let pattern = /[a-zA-Z]+|\d+/g;
    
//     id.match(pattern).forEach(function(item) {
//         if (!isNaN(item)) {
//             separatedArray.push(parseInt(item)); 
//         } else {
//             separatedArray.push(item);
//         }
//     });
//     let result;
//     !key || key == 0 ? result = separatedArray : result = separatedArray[key - 1];
//     return result;
// }

// // Function to combine multiple arguments into a string
// function combine(...args) {
//     let combinedString = "";

//     args.forEach(arg => {
//         if (Array.isArray(arg)) {
//             combinedString += arg.join('');
//         } else {
//             combinedString += arg;
//         }
//     });

//     return combinedString;
// }

// // Function to convert text to a number
// function toNum(text) {
//     const alphabet = 'abcdefghijklmnopqrstuvwxyz';
//     const count = 26;
    
//     let result = 0;
    
//     for (let i = 0; i < text.length; i++) {
//         let char = text[i].toLowerCase();
//         let position = alphabet.indexOf(char) + 1;
//         result = result * count + position;
//     }
    
//     return result;
// }

// // Function to convert a number to characters
// function toChar(number) {
//     const alphabet = 'abcdefghijklmnopqrstuvwxyz';
//     const count = 26;
    
//     let result = "";
    
//     while (number > 0) {
//         let position = (number - 1) % count;
//         result = alphabet[position] + result;
//         number = Math.floor((number - 1) / count);
//     }
    
//     return result;
// }

// Reads data and returns lines based on IDs
let read = (data, ids) => {
    let getID = gamToJSON(data);

    if (ids) {
        if (Array.isArray(ids)) {
            return ids.map(id => read(data, id));
        } else {
            return getID[ids]?.trim() || '';
        }
    } else {
        return getID;
    }
}

// // Function to calculate based on given IDs and operation
// let calc = (id, id1, level, level1, operation, outputType) => {
//     let idSeparated = separate(id, level);
//     let id1Separated = separate(id1, level1);
//     let idType = typeof idSeparated;
//     let id1Type = typeof id1Separated;
//     let idNum = 0;
//     let id1Num = 0;
//     let result = 0;
//     if (idType === 'string' && isNaN(idSeparated)) {
//         idNum = toNum(idSeparated);
//     } else {
//         idNum = Number(idSeparated);
//     }
//     if (id1Type === 'string' && isNaN(id1Separated)) {
//         id1Num = toNum(id1Separated);
//     } else {
//         id1Num = Number(id1Separated);
//     }
//     switch (operation) {
//         case 1:
//             result = idNum + id1Num;
//             break;
//         case 2:
//             result = idNum - id1Num;
//             break;
//         case 3:
//             result = idNum * id1Num;
//             break;
//         case 4:
//             result = idNum / id1Num;
//             break;
//         case 5:
//             result = idNum % id1Num;
//             break;
//         case 6:
//             result = idNum ** id1Num;
//             break;
//         case 7:
//             result = idNum == id1Num;
//             break;
//         case 8:
//             result = idNum != id1Num;
//             break;
//         case 9:
//             result = idNum < id1Num;
//             break;
//         case 10:
//             result = idNum > id1Num;
//             break;
//         case 11:
//             result = idNum <= id1Num;
//             break;
//         case 12:
//             result = idNum >= id1Num;
//             break;
//     }
//     if (outputType == 0) {
//         result = toChar(result);
//     }
//     return result;
// }

// // Function to replace data at a specific ID
// let replace = (data, ID, newData) => {
//     let jsonData = read(data);
//     let spaceCount = ' '.repeat(ID.length - 1);
//     jsonData[ID] = spaceCount + newData;
//     let gd = Object.values(jsonData).join('\n');    
//     return gd;
// }

// // Function to get branches based on IDs
// let branches = (data, ...ids) => {
//     let jsonData = read(data);
//     let result = [];
    
//     if (ids.length === 1 && !Array.isArray(ids[0])) {
//         ids = [ids]; 
//     }

//     for (let key in jsonData) {
//         if (ids.some(id => key.startsWith(id)) && key.length > ids[0].length) {
//             result.push(key);
//         }
//     }
//     return result;
// }

// Function to get a single branch based on IDs
let branch = (data, ...ids) => {
    data = read(data);
    let keys = Object.keys(data);
    let filteredKeys = keys.filter(key => {
        if (Array.isArray(ids)) {
            return ids.some(id => key.startsWith(id)) && key.length === ids[0].length + 1;
        } else {
            return key.startsWith(ids) && key.length === ids.length + 1;
        }
    });
    return filteredKeys;
}

// // Function to add data after a specific ID
// let after = (data, ID, addData) => {
//     let jsonData = read(data);
//     let spaceCount = ' '.repeat(ID.length - 1);
//     let newData = {};
//     for (let key in jsonData) {
//         if (key == ID) {
//             newData[key] = jsonData[key];
//             let dataWithSpace = spaceCount + addData;
//             newData = { ...newData, dataWithSpace };
//         } else {
//             newData[key] = jsonData[key];
//         }
//     }
//     let gd = Object.values(newData).join('\n');    
//     return gd;
// }

// // Function to add data before a specific ID
// let first = (data, ID, appendData) => {
//     let jsonData = read(data);
//     let spaceCount = ' '.repeat(ID.length);
//     let newData = {};
//     for (let key in jsonData) {
//         if (key == ID) {
//             newData[key] = jsonData[key];
//             let dataWithSpace = spaceCount + appendData;
//             newData = { ...newData, dataWithSpace };
//         } else {
//             newData[key] = jsonData[key];
//         }
//     }
//     let gd = Object.values(newData).join('\n');    
//     return gd;
// }

// // Function to add data to the end of a branch
// let last = (data, ID, appendData) => {
//     let lastItemTree = branches(data, ID).pop();
//     let jsonData = read(data);
//     let spaceCount = ' '.repeat(ID.length);
//     let newData = {};
//     for (let key in jsonData) {
//         if (key == lastItemTree) {
//             newData[key] = jsonData[key];
//             let dataWithSpace = spaceCount + appendData;
//             newData = { ...newData, dataWithSpace };
//         } else {
//             newData[key] = jsonData[key];
//         }
//     }
//     let gd = Object.values(newData).join('\n');    
//     return gd;
// }

// // Function to get the holder of an ID
// let holder = (id) => {
//     let parentIDList = [];
//     let separated = separate(id);
//     for (let key = 0; key < separated.length - 1; key++) {
//         parentIDList = [...parentIDList, separated[key]]; 
//     }
//     let parentID = combine(parentIDList); 
//     return parentID;
// }

// // Function to generate a random ID
// let rand = (min, max, type, length) => {
//     let idUnit = () => {
//         let value = Math.floor(Math.random() * (max - min + 1)) + min;
//         if (type === 0) {
//             return value;
//         } else if (type === 1) {
//             return toChar(value);
//         }
//     };

//     let id = [];
//     for (let l = 0; l < length; l++) {
//         type = type === 0 ? 1 : 0;
//         let idUnitVal = idUnit();
//         id = [...id, idUnitVal];
//     }
//     return combine(id);
// };

// // Function to remove specific IDs from data
// let remove = (data, ...IDs) => {
//     let jsonData = read(data);
//     let keys = Object.keys(jsonData);
//     let newData = {};
    
//     keys.forEach(key => {
//         if (!IDs.includes(key)) {
//             newData[key] = jsonData[key];
//         }
//     });
    
//     let gd = Object.values(newData).join('\n');
//     return gd;
// }

// // Function to extract lines or specific parts of lines
// let line = (data, ID) => {
//     let jsonData = read(data);
//     let lineDataID; 
//     let lineID; 
//     let stopId; 
//     let startID; 
//     let subLines = [];
//     let totalLine = Object.keys(jsonData).length;
//     if (Array.isArray(ID)) {
//         if (ID.length === 2) {
//             [startID, stopId] = ID;
//             for (let i = startID; i <= stopId; i++) {
//                 if (i <= totalLine) {
//                     lineDataID = Object.keys(jsonData)[i];
//                     subLines.push(jsonData[lineDataID].trim());
//                 }
//             }
//             return subLines;
//         } else if (ID.length === 1) {
//             lineID = ID[0];
//             return jsonData[lineID]?.trim() || '';
//         }
//     } else {
//         return jsonData[ID]?.trim() || '';
//     }
// }


let isID = (data, id) => { //is id is in gam file
    if(Array.isArray(id)){
        let checkIDs=[]
        for(i=0;i<id.length;i++){
            checkIDs.push(read(data, id[i]).length > 0)
        }
        return checkIDs
    }
    let checkIDs
    checkIDs = read(data, id).length>0
    return checkIDs
}
// let dd = 'qew'; console.log(isID(dd, 'a'))

// function search(data, ...targetWords) { //search for word in any line of data
//     let keys = [];
//     data = read(data);
    
//     for (let key in data) {
//         let value = data[key];
//         if (Array.isArray(targetWords[0])) {
//             if (targetWords[0].some(targetWord => new RegExp("^(?:" + targetWord + ")$| (?:" + targetWord + ")$|^(?:" + targetWord + ") | (?:" + targetWord + ") ").test(value))) {
//                 keys.push(key);
//             }
//         } else {
//             if (targetWords.some(targetWord => new RegExp("^(?:" + targetWord + ")$| (?:" + targetWord + ")$|^(?:" + targetWord + ") | (?:" + targetWord + ") ").test(value))) {
//                 keys.push(key);
//             }
//         }
//     }
    
//     return keys;
// }

// //  let getID = search(data, ['c54g216fhn', 'h1a1:m210kl3456--21']); 
// //  console.log(getID);

// let clear = (data)=>{// Remove empty lines
//     const modifiedContent = data.replace(/^\s*[\r\n]/gm, '\n');
//     return modifiedContent
// }

// // let bbb = clear(data); console.log(bbb)



//export { separate, combine, toNum, toChar, read, calc, replace, branches, branch, after, first, last, holder, rand, remove, line, clear, search, isID };

export { read, branch, isID };
