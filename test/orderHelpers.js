"use strict";

var expect    = require("chai").expect;
var orderHelpers = require("../app/orderHelpers");

var myJSONObj = require('../json_files/leads.json');
var unorderedJsonObj = require('../json_files/unorderTest.json');

describe("orderHelpers.orderedSolution function", function() {
    var funcOut = orderHelpers.orderedSolution(myJSONObj);
    

    it("should return an array of index values in correct order", function() {
        expect(funcOut[0]).to.deep.equal([ 2, 6, 7, 8, 9 ]);
    });
});

describe("orderHelpers.checkOrderOfDates function", function() {
    var funcOutOrdered = orderHelpers.checkOrderOfDates(myJSONObj);
    var funcOutUnOrdered = orderHelpers.checkOrderOfDates(unorderedJsonObj);

    it("should return true when json object has ordered dates", function() {
        expect(funcOutOrdered).to.equal(true);
    });

    it("should return false when json object does not have array ordered by date", function() {
        expect(funcOutUnOrdered).to.equal(false);
    });
});