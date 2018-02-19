

export default class Filter {

    constructor() {
        this._Blacklist = [];
        this._Whitelist = [];
        this._BlacklistRx = [];
        this._WhitelistRx = [];
    }

    appendBlacklist(list) {
        for (var i in list) {
            var item = list[i];
            var rx = this.createRegExp(item);
            this._Blacklist.push(item);
            this._BlacklistRx.push(rx);
        }
    }

    appendWhitelist(list) {
        for (var i in list) {
            var item = list[i];
            var rx = this.createRegExp(item);
            this._Whitelist.push(item);
            this._WhitelistRx.push(rx);
        }
    }

    match(hostname) {
        var ret = false;
        hostname = hostname.toLowerCase();
        for (var i in this._BlacklistRx) {
            var pattern = this._BlacklistRx[i];
            if (hostname.match(pattern)) {

                ret = true;

                for (var j in this._WhitelistRx) {
                    if (hostname.match(this._WhitelistRx[j])) {
                        ret = false;
                        break;
                    }
                }

                break;
            }
        }
        return ret;
    }

    createRegExp(pattern) {
        var replaced;

        // Take out http[s]:// prefix
        replaced = pattern.replace(/^http[s]*:*\/*/,"");

        replaced = replaced.replace(/\./g,"\\.").replace(/\*/g,".*");
        var rx = new RegExp("^[a-z0-9-\.]*\\.+" + replaced + "$|^" + replaced + "$");

        return rx;
    }

};