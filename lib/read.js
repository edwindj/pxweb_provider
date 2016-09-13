"use strict";
var when = require('when');
//import rest = require('rest');
var rest = require('rest');
var mime = require('rest/interceptor/mime');
// for the moment we are not interested in the structure (version, language etc. of the BASE)
var BASE = "http://api.scb.se/OV0104/v1/doris/en/ssd";
var client = rest.wrap(mime);
function to_TableInfo(item) {
    return {
        name: item.id,
        title: item.text,
        updated: item.updated
    };
}
function to_DataPackage(id, meta) {
    var schema = { fields: [] };
    var dp = { name: id, title: meta.title,
        resources: [{ path: "?", schema: schema }]
    };
    for (var _i = 0, _a = meta.variables; _i < _a.length; _i++) {
        var v = _a[_i];
        if (v.code == "ContentCode") {
            var observations = [];
            for (var i in v.values) {
                var field = {
                    name: v.values[i],
                    title: v.valueTexts[i],
                    type: "number"
                };
            }
        }
        else {
            var field = {
                name: v.code,
                title: v.text,
                type: "categorical",
                categories: v.values.map(function (val) {
                    return { name: val, title: val };
                })
            };
            for (var i in field.categories) {
                field.categories[i].title = v.valueTexts[i];
            }
            if (v.time) {
                field.type = "period";
            }
            schema.fields.push(field);
        }
    }
    return dp;
}
function get_item_list(url, id) {
    if (id === void 0) { id = ""; }
    url = url + "/" + id;
    return client(url)
        .then(function (res) { return res.entity; })
        .then(function (items) {
        console.log(url);
        var p = items.map(function (item) {
            if (item.type == "l") {
                return get_item_list(url, item.id);
            }
            else {
                return when([item]);
            }
        });
        console.log(p);
        return when.all(p).then(function (res) { return (_a = []).concat.apply(_a, res); var _a; });
    });
}
function get_table_list() {
    return get_item_list(BASE)
        .then(function (items) {
        var ta = items;
        return ta.map(to_TableInfo);
    });
}
exports.get_table_list = get_table_list;
// client(BASE)
//   .then( (res: rest.Response) => res.entity)
//   .then((items: ListItem[]) => items.map(to_TableInfo))
//   .then(console.log)
//   ;
//# sourceMappingURL=read.js.map