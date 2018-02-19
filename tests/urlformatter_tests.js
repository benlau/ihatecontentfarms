
import assert from "assert";
import UrlFormatter from "cfblocker/UrlFormatter";
import sites from "../chrome/sites";

describe("UrlFormatter", () => {

    it("googleWebCache", () => {

        assert.equal(UrlFormatter.googleWebCache("http://www.w3schools.com/jsref/jsref_encodeURI.asp"),
                     "https://webcache.googleusercontent.com/search?strip=1&q=cache:www.w3schools.com/jsref/jsref_encodeURI.asp");

        assert.equal(UrlFormatter.googleWebCache("https://nodejs.org/api/url.html#url_escaped_characters"),
                     "https://webcache.googleusercontent.com/search?strip=1&q=cache:nodejs.org/api/url.html#url_escaped_characters");

        assert.equal(UrlFormatter.googleWebCache("http://stackoverflow.com/jobs?med=site-ui&ref=jobs-tab"),
                     "https://webcache.googleusercontent.com/search?strip=1&q=cache:stackoverflow.com/jobs%3Fmed%3Dsite-ui%26ref=jobs-tab");

    });


});