var url = require("url");

export default class UrlFormatter {

    static googleWebCache(site) {
        var u = site.replace(/^https?:?\/?\/?/,"");

        var params = {
            hostname: "webcache.googleusercontent.com",
            protocol: "https",
            pathname: "/search",
            query: {
                strip: 1
            }
        }

        var result = url.format(params);

        u = u.replace("?","%3F");
        u = u.replace("=","%3D");
        u = u.replace("&","%26"); // don't process "#"

        result += "&q=cache:" + u;

        return result;
    }


}
