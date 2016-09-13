"use strict";
function to_DataPackage(data) {
    var dim = data.dataset.dimension;
    for (var _i = 0, _a = dim.id; _i < _a.length; _i++) {
        var code = _a[_i];
        var d = dim[code];
        console.log(d);
    }
}
var jstat = require("../examples/jsonstat.json");
to_DataPackage(jstat);
//# sourceMappingURL=json_stat.js.map