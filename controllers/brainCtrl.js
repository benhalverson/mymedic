'use strict';
angular
.module('mymedic')
.controller('brainCtrl', function($scope) {
  console.log('brain ctrl loaded');

  //highchart code sample

  $scope.chartTypes = [
    {"id": "pie", "title": "Pie"}
  ];

  $scope.chartSeries = [{
    "name": "Target",
    "colorByPoint": true,
    "data": [{
        "name": "Physical Health",
        "y": 33
      },
      {
        "name": ["Emotional Health"],
        "y": 33
      },
      {
        "name": ["Brain Health"],
        "y": 33
      }
  ]}];

  $scope.chartConfig = {
    options: {
      chart: {
        plotBackgroundColor: null,
        plotBorderWidth: null,
        plotShadow: false,
        type: 'pie',
        options3d: {
          enabled: true, 
          alpha: 45
        }
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
            format: '<b>{point.name}</b>: {point.y:.1f}',
            style: {
              color: (Highcharts.theme && Highcharts.theme.contrastTextColor) || 'black'
            }
          }
        }
      }
    },
    series: $scope.chartSeries,
    title: {
      text: 'Your Health'
    },
    loading: false,
    size: {}
  };

});
