'use strict';
angular
.module('mymedic')
.controller('mainCtrl', function($scope, $rootScope, $http) {

    $rootScope.week = 1;
    $rootScope.weekMetric = {};
    $rootScope.globalMetric = {};

    function getURL(prefix, key, suffix) {
      return "http://localhost:3000/api/" + prefix + "/" + key + "/" + (suffix ? suffix : $rootScope.week);
    }

    function getFile(obj, url, key) {
      return function(callback) {
        console.log(url);
        $http
          .get(url)
          .success(function(res) {
            obj[key] = res;
            return callback(null, res);
          })
          .error(function(err) {
            return callback("Error in getting file: " + err.message);
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
          return callback();
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
          var avg = Math.round(total*100/num)/100;
          result[key] = {
            value: avg,
            target: obj[key]['target']
          }
        }
      }
      return result;
    }

    var getGlobalData = function(obj) {
      var res = $rootScope.weekMetric[obj['prefix']] = getWeekData(obj);
      var keys = Object.keys(res);
      var num = 0;
      var totalPercent = 0;
      for (var i=0; i<keys.length; i++) {
        var val = res[keys[i]];
        totalPercent += val.value*100/val.target;
        ++num;
      }
      var avg = Math.round(totalPercent*100/num)/100;
      var resGlobal = {
        value: avg,
        target: 100
      };
      $rootScope.globalMetric[obj['prefix']] = resGlobal;
      return;
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
        return callback();
      });
    }

    var generateMetrics = function() {
      console.log(getGlobalData(cognition));
      console.log(getGlobalData(physicalActivities));
      //console.log(getGlobalData(physicalParam));
      console.log(getGlobalData(emotional));
      console.log("WEEK METRICS: \n", JSON.stringify($rootScope.weekMetric, null, 2));
      console.log("GLOBAL METRICS: \n", JSON.stringify($rootScope.globalMetric, null, 2))
      $scope.chartConfig.series = $rootScope.rootChart();
    };

    getDataFromDB(generateMetrics);

    $rootScope.getChartValue = function (obj) {
      return (obj.value*100/obj.target)
    };

    $rootScope.getRemChartValue = function(obj) {
      return 100 - (obj.value*100/obj.target)
    }

    $rootScope.rootChart = function() {
      console.log("Charting root chart..");
      var g = $rootScope.globalMetric;
      var data = [
        {
          "name": "Physical Health",
          "y": $rootScope.getChartValue(g.physical),
          color: '#0B99BC'
        },
        {
          "name": "Missed by",
          "y": $rootScope.getRemChartValue(g.physical),
          color: '#D1EBF2'

        },
        {
          "name": "Emotional Health",
          "y": $rootScope.getChartValue(g.mental),
          color: '#D40E52'

        },
        {
          "name": "Missed by",
          "y": $rootScope.getRemChartValue(g.mental),
          color: '#F1B3C8'

        },
        {
          "name": "Brain Health",
          "y": $rootScope.getChartValue(g.brain),
          color: '#FCDF15'
        },
        {
          "name": "Missed by",
          "y": $rootScope.getRemChartValue(g.brain),
          color: '#FEF5B5'
        }
      ];

      return [{
        "name": "Health Metric",
        "colorByPoint": true,
        "innerSize": 80,
        "data":data
      }];
    };

  $scope.chartConfig = {
    options: {
      chart: {
        plotBackgroundColor: null,
        plotBorderWidth: null,
        plotShadow: false,
        type: 'pie'
      },
      title: {
        text: 'Browser market shares January, 2015 to May, 2015'
      },
      tooltip: {
        pointFormat: '{series.name}: <b>{point.y:.1f}%</b>'
      },
      plotOptions: {
        pie: {
          allowPointSelect: true,
          cursor: 'pointer',
          dataLabels: {
            enabled: true,
            format: '<b>{point.name}</b>: {point.y:.1f}%',
            style: {
              color: (Highcharts.theme && Highcharts.theme.contrastTextColor) || 'black'
            }
          }
        }
      }
    },
    series: [{}],
    title: {
      text: 'Fitness Target Completion'
    },
    loading: false,
    size: {}
  };
});
