'use strict';
angular
.module('mymedic')
.controller('mainCtrl', function($scope) {
  $scope.items = [{
    test: 1,
    body: "text"
  },
  {test: 2,
  body: "more text"
  }
  ]
});
