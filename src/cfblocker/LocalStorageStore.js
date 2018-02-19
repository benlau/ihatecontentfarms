
import ListFormatter from "./ListFormatter";

//10 minus
var threshold = 10 * 60 * 1000;

function _getArray(key) {
    var ret = [];
    try {
        ret = JSON.parse(localStorage.getItem(key));
    } catch (e) {
        ret = [];
    }

    if (!Array.isArray(ret)) {
        ret = [];
    }

    return ret;
}

export default class LocalStorageStore {

    static get isWebRequestFilterBlocked() {
        var ret = false,
            value = -1,
            timestamp = (new Date()).getTime();

        value = parseInt(localStorage.getItem("blockWebRequestFilter"));
        if (value === NaN || value <= 0)
            return false;

        return timestamp - value < threshold;
    }

    /// Disable the Web Request Filter for a while

    static blockWebRequestFilter() {
        var timestamp = (new Date()).getTime();

        localStorage.setItem("blockWebRequestFilter",timestamp);
    }

    static get userBlacklist() {
        return _getArray("userBlacklist");
    }

    static set userBlacklist(val) {
        localStorage.setItem("userBlacklist",JSON.stringify(val));
    }

    static get userWhitelist() {
        return _getArray("userWhitelist");
    }

    static set userWhitelist(val) {
        localStorage.setItem("userWhitelist",JSON.stringify(val));
    }

}