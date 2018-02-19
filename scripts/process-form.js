var parse = require('csv-parse/lib/sync');
var fs = require("fs");
var unquote = require('unquote');
var url = require("url");
var _ = require("underscore");

if (process.argv.length !== 3) {
    console.log("node process-form input.csv");
    return;
}

var content = fs.readFileSync(process.argv[2]);
var csv = parse(content,({delimiter: ","}));

var result = csv.filter((value) => {
    return value[5] === "ACCEPT";
}).map((obj) => {
    var u = url.parse(obj[1], true);
    var hostname = u.hostname;

    if (hostname === null) {
        hostname = obj[1];
    }

    hostname = hostname.toLowerCase();

    if (hostname.indexOf("www.") === 0) {
        hostname = hostname.substring(4,hostname.length);
    }

    return hostname;
}).sort();

result = _.unique(result);

console.log(JSON.stringify(result, null, 4));