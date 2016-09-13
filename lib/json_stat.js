"use strict";
function is_a(collection) {
    return (function (value) { return collection.indexOf(value) > -1; });
}
function to_DataPackage(data, id) {
    var schema = { fields: [] };
    var dp = {
        name: id || data.dataset.label,
        title: data.dataset.label,
        resources: [{ path: "", schema: schema }]
    };
    var fields = schema.fields;
    var dim = data.dataset.dimension;
    //utility functions
    var is_a_metric = is_a(dim.role.metric);
    var is_time = is_a(dim.role.time);
    for (var _i = 0, _a = dim.id; _i < _a.length; _i++) {
        var code = _a[_i];
        var d = dim[code];
        if (is_a_metric(code)) {
            var _b = d.category, index = _b.index, label = _b.label;
            for (var value in index) {
                var field = { name: value, title: label[value], type: "number", unit: "" };
                fields.push(field);
            }
        }
        else {
            var field = { name: code, title: d.label, categories: [], type: "categorical" };
            var _c = d.category, index = _c.index, label = _c.label;
            for (var value in index) {
                field.categories[index[value]] = {
                    name: value,
                    title: label[value]
                };
            }
            if (is_time(code)) {
                field.type = "date";
            }
            fields.push(field);
        }
    }
    return dp;
}
function to_data(data, dp) {
    if (!dp) {
        dp = to_DataPackage(data);
    }
}
exports.to_data = to_data;
var jstat = require("../examples/jsonstat.json");
var dp = to_DataPackage(jstat, "hello");
console.log(JSON.stringify(dp));
//# sourceMappingURL=json_stat.js.map