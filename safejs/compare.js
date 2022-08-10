"use strict";

// Takes two files, and compares there content.
// Files must be a byte by byte match 
// Indiciates match via exit code:
    // 1 : No Match
    // 0 : Exact Match

const fs = require('fs');

const [b1, b2] = process.argv.slice(2).map(f => fs.readFileSync(f));

if (b1.length - b2.length) process.exit(1);

b1.forEach((v, i) => {
    if(b2.at(i) != v) process.exit(1)
});

process.exit(0);