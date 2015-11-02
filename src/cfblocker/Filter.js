

export default class Filter {
    
    constructor() {
        this._blackList = [];    
        this._whiteList = [];
        this._blackListRx = [];
        this._whiteListRx = [];
    }
    
    appendBlackList(list) {
        for (var i in list) {
            var item = list[i];
            var rx = this.createRegExp(item);
            this._blackList.push(item);
            this._blackListRx.push(rx);
        }
    }
    
    appendWhiteList(list) {
        for (var i in list) {
            var item = list[i];
            var rx = this.createRegExp(item);
            this._whiteList.push(item);
            this._whiteListRx.push(rx);
        }
    }
    
    match(hostname) {
        var ret = false;
        hostname = hostname.toLowerCase();
        for (var i in this._blackListRx) {
            var pattern = this._blackListRx[i];
            if (hostname.match(pattern)) {
                
                ret = true;
                
                for (var j in this._whiteListRx) {
                    if (hostname.match(this._whiteListRx[j])) {
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
        var replaced = pattern.replace(/\./g,"\\.").replace(/\*/g,".*");            
        var rx = new RegExp("^[a-z0-9\.]*\\.+" + replaced + "$|^" + replaced + "$");
        
        return rx;
    }
    
};