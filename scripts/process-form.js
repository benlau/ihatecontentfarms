var parse = require('csv-parse/lib/sync');
var fs = require("fs");
var unquote = require('unquote');
var url = require("url");

if (process.argv.length !== 3) {
    console.log("node process-form input.csv");
    return;
}

var content = fs.readFileSync(process.argv[2]);
var csv = parse(content,({delimiter: ","}));

csv = csv.filter((value) => {
    return value[5] === "ACCEPT";
}).map((obj) => {
    var u = url.parse(obj[1], true);
    var hostname = u.hostname;

    if (hostname === null) {
        hostname = obj[1];
    }

    hostname = hostname.toLowerCase();

    return hostname;
}).sort();

console.log(JSON.stringify(csv, null, 4));