"use strict";
function to_data(json) {
    var vals = [];
    var keys = json.columns
        .filter(function (col) { return col.type != "c"; })
        .map(function (col) { return col.code; });
    var values = json.columns
        .filter(function (col) { return col.type == "c"; })
        .map(function (col) { return col.code; });
    for (var _i = 0, _a = json.data; _i < _a.length; _i++) {
        var item = _a[_i];
        var val = {};
        for (var i in item.key) {
            val[keys[i]] = item.key[i];
        }
        for (var i in item.values) {
            val[values[i]] = item.values[i];
        }
        vals.push(val);
    }
    return vals;
}
exports.to_data = to_data;
// let json = require("../examples/json_response.json");
// to_data(json); 
//# sourceMappingURL=json_response.js.map