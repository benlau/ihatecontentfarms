import * as Utils from "./utils.js";
import ListFormatter from "./cfblocker/ListFormatter.js";
import LocalStorageStore from "./cfblocker/LocalStorageStore.js";
import {sites} from "./sites.js";

async function setupOptions() {
    var submitButton = "#submitButton";

    var userBlacklistTextArea = "#userBlacklist textarea";
    var userWhitelistTextArea = "#userWhitelist textarea";

    var trTable = {
        "#systemBlacklistLabel" : "systemBlacklist",
        "#systemBlacklistDescLabel" : "systemBlacklistDesc",
        "#userBlacklistLabel" : "userBlacklist",
        "#userBlacklistDescLabel" : "userBlacklistDesc",
        "#userWhitelistLabel" : "userWhitelist",
        "#userWhitelistDescLabel" : "userWhitelistDesc",
        "#appDescLabel": "appDesc",
        "#appNameLabel": "appName",
        "title" : "appName"
    };

    trTable[submitButton] = "save";

    Utils.trFromTable(trTable);

    async function submit() {
        $(submitButton).addClass("disabled");
        Utils.tr(submitButton,"saved");

        await LocalStorageStore.setUserBlacklist(ListFormatter.parse($(userBlacklistTextArea).val()));
        await LocalStorageStore.setUserWhitelist(ListFormatter.parse($(userWhitelistTextArea).val()));

        await chrome.runtime.sendMessage({type: "content_farm_blocker.refreshRules"});
    }

    function enableButton() {
        $(submitButton).removeClass("disabled");
        Utils.tr(submitButton,"save");
        $(submitButton).one("click", (e) => {
            e.preventDefault();
            submit();
        });
    }

    $("#systemBlacklist textarea").val(ListFormatter.stringify(sites));

    $(userBlacklistTextArea).on("change keyup paste", enableButton);

    $(userBlacklistTextArea).val(ListFormatter.stringify(
        await LocalStorageStore.getUserBlacklist()
    ));

    $(userWhitelistTextArea).on("change keyup paste", enableButton);

    $(userWhitelistTextArea).val(ListFormatter.stringify(
        await LocalStorageStore.getUserWhitelist()
    ));

    $("#submitButton").click(function() {
        $("#submitButton").addClass("disabled");
    });
};

setupOptions();