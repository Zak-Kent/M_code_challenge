"use strict";

var expect    = require("chai").expect;
var writeHelpers = require("../app/writeHelpers");

var finalOutput = require('../json_files/finalOutTest.json');
var myJSONObj = require('../json_files/leads.json');

var sampleArray = [ 2, 6, 7, 8, 9 ];

describe("writeHelpers.writeJson function", function() {
    var funcOut = writeHelpers.writeJson(sampleArray, myJSONObj);

    it("writeHelper func should create correct json output", function() {
        expect(funcOut).to.deep.equal(finalOutput);
    });
});