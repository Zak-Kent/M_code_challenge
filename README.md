#Marketo Code Challenge

###**Challenge Description** 

Take a variable number of identically structured JSON records and deduplicate the set using the following rules:
- data from the newest date should be preferred
- duplicate IDs count as dups. Duplicate emails count as dups. Both must be unique in dataset
- if the dates are identical the data from the record provided last in the list should be preferred

###**Solution Description**

####***chronologically ordered solution***
The initial solution I came up with uses the fact that the sample records in the leads.json file provided are in 
chronological order by the `entryDate` property of each record. Iterating through the records array in reverse order 
provides a way to meet the requirements outlined in the challenge by giving the correct preference to the newest data
and to entries that were entered last in the array when dates match. 

####***unordered solution***
The solution provided above breaks  when the records are not ordered chronologically due to the need to consider
records in a specific order giving preference as defined in the rules of the challenge. In order to account for this 
possible edge case, I've included a solution in the project that uses a different approach for unordered data. This is 
the reason why I initially check to see if the input data is in chronological order and make a decision on which method 
to use afterwards.

###**Commands**
- `npm run dedup` -- runs the deduplication solution on the default 'leads.json' input

- `npm run dedup ./someJsonFile.json` -- optional file path argument can be passed in to run solution 
on a different JSON object. Path to file should be relative to the index.js file location 

- `npm test` -- runs a simple suite of tests used during the development of this solution

###**Logging**
- array of indexes where records were dups, array of non-dup indexes, and final output are logged to the console and to a 
programOutput.log file in the same directory as index.js

- the deduplicated JSON object is written to the deduped.json file

###**Dependencies**
- The solution was built using recent versions of `node.js` and `npm` 

