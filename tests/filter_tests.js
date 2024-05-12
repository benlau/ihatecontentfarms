
import assert from "assert";
import {Filter} from "../chrome/cfblocker/Filter.js";
import {sites} from "../chrome/sites.js";

describe("Filter", () => {

    it("match", () => {
        var filter = new Filter();
        filter.appendBlacklist(["contentfarm.com"]);

        assert(filter.match("contentfarm.com"));
        assert(filter.match("www.contentfarm.com"));
        assert(filter.match("www2.en.contentfarm.com"));
        assert(filter.match("www-2.en.contentfarm.com"));
        assert(!filter.match("xcontentfarm.com"));
        assert(!filter.match("facebook.com"));
        assert(!filter.match("contentfarm2.com"));

    });

    // This function should be used for blogspot only
    it("match with asterisk", () => {
        var filter = new Filter();
        filter.appendBlacklist(["contentfarm.blogspot.*","contentfarm.com"]);

        assert(filter.match("contentfarm.com"));
        assert(filter.match("www.contentfarm.com"));
        assert(filter.match("www2.en.contentfarm.com"));
        assert(!filter.match("xcontentfarm.com"));
        assert(!filter.match("facebook.com"));
        assert(!filter.match("contentfarm2.com"));

        assert(filter.match("contentfarm.blogspot.com"));
        assert(filter.match("contentfarm.blogspot.hk"));
        assert(!filter.match("contentfarm.blogspotsite.com"));
    });

    it("match with Whitelist", () => {
        var filter = new Filter();
        filter.appendBlacklist(["contentfarm.blogspot.*"]);
        filter.appendBlacklist(["contentfarm.com"])
        filter.appendWhitelist(["google.com","contentfarm.blogspot.hk"]);

        assert(filter.match("contentfarm.com"));
        assert(filter.match("www.contentfarm.com"));
        assert(filter.match("www2.en.contentfarm.com"));
        assert(!filter.match("xcontentfarm.com"));
        assert(!filter.match("facebook.com"));
        assert(!filter.match("contentfarm2.com"));

        assert(filter.match("contentfarm.blogspot.com"));
        assert(!filter.match("contentfarm.blogspot.hk"));
        assert(!filter.match("contentfarm.blogspotsite.com"));
    });

    it("match with http prefix", () => {
        var patterns = [ "http://contentfarm.com", "https://contentfarm.com",
                        "http:///contentfarm.com"];

        for (var i in patterns) {

            var filter = new Filter();
            filter.appendBlacklist([patterns[i]]);

            assert(filter.match("contentfarm.com"));
            assert(filter.match("www.contentfarm.com"));
            assert(filter.match("www2.en.contentfarm.com"));
            assert(filter.match("www-2.en.contentfarm.com"));
            assert(!filter.match("xcontentfarm.com"));
            assert(!filter.match("facebook.com"));
            assert(!filter.match("contentfarm2.com"));

        }
    });

    it("sites duplication checking", () => {
        var map = {};
        for (var i in sites) {
            var site = sites[i];
            if (map.hasOwnProperty(site)){
                throw new Error(site + " is duplicated");
            }
            map[site] = true;
        }
    });

    it("sites format checking", () => {
        for (var i in sites) {
            var site = sites[i];
            if (site.indexOf(" ") >= 0){
                throw new Error(site + " contains extra space.");
            }
        }
    });

});