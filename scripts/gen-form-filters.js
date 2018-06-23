// Generate a regexp for google form to filter already stored sites
var sites = require("../chrome/sites.js");

var sites = sites.reduce(function(acc, item) {
    if (!item.match(/\\\/\\*/)) {
        acc.push(item);
    }    
    return acc;
}, []);


console.log(sites.join("|"));