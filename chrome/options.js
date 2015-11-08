var sites = require("./sites"),
    Filter = require("cfblocker/Filter"),
    ListFormatter = require("cfblocker/ListFormatter"),
    LocalStorageStore = require("cfblocker/LocalStorageStore"),
    Utils = require("./utils");

$(document).ready(() => {
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

    function submit() {
        $(submitButton).addClass("disabled");
        Utils.tr(submitButton,"saved");

        LocalStorageStore.userBlacklist = ListFormatter.parse($(userBlacklistTextArea).val());
        LocalStorageStore.userWhitelist = ListFormatter.parse($(userWhitelistTextArea).val());
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

    $(userBlacklistTextArea).val(ListFormatter.stringify(LocalStorageStore.userBlacklist));

    $(userWhitelistTextArea).on("change keyup paste", enableButton);

    $(userWhitelistTextArea).val(ListFormatter.stringify(LocalStorageStore.userWhitelist));

    $("#submitButton").click(function() {
        $("#submitButton").addClass("disabled");
    });
});