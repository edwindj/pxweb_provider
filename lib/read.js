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
function read_table_meta(url, table) {
    return when(table);
}
exports.read_table_meta = read_table_meta;
function get_table_list() {
    var list = [];
    var a = { name: "hi", title: "hello" };
    list.push(a);
    return when(list);
}
exports.get_table_list = get_table_list;
client(BASE).then(function (items) {
    return "";
});
//# sourceMappingURL=read.js.map