
export default class LocalStorageStore {

    static timeout = 10 * 60 * 1000;

    static async getUserBlacklist() {
        return await this.getArray("userBlacklist");
    }

    static async setUserBlacklist(val) {
        await chrome.storage.local.set(
            {"userBlacklist": JSON.stringify(val)}
        );
    }

    static async getUserWhitelist() {
        return await this.getArray("userWhitelist");
    }

    static async setUserWhitelist(val) {
        await chrome.storage.local.set(
            {"userWhitelist": JSON.stringify(val)}
        );
    }

    static async getArray(key) {
        var ret = [];
        try {
            const content = await chrome.storage.local.get([key])
            ret = JSON.parse(content[key]);
        } catch (e) {
            ret = [];
        }
    
        if (!Array.isArray(ret)) {
            ret = [];
        }
    
        return ret;
    }

    static async getTempWhiteList() {
        let res
        try {
            const content = (await chrome.storage.local.get(["tmpWhiteList"]))["tmpWhiteList"];
            res = JSON.parse(content);
        } catch (e) {
            res = {};
        }

        // purge timeouted whitelist
        const timestamp = (new Date()).getTime();
        for (const key in res) {
            if (timestamp - res[key] > this.timeout) {
                delete res[key];
            }
        }

        return res;
    }

    static async addTempWhiteList(hostname) {
        const res = await this.getTempWhiteList();
        res[hostname] = new Date().getTime();

        await chrome.storage.local.set(
            {"tmpWhiteList": JSON.stringify(res)}
        );
    }
}