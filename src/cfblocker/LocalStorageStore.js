
import ListFormatter from "./ListFormatter";

//10 minus
var threshold = 10 * 60 * 1000;

function _getArray(key) {
    console.log("_getArray",key);
    var ret = [];
    try {
        ret = JSON.parse(localStorage.getItem(key));
    } catch (e) {
        ret = [];
    }

    if (!$.isArray(ret)) {
        ret = [];
    }

    console.log("_getArray",ret);

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
    
    static blockWebRequestFilter() {
        var timestamp = (new Date()).getTime();
        
        localStorage.setItem("blockWebRequestFilter",timestamp);
    }

    static get userBlackList() {
        return _getArray("userBlackList");
    }
    
    static set userBlackList(val) {
        localStorage.setItem("userBlackList",JSON.stringify(val));
    }

    static get userWhiteList() {
        return _getArray("userWhiteList");
    }
    
    static set userWhiteList(val) {
        localStorage.setItem("userWhiteList",JSON.stringify(val));
    }

}