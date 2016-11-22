"use strict";

var expect    = require("chai").expect;
var unorderHelpers = require("../app/unorderHelpers");

var myJsonObj = require('../json_files/leads.json');
var unorderedJsonObj = require('../json_files/unorderTest.json');

describe("unorderHelpers.mapIdxToKeys function", function(){
    // define variables that can be used across tests
    var funcOut = unorderHelpers.mapIdxToKeys(myJsonObj);
    
    it("should return two objects", function() {
        expect(funcOut.length).to.equal(2);
    });

    it("objects returned should be same length as each other and input", function(){
        var lengthA = Object.keys(funcOut[0]).length;
        var lengthB = Object.keys(funcOut[1]).length;
        expect(lengthA).to.equal(lengthB);
        expect(lengthA).to.equal(myJsonObj.leads.length);
    });

    it("should index objects correctly", function(){
        var fifthObjFunc = funcOut[0][5];
        var fifthObjOrg = myJsonObj.leads[5];
        expect(fifthObjOrg).to.equal(fifthObjFunc);
    });
});

describe("unorderHelpers.idxDateSort function", function(){
    var mapIdxToKeysOutput = unorderHelpers.mapIdxToKeys(myJsonObj);

    // grab the second element from output of mapIdxToKeys func and feed it to idxDateSort
    var funcOut = unorderHelpers.idxDateSort(mapIdxToKeysOutput[1]);

    it("should return value array in map in desceding order", function(){
        // creates iterator object of values in map 
        var valuesInOrder = funcOut.values();

        var firstSet = valuesInOrder.next().value;
        expect(firstSet).to.deep.equal([ 9, 8, 7, 6 ]);

        var secondSet = valuesInOrder.next().value;
        expect(secondSet).to.deep.equal([ 5, 4, 3]);

    });
    it("should return keys in map in descending order", function(){
        // iterator object of keys in map 
        var keysInOrder = funcOut.keys();

        var firstKey = keysInOrder.next().value;
        var secondKey = keysInOrder.next().value;
        var thirdKey = keysInOrder.next().value;

        expect(firstKey > secondKey).to.equal(true);
        expect(secondKey > thirdKey).to.equal(true);    
    });
});

describe("unorderHelpers.idxDateSort function with unordered input", function(){
    var mapIdxToKeysOutput = unorderHelpers.mapIdxToKeys(unorderedJsonObj);

    // grab the second element from output of mapIdxToKeys func and feed it to idxDateSort
    var funcOut = unorderHelpers.idxDateSort(mapIdxToKeysOutput[1]);

    it("should still return ordered keys with unordered json input", function(){
        var keysInOrder = funcOut.keys();

        var firstKey = keysInOrder.next().value;
        var secondKey = keysInOrder.next().value;
        var thirdKey = keysInOrder.next().value;

        expect(firstKey > secondKey).to.equal(true);
        expect(secondKey > thirdKey).to.equal(true);
    });

    it("value array should have object indexs in descending order grouped by shared dates", function(){
        // creates iterator object of values in map 
        var valuesInOrder = funcOut.values();

        var firstSet = valuesInOrder.next().value;
        expect(firstSet).to.deep.equal([ 5, 4, 3, 2]);

        var secondSet = valuesInOrder.next().value;
        expect(secondSet).to.deep.equal([ 9, 1, 0]);
    });
});

describe("unorderHelpers.dedupedArray function", function(){
    // mapIdxToKeysOutput[0] = mapped object where index of each item in json is the key and orginal object is value  
    // mapIdxToKeysOutput[1] = object where, key: value === datetime: object index
    var mapIdxToKeysOutput = unorderHelpers.mapIdxToKeys(myJsonObj);

    // need to pass values recived from previous function down to line to get input for dedupedArray
    var idxDateSortOutput = unorderHelpers.idxDateSort(mapIdxToKeysOutput[1]);

    var funcOut = unorderHelpers.dedupedArray(idxDateSortOutput, mapIdxToKeysOutput[0]);

    it("should return an array of indexes", function(){
        expect(funcOut[0]).to.deep.equal([ 2, 6, 7, 8, 9 ]);
    });
});








