"use strict";

/* helper funcs used to check for order in JSON input 
and to solve input if ordered by entryDate property in JSON */

exports.checkOrderOfDates = function (jsonObj) {
    // return true if objects in JSON input are in chronological order by entryDate property
    
    var jsonArray = jsonObj.leads;

    for (var i = 0; i < jsonArray.length; i++) {
        // if you hit last element and haven't failed yet order is good 
        if (i === jsonArray.length - 1) {
            return true
        } else if (Date.parse(jsonArray[i]["entryDate"]) > Date.parse(jsonArray[i + 1]["entryDate"])) {
            return false
        }
    }
};

exports.orderedSolution = function (jsonObj, winston) {
    /* step backwards through array, if _id or email not yet in dupArray, 
    store record's idx in finalArray, and keep track of new _id & email in dupArray,
    return finalArray when done */

    // need to use slice to make sure you're not modifying original array in func 
    var jsonCopy = jsonObj.leads.slice();

    // reverse order of the jsonObj array 
    var reverseArray = jsonCopy.reverse()
    var origIdxNum = reverseArray.length - 1;

    var finalArray = [];
    var dupIdxs = [];
    var dupArray = [];

    for (var i = 0; i < reverseArray.length; i++) {

        var _id = reverseArray[i]["_id"];
        var email = reverseArray[i]["email"]; 

        // if _id or email is already in an object being kept move on  
        if (dupArray.indexOf(_id) >= 0 || dupArray.indexOf(email) >= 0) {
            dupIdxs.push(origIdxNum - i);
        } else {
            Array.prototype.push.apply(dupArray, [_id, email]);
            finalArray.push(origIdxNum - i);
        }
    }

    return [finalArray.reverse(), dupIdxs.reverse()]
};
 