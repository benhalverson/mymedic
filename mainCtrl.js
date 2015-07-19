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
            callback(null, res);
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
      var res = $rootScope.weekMetric[obj['prefix']] = getWeekData(obj);
      var keys = Object.keys(res);
      var num = 0;
      var totalPercent = 0;
      for (var i=0; i<keys.length; i++) {
        var val = res[keys[i]];
        totalPercent += val.value*100/val.target;
        ++num;
      }
      var resGlobal = {
        value: totalPercent/num,
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
        callback();
      });
    }

    var generateMetrics = function() {
      console.log(getGlobalData(cognition));
      console.log(getGlobalData(physicalActivities));
      //console.log(getGlobalData(physicalParam));
      console.log(getGlobalData(emotional));
      console.log("WEEK METRICS: \n", JSON.stringify($rootScope.weekMetric, null, 2));
      console.log("GLOBAL METRICS: \n", JSON.stringify($rootScope.globalMetric, null, 2))
      $scope.rootChart();
    };

    getDataFromDB(generateMetrics);

    var getChartValue = function (obj) {
      return (obj.value*100/obj.target)
    };

    var getRemChartValue = function(obj) {
      return 100 - (obj.value*100/obj.target)
    }

    $scope.rootChart = function() {
      console.log("Charting root chart..");
      var g = $rootScope.globalMetric;
      var data = [
        {
          "name": "Physical Health",
          "y": getChartValue(g.physical),
          color: '#FF00FF'
        },
        {
          "name": "Missed by",
          "y": getRemChartValue(g.physical),
          color: 'white'
        },
        {
          "name": "Emotional Health",
          "y": getChartValue(g.mental),
          color: '#FFFF00'
        },
        {
          "name": "Missed by",
          "y": getRemChartValue(g.mental),
          color: 'white'
        },
        {
          "name": "Brain Health",
          "y": getChartValue(g.brain),
          color: '#00FFFF'
        },
        {
          "name": "Missed by",
          "y": getRemChartValue(g.brain),
          color: 'white'
        }
      ];
      $scope.chartConfig.series = [{
        "name": "Health Metric",
        "colorByPoint": true,
        "data":data
      }];
    };

    $scope.mentalChart = function() {
      console.log("Charting mental chart..");
      var m = $rootScope.weekMetric.mental;
      var data = [
        {
          "name": "Happiness",
          "y": getChartValue(m.happiness),
          color: '#FF00FF'
        },
        {
          "name": "Missed by",
          "y": getRemChartValue(m.happiness),
          color: 'white'
        },
        {
          "name": "Motivation",
          "y": getChartValue(m.motivation),
          color: '#FFFF00'
        },
        {
          "name": "Missed by",
          "y": getRemChartValue(m.motivation),
          color: 'white'
        },
        {
          "name": "Satisfaction",
          "y": getChartValue(m.satisfaction),
          color: '#00FFFF'
        },
        {
          "name": "Missed by",
          "y": getRemChartValue(m.satisfaction),
          color: 'white'
        }
      ];
      $scope.chartConfig.series = [{
        "name": "Emotional Health",
        "colorByPoint": true,
        "data":data
      }];
    }

    $scope.replaceAllSeries = function () {
      var data = [
        { name: "first", data: [10] },
        { name: "second", data: [3] },
        { name: "third", data: [13] }
      ];

      $scope.chartConfig.series = data;
  };

  $scope.chartSeries = [{
  }];

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
    series: $scope.chartSeries,
    title: {
      text: 'Fitness Target Completion'
    },
    loading: false,
    size: {}
  };



});
