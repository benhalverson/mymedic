'use strict';
angular
.module('mymedic')
.controller('mainCtrl', function($scope) {
  console.log('main ctrl loaded');

  //highchart code sample

  $scope.chartTypes = [
    {"id": "pie", "title": "Pie"}
  ];

  $scope.chartSeries = [
    {"name": "Brain Health", "data": [33, 33, 33]},


  ];

  $scope.chartConfig = {
    options: {
      chart: {
        type: 'pie'
      },
      plotOptions: {
        series: {
          stacking: ''
        }
      }
    },
    series: $scope.chartSeries,
    credits: {
      enabled: true
    },
    loading: false,
    size: {}
  }

});
