var JSV = require("./jsv").JSV;
var json = {};
var schema = {"type" : "object"};
var env = JSV.createEnvironment();
var report = env.validate(json, schema);

if (report.errors.length === 0) {
    //JSON is valid against the schema
}