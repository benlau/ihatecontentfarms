
export class SiteList {
    constructor(
        sysemBlackList = [],
        userBlackList = [],
        userWhiteList = [],
    ) {
        this.sysemBlackList = sysemBlackList;
        this.userBlackList = userBlackList;
        this.userWhiteList = userWhiteList;
    }

    setSystemBlackList(list) {
        this.sysemBlackList = list;
    }

    setUserBlackList(list) {
        this.userBlackList = list;
    }

    setUserWhiteList(list) {
        this.userWhiteList = list;
    }

    getBlackList() {
        return this.sysemBlackList.concat(this.userBlackList);
    }

    convertToRules() {
        const blackList = this.getBlackList();

        return blackList.map((site, index) => {
            return {
                id: index + 1,
                priority: 1,
                action : { 
                    type : "block",
                },
                condition : {
                    urlFilter : "||" + site,
                    resourceTypes : ["main_frame", "sub_frame", "script"]
                }
            }
        }).concat(this.userWhiteList.map((site, index) => {
            return {
                id: blackList.length + index + 1,
                priority: 10,
                action : { 
                    type : "allow",
                },
                condition : {
                    urlFilter : "||" + site,
                    resourceTypes : ["main_frame", "sub_frame", "script"]
                }
            }
        }));
    }
}
