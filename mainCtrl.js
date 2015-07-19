'use strict';
angular
.module('mymedic')
.controller('mainCtrl', function($scope) {
  console.log('main ctrl loaded');
  $scope.data = [{
    title: 'Brain Health',
    'percentage': 33
  },
  {
    title: 'Physical Health',
    'percentage': 33
  },
  {
    title: 'Emotional Health',
    'percentage': 33
  }];

  $scope.tabledata = [{
    text: 'hello',
    body: 'hello 2'
  },
  {
    text: 'hello',
    body: 'hello 2'
  }];
});
