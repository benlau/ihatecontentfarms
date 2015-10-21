
//10 minus
var threshold = 10 * 60 * 1000;

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
    
    
}