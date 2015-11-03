
import assert from "assert";
import ListFormatter from "cfblocker/ListFormatter";
import sites from "../chrome/sites";
    
describe("ListFormatter", () => {
    
    it("parse", () => {
        assert.deepEqual(ListFormatter.parse(null), []);
        assert.deepEqual(ListFormatter.parse(), []);
        assert.deepEqual(ListFormatter.parse(123), ["123"]);
        assert.deepEqual(ListFormatter.parse("abc.com  ,def.net"), ["abc.com","def.net"]);
        assert.deepEqual(ListFormatter.parse("abc.com\ndef.net"), ["abc.com","def.net"]);
    });
    
    
});