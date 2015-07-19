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
          color: '#FF00FF'
        },
        {
          "name": "Missed by",
          "y": $rootScope.getRemChartValue(m.happiness),
          color: 'white'
        },
        {
          "name": "Motivation",
          "y": $rootScope.getChartValue(m.motivation),
          color: '#FFFF00'
        },
        {
          "name": "Missed by",
          "y": $rootScope.getRemChartValue(m.motivation),
          color: 'white'
        },
        {
          "name": "Satisfaction",
          "y": $rootScope.getChartValue(m.satisfaction),
          color: '#00FFFF'
        },
        {
          "name": "Missed by",
          "y": $rootScope.getRemChartValue(m.satisfaction),
          color: 'white'
        }
      ];
      return [{
        "name": "Emotional Health",
        "colorByPoint": true,
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
        text: 'Fitness Target Completion'
      },
      loading: false,
      size: {}
    };

});
