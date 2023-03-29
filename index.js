import * as fs from 'fs';
import * as path from 'path';
import * as csv from 'fast-csv';

// read and validate command line args
let filePath = process.argv[2];

if (undefined === filePath) {
    throw Error("You must provide a file path to the csv file");
}

let searchColumnIdx = process.argv[3];

if (undefined === searchColumnIdx) {
    throw Error("Error: You must provide a column index for search");
}

let searchTerm = process.argv[4];

if (undefined === searchTerm) {
    throw Error("Error: You must provide a string to search");
}

const results = [];

fs.createReadStream(path.resolve(filePath))
    .pipe(csv.parse({headers: false}))
    .on('error', error => console.error(error))
    .on("data", row => {
        if (undefined !== row[searchColumnIdx] && row[searchColumnIdx].search(searchTerm) !== -1) {
            results.push(row);
        }
    })
    .on('end', rowCount => {
        // Uncomment following two lines for a more verbose output
        //console.log(`Parsed ${rowCount} rows`);
        //console.log(`Found ${results.length} results`);

        if (results.length > 0) {
            results.forEach(result => {
                console.log(result.join(','));
            });
        }
    });


