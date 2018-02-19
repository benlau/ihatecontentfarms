"use strict";
const dns = require('dns');
const sites = require("../chrome/sites.js");

const query = (domain) => {
    return new Promise((resolve, reject) => {
        dns.lookup(domain, (err, address, family) => {
            resolve({address:address, family: family});
        });
    });
}

async function run () {
    var unreachable = [];
    for (var i in sites) {
        var site = sites[i];

        if (site.match(/\*$/)) {
            console.log("Skipped: ", site);
            continue;
        }

        const r = await query(site);
        if (r.address === undefined) {
            console.log("Failed to query", site);
            unreachable.push(site);
        }
    }

    console.log("Total No. of sites", sites.length);
    console.log("Total No. of unreachable sites", unreachable.length);
}

run();