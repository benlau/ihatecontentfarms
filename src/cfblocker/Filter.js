

export default class Filter {
    
    constructor() {
        this._blackList = [];    
        this._patterns = [];
    }
    
    appendBlackList(list) {
        for (var i in list) {
            var item = list[i];
            var pattern = new RegExp("^[a-zA-Z0-9\.]*\\.+" + item+"$|^"+item +"$");
            this._blackList.push(item);
            this._patterns.push(pattern);
        }
    }
    
    filter(hostname) {
        for (var i in this._patterns) {
            var pattern = this._patterns[i];
            if (hostname.toLowerCase().match(pattern)) {
                return true;    
            }
        }        
        return false;
    }
    
};