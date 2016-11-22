"use strict";

/* helper functions used to solve problem if records in "leads" JSON array 
are not in chronological order by entryDate */

exports.mapIdxToKeys = function (jsonObj) {
    /* take json obj and map index of each record in array to key in new object,
    create another object with index key and parsed entryDate value  
    returns [ idxMapObj = {idx key: original record}, 
              dateObj = {idx key: parsed date time value} ] */

    var idxMapObj = {};
    var dateObj = {};

    for (var i = 0; i < jsonObj.leads.length; i++) {
        // use the idx of each record in input JSON as a key and original object as value  
        var item = jsonObj.leads[i];
        idxMapObj[i] = item;

        // make a separate obj with idx key: parsed date time value 
        dateObj[i] = Date.parse(item["entryDate"]);
    };

    var combinedOutput = [idxMapObj, dateObj];

    return combinedOutput
};

exports.idxDateSort = function (dateObj) {
    /* take an object with {idx:date pairs}, return an object with {date:array or idx values} 
    ex. output = Map({'1399484000000': [ 9, 8, 7, 6 ],
                      '139948399000': [5, 4, 3] }) 
    key = datetime, value = array of sorted idxs that share the same datetime */   

    // sort keys in input object in recent to oldest order
    var keysSorted = Object.keys(dateObj).sort(function(a, b){return dateObj[b] - dateObj[a]});

    // using Map() to guarantee insertion order stays the same during lookup 
    var sortDateMap = new Map();    

    for (var idx in keysSorted) {

        var idxKey = parseInt(keysSorted[idx]); 
        var dateValue = dateObj[idxKey];

        // if the date value is already present in map add new idx to its value array 
        if (sortDateMap.has(dateValue)) {
            
            var idxArray = sortDateMap.get(dateValue);
            idxArray.push(idxKey);

            // making sure idx is inserted in array in correct order 
            idxArray.sort(function(a, b){
                return b - a
            });

            // update key:value pair in Map object with new array
            sortDateMap.set(dateValue, idxArray);

        // if date value not in sortDateMap, add new property 
        } else {
            sortDateMap.set(dateValue, [idxKey]); 
        }
    };

    return sortDateMap;
};

exports.dedupedArray = function (sortedIdxMap, idxObj) {
    /* use output from funcs idxDateSort and mapIdxToKeys[0] as args,
    loop through each date and idx value array from the idxDateSort Map,
    sort out dups by using dupArray index check, keep records only if they're not a dup */   

    var dupIdxs = [];
    var dupArray = [];
    var finalArray = [];

    for (var [key, valueArray] of sortedIdxMap.entries()) {
        for (var idx in valueArray) {
            // idx represents the index of each record in the original that maps to a specific datetime  
            var itemIdx = valueArray[idx];

            var _id = idxObj[itemIdx]._id;
            var email = idxObj[itemIdx].email;

            // if _id or email is a dup move on   
            if (dupArray.indexOf(_id) >= 0 || dupArray.indexOf(email) >= 0) {
                dupIdxs.push(itemIdx);
                
            } else {
                // if record not a dup push idx of record into finalArray, & keep track of _id, email  
                Array.prototype.push.apply(dupArray, [_id, email]);
                finalArray.push(itemIdx);
            }
        }
    }
    // reverse final array to match the output of ordered output 
    return [finalArray.reverse(), dupIdxs.reverse()]
};



