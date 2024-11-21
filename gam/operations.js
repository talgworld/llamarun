import { gamToJSON } from './gamToJson.js';

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

export { read, branch, isID };
