export class UrlFormatter {

    static googleWebCache(site) {
        var u = site.replace(/^https?:?\/?\/?/,"");

        u = u.replace("?","%3F");
        u = u.replace("=","%3D");
        u = u.replace("&","%26"); // don't process "#"

        var result = "https://webcache.googleusercontent.com/search?strip=1&q=cache:" + u;

        return result;
    }
}
