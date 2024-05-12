
export function tr(selector,message) {
    $(selector).text(chrome.i18n.getMessage(message));
}

export function hostname(url) {
    var parser = document.createElement("a");
    parser.href = url;
    return parser.hostname;
}

export function trFromTable(table) {
    for (var i in table) {
        $(i).text(chrome.i18n.getMessage(table[i]));
    }
}
