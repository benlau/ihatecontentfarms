import { sites } from "./sites.js";
import { SiteList} from "./cfblocker/SiteList.js";
import LocalStorageStore from "./cfblocker/LocalStorageStore.js";
import {Filter} from "./cfblocker/Filter.js";
import ListFormatter from "./cfblocker/ListFormatter.js";

function hostname(url) {
    try {
        return (new URL(url)).hostname;
    } catch (e) {
        return "";
    }
}

let filter = new Filter();

function block(url) {
    const domain = hostname(url);

    return filter.match(domain);
}

function handle(tab) {
    if (block(tab.url)) {
        chrome.tabs.update(tab.id,{ url: "stop.html?to=" + encodeURIComponent(tab.url)});
    }
}


let refreshing = false;

async function refreshRules() {
    if (refreshing) {
        return;
    }
    refreshing = true;
    try {
    // remove existing rules
        const existingRules = await chrome.declarativeNetRequest.getSessionRules();
        const existingRuleids = existingRules.map(rule => rule.id);
        await chrome.declarativeNetRequest.updateSessionRules({
            removeRuleIds: existingRuleids});
        const userBlackList = await LocalStorageStore.getUserBlacklist();
        const userWhiteList = await LocalStorageStore.getUserWhitelist();
        const tmpWhitelist = await LocalStorageStore.getTempWhiteList();
        const whiteList = userWhiteList.concat(Object.keys(tmpWhitelist));

        const siteList = new SiteList(sites, userBlackList, whiteList);
        const rules = siteList.convertToRules();
        await chrome.declarativeNetRequest.updateSessionRules({
            addRules: rules
        });

        filter = new Filter();
        filter.appendBlacklist(sites);
        filter.appendBlacklist(ListFormatter.parse(userBlackList));
        filter.appendWhitelist(ListFormatter.parse(whiteList));
    } finally {
        refreshing = false;
    }
}

async function initialize() {
    refreshRules();

    chrome.tabs.onCreated.addListener(function(tab) {
        handle(tab);
    });

    chrome.tabs.onUpdated.addListener(function(tabId, changeInfo, tab) {
        handle(tab);
    });

    chrome.runtime.onMessage.addListener(function(request, sender, sendResponse) {
        const { type } = request;

        if (type === "content_farm_blocker.refreshRules") {
            const callback = async () => {
                await refreshRules();
                setTimeout(refreshRules, LocalStorageStore.timeout);
                sendResponse({ status: "ok" });    
            }
            callback();
            // Send async response
            return true;
        }
    });
}

initialize();