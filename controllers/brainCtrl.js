'use strict';
angular
.module('mymedic')
.controller('brainCtrl', function($scope, $rootScope) {
  console.log('brain ctrl loaded');

    $rootScope.brainChart = function() {
      console.log("Charting brain chart..");
      var m = $rootScope.weekMetric.brain;
      var data = [
        {
          "name": "Target",
          "data": [
              m.adaptability.target-m.adaptability.value,
              m.attention.target-m.attention.value,
              m.memory.target-m.memory.value,
              m.sleep.target- m.sleep.value,
              m.speed.target- m.speed.value
            ],
          color: '#FEF5B5'
        },
        {
          "name": "Completed",
          "data": [
              m.adaptability.value,
              m.attention.value,
              m.memory.value,
              m.sleep.value,
              m.speed.value
          ],
          color: '#FCDF15'
        }
      ];
      return data;
    };

    $scope.chartConfig = {
      options: {
        chart: {
          type: 'bar'
        },
        title: {
          text: 'Stacked bar chart'
        },
        xAxis: {
          categories: ['Adaptability', 'Attention', 'Memory', 'Sleep', 'Speed']
        },
        yAxis: {
          min: 0,
          title: {
            text: 'Score'
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
      series: $rootScope.brainChart(),
      title: {
        text: 'Brain Health Target Completion'
      },
      loading: false,
      size: {}
    };

});
