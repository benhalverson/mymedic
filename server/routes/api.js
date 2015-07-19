var express = require('express');
var router = express.Router();
var fs = require("fs");

var db = false;
var dataDir = process.cwd() + "/data";

function parseUrl(url) {
  var parts = url.split("/");
  if (parts.length == 4) {
    return {
      indicator: parts[1],
      subIndicator: parts[2],
      week: parts[3]
    }
  } else {
    throw new Error("Invalid url " + url + ". Parsed version: " + JSON.stringify(parts));
  }
}

function getFile(url) {
  var entity = parseUrl(url);
  var file = dataDir + "/" + entity.indicator + "_" + entity.subIndicator + "_" + entity.week + ".json";
  if (fs.existsSync(file)) {
    try {
      var res = JSON.parse(fs.readFileSync(file));
      return JSON.stringify(res.root[0], null, 2);
    } catch (e) {
      throw new Error("Cannot read/parse " + file + " for the request " + url + ": " + e.message);
    }
  } else {
    throw new Error("File " + file + " is not present for the request " + url);
  }
}

/* GET home page. */
router.get('/*', function(req, res, next) {
  try {
    if (db) {
      throw new Error("DB NOT CONFIGURED");
    } else {
      res.send(getFile(req.url));
    }
  } catch (e) {
    res.send(JSON.stringify({error: e.message}));
  }

});


module.exports = router;
