
import assert from "assert";
import Filter from "cfblocker/Filter";
    
describe("Filter", () => {
    
    it("filter", () => {
        var filter = new Filter();
        filter.appendBlackList(["contentfarm.com"]);
        
        assert(filter.filter("contentfarm.com"));
        assert(filter.filter("www.contentfarm.com"));
        assert(filter.filter("www2.en.contentfarm.com"));
        assert(!filter.filter("xcontentfarm.com"));
        assert(!filter.filter("facebook.com"));
        assert(!filter.filter("contentfarm2.com"));
        
    });
    
});