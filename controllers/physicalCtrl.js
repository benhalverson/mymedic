'use strict';
angular
.module('mymedic')
.controller('physicalCtrl', function($scope, $rootScope) {
  console.log('physical ctrl loaded');

    $rootScope.physicalChart = function() {
      console.log("Charting physical chart..");
      var m = $rootScope.weekMetric.physical;
      var data = [
        {
          "name": "Target",
          "data": [m.running.target-m.running.value, m.swimming.target-m.swimming.value],
          color: '#85CCDD'
        },
        {
          "name": "Completed",
          "data": [m.running.value, m.swimming.value],
          color: '#0B99BC'
        }
      ];
      return data;
    }

    $scope.chartConfig = {
      options: {
        chart: {
          type: 'bar'
        },
        title: {
          text: 'Stacked bar chart'
        },
        xAxis: {
          categories: ['Running', 'Swimming']
        },
        yAxis: {
          min: 0,
          title: {
            text: 'Mins'
          }
        },
        legend: {
          reversed: true
        },
        plotOptions: {
          series: {
            stacking: 'normal'
          }
        }
      },
      series: $rootScope.physicalChart(),
      title: {
        text: 'Physical Health Target'
      },
      loading: false,
      size: {}
    };

});
