'use strict';
angular
.module('mymedic')
.controller('emotionalCtrl', function($scope, $rootScope) {
  console.log('emotional ctrl loaded');

    $rootScope.mentalChart = function() {
      console.log("Charting mental chart..");
      var m = $rootScope.weekMetric.mental;
      var data = [
        {
          "name": "Happiness",
          "y": $rootScope.getChartValue(m.happiness),
          color: '#D40E52'
        },
        {
          "name": "Missed by",
          "y": $rootScope.getRemChartValue(m.happiness),
          color: '#EEA4BE'
        },
        {
          "name": "Motivation",
          "y": $rootScope.getChartValue(m.motivation),
          color: '#DE4A7D'
        },
        {
          "name": "Missed by",
          "y": $rootScope.getRemChartValue(m.motivation),
          color: '#EEA4BE'
        },
        {
          "name": "Satisfaction",
          "y": $rootScope.getChartValue(m.satisfaction),
          color: '#E986A8'
        },
        {
          "name": "Missed by",
          "y": $rootScope.getRemChartValue(m.satisfaction),
          color: '#EEA4BE'
        }
      ];
      return [{
        "name": "Emotional Health",
        "colorByPoint": true,
        "innerSize": 80,
        "data":data
      }];
    }

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
      series: $rootScope.mentalChart(),
      title: {
        text: 'Emotional Health Target'
      },
      loading: false,
      size: {}
    };

});
