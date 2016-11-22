"use strict"; 

var fs = require("fs");

exports.writeJson = function(arrayIdxs, originalJson) {
    // rebuild a json object matching the original format without dups 

    var outputJson = {"leads": []};

    for (var i = 0; i < arrayIdxs.length; i++) {

        var jsonRecord = originalJson["leads"][arrayIdxs[i]];

        outputJson["leads"].push(jsonRecord);
    }

    // write output to json file, need JSON.stringify because fs needs string or buffer in data param 
    fs.writeFileSync('./deduped.json', JSON.stringify(outputJson, null, 2), 'utf-8');

    return outputJson
}




