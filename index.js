#!/usr/bin/env node
"use strict";

// require helper funcs with logic located in app dir 
var orderHelpers = require('./app/orderHelpers');
var unorderHelpers = require('./app/unorderHelpers');
var writeHelpers = require('./app/writeHelpers');

// setup for winston logger 
var winstonSetup = require('./app/winstonSetup');
var winston = winstonSetup.winstonSetup();

var solutionLogic = function() {
    // grab the command line arg to a json file, if none default to original json 
    var jsonFile = process.argv[2] || './json_files/leads.json';

    // grab json object so you can access it, if filePath provided fails notify user 
    try {
        var myJsonObj = require(jsonFile);    
    }
    catch (err) {
        console.log("file path entered was invalid");
    }

    // check to see if data in json is ordered by date, needed to decide which solution to use
    var isJsonOrdered = orderHelpers.checkOrderOfDates(myJsonObj);
 
    if (isJsonOrdered) {
        var finalIdxArray = orderHelpers.orderedSolution(myJsonObj);

    // if json input found to be un-ordered by entryDate use more complicated solution 
    } else {
        // func returns object with idxs mapped as keys to OG objects + other object with idx mapped to datetime 
        var mapIdxToKeysOutput = unorderHelpers.mapIdxToKeys(myJsonObj); 

        // returns search order object with {datetime key: array of ordered idxs that share date}
        var idxDateSortOutput = unorderHelpers.idxDateSort(mapIdxToKeysOutput[1]);

        // pass in the original object idxMapObj and output from dateSort func above to final dedupe check 
        var finalIdxArray = unorderHelpers.dedupedArray(idxDateSortOutput, mapIdxToKeysOutput[0]);
    }

    // finalIdxArray has an array of [[nonDupIdxs], [dupIdxs]] as returned value 

    // create final JSON object and write to './finalOutput.json'
    var finalJson = writeHelpers.writeJson(finalIdxArray[0], myJsonObj);


    // log array's of indexes dups vs. nondups and final output JSON 
    winston.log('info', "indexes of records found to be duplicates", 
                { DuplicateIdxArray: finalIdxArray[1] });

    winston.log('info', "indexes of records from 'leads' array that are not duplicates", 
                { nonDuplicateIdxArray: finalIdxArray[0] });

    winston.log('info', "Final JSON object ouput without duplicates",
                { finalJsonObj: finalJson });

};

solutionLogic();
