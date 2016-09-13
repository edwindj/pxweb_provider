"use strict";
function build_query(filter, selection, format) {
    if (selection === void 0) { selection = []; }
    if (format === void 0) { format = "csv"; }
    var query = { filter: [], response: { format: format } };
    var qf = query.filter;
    for (var _i = 0, filter_1 = filter; _i < filter_1.length; _i++) {
        var code = filter_1[_i];
        var code_filter = {
            code: code,
            selection: {
                filter: "item",
                values: filter[code]
            }
        };
        qf.push(code_filter);
    }
    selection = selection.filter(function (code) { return filter[code] === undefined; });
    qf.push({ code: "ContentsCode", selection: { filter: "item", values: selection } });
    return JSON.stringify(query);
}
exports.build_query = build_query;
//# sourceMappingURL=pxweb.js.map