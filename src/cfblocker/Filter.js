

export default class Filter {
    
    constructor() {
        this._blackList = [];    
        this._patterns = [];
    }
    
    appendBlackList(list) {
        for (var i in list) {
            var item = list[i];
            var replaced = item.replace(/\./g,"\\.").replace(/\*/g,".*");            
            var pattern = new RegExp("^[a-z0-9\.]*\\.+" + replaced + "$|^" + replaced + "$");
            this._blackList.push(item);
            this._patterns.push(pattern);
        }
    }
    
    match(hostname) {
        for (var i in this._patterns) {
            var pattern = this._patterns[i];
            if (hostname.toLowerCase().match(pattern)) {
                return true;    
            }
        }        
        return false;
    }
    
};