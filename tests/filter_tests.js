
import assert from "assert";
import Filter from "cfblocker/Filter";
import sites from "../chrome/sites";
    
describe("Filter", () => {
    
    it("match", () => {
        var filter = new Filter();
        filter.appendBlackList(["contentfarm.com"]);
        
        assert(filter.match("contentfarm.com"));
        assert(filter.match("www.contentfarm.com"));
        assert(filter.match("www2.en.contentfarm.com"));
        assert(!filter.match("xcontentfarm.com"));
        assert(!filter.match("facebook.com"));
        assert(!filter.match("contentfarm2.com"));
        
    });
    
    // This function should be used for blogspot only
    it("match with asterisk", () => {
        var filter = new Filter();
        filter.appendBlackList(["contentfarm.blogspot.*","contentfarm.com"]);
        
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
    
    
});