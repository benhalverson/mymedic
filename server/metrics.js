var sa = require('superagent');
var async = require('async');

var week = 1;

function getFileName(prefix, key, suffix) {
  return prefix + "_" + key + "_" + (suffix ? suffix : week) + ".json";
}

function getURL(prefix, key, suffix) {
  return "http://localhost:3000/api/" + prefix + "/" + key + "/" + (suffix ? suffix : week);
}

function getFile(obj, url, key) {
  return function(callback) {
    console.log(url);
    sa.get(url)
      .accept('json')
      .end(function(err,res) {
        if (err) {
          return callback("Error in getting file: " + err.message);
        }
        obj[key] = JSON.parse(res.text);
        callback(err, res);
      });
  };
}

var cognition = {
  "prefix": "brain",
  "adaptability": "",
  "attention": "",
  "memory": "",
  "sleep": "",
  "speed": ""
};

var physicalActivities = {
  "prefix": "physical",
  "running" : "",
  "swimming": ""
}

var physicalBenchmark = {
  "prefix": "physical",
  "benchmark": ""
};

var physicalParam = {
  "prefix": "physical",
  "bp": "",
  "hr": ""
}

var physicalParamStatic = {
  "prefix": "physical",
  "suffix": "static",
  "bp": "",
  "hr": ""
}


var emotional = {
  "prefix": "mental",
  "happiness": "",
  "motivation": "",
  "satisfaction": ""
};

var days = [
  "mon",
  "tue",
  "wed",
  "thu",
  "fri",
  "sat",
  "sun"
];

var getData = function(obj) {
  return function(callback) {
    var prefix = obj['prefix'];
    var suffix = obj['suffix'];
    var keys = Object.keys(obj);
    var tasks = [];
    for (var i = 0; i < keys.length; i++) {
      var key = keys[i];
      if (key == 'prefix' || key == 'suffix') {
        continue;
      }
      var url = getURL(prefix, key, suffix);
      tasks.push(getFile(obj, url, key));
    };
    async.series(tasks, function (err, data) {
      if (err) {
        return callback(new Error("Error while getting file " + ": " + err.message), data);
      }
      callback();
    });
  };
};

var getWeekData = function(obj) {
  var result = {};
  var keys = Object.keys(obj);
  for (var i=0; i<keys.length; i++) {
    var key = keys[i];
    if (key != 'prefix') {
      var total = 0;
      var num = 0;
      for (var j=0; j<days.length; j++) {
        var val = obj[key][days[j]];
        if (val != null) {
          total += val;
          ++num;
        }
      }
      result[key] = {
        value: total/num,
        target: obj[key]['target']
      }
    }
  }
  return result;
}

var getGlobalData = function(obj) {
  var res = getWeekData(obj);
  var keys = Object.keys(res);
  var num = 0;
  var totalPercent = 0;
  for (var i=0; i<keys.length; i++) {
    var val = res[keys[i]];
    totalPercent += val.value*100/val.target;
    ++num;
  }
  console.log("WEEK RESULT: " + JSON.stringify(res, null, 2));
  return {
    value: totalPercent/num,
    target: 100
  }
};

var getDataFromDB = function(callback) {
  var tasks = [];
  tasks.push(getData(cognition));
  tasks.push(getData(physicalActivities));
  tasks.push(getData(physicalBenchmark));
  tasks.push(getData(physicalParam));
  tasks.push(getData(physicalParamStatic));
  tasks.push(getData(emotional));
  async.series(tasks, function(err, res) {
    if (err) {
      console.error("Error while generating metrics: " + JSON.stringify(err, null, 2));
      return;
    }
    callback();
  });
}

var generateMetrics = function() {
    console.log(getGlobalData(cognition));
    console.log(getGlobalData(physicalActivities));
    console.log(getGlobalData(physicalParam));
    console.log(getGlobalData(emotional));
};

getDataFromDB(generateMetrics);

