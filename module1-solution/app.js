(function() {
  'use strict';

  angular.module('LunchCheck', [])
    .controller('LunchCheckController', LunchCheckController);

  LunchCheckController.$inject = ['$scope', '$filter'];

  function LunchCheckController($scope) {
    $scope.lunchMenu = "";

    $scope.checkLunchParams = function() {
      //$scope.actualLunchResult = analyseMenu($scope.lunchMenu);
      var lunchRes = analyseMenu($scope.lunchMenu);

      console.log("LunchRes : " + lunchRes);

      switch (lunchRes) {
        case 0:
          $scope.actualLunchResult = "Please enter data first";
          //$scope.menuState = "NoData";
          break;

        case 1:
          $scope.actualLunchResult = "Enjoy!";
          //$scope.menuState = "Enjoy";
          break;

        case 2:
          $scope.actualLunchResult = "Too much!";
          //$scope.menuState = "TooMuch";
          break;

        default:
          //$scope.menuState = "NoData";
      }
    };

    function analyseMenu(lunchMenuListCSV) {
      var lRes = 0;
      var lunchList = lunchMenuListCSV.split(',').filter(checkEmpty);

      if (lunchList.length > 0 && lunchList.length <= 3) {
        lRes = 1;
      } else if (lunchList.length > 3) {
        lRes = 2;
      }

      return lRes;
    };

    // function analyseMenu(lunchMenuListCSV) {
    //   var lunchList = lunchMenuListCSV.split(',').filter(checkEmpty);
    //   var lunchResult = "Please enter data first";
    //
    //   if (lunchList.length > 0 && lunchList.length <= 3) {
    //     lunchResult = "Enjoy!";
    //   }else if(lunchList.length > 3){
    //     lunchResult = "Too much!";
    //   }
    //   return lunchResult;
    // };

    function checkEmpty(string) {
      return string.trim().length > 0 ? string : "";
    }
  }
})();

// !function(){"use strict";function n(n){function e(n){var e=0,t=n.split(",").filter(c);return t.length>0&&t.length<=3?e=1:t.length>3&&(e=2),e}function c(n){return n.trim().length>0?n:""}n.lunchMenu="",n.checkLunchParams=function(){var c=e(n.lunchMenu);switch(console.log("LunchRes : "+c),c){case 0:n.actualLunchResult="Please enter data first";break;case 1:n.actualLunchResult="Enjoy!";break;case 2:n.actualLunchResult="Too much!"}}}angular.module("LunchCheck",[]).controller("LunchCheckController",n),n.$inject=["$scope"]}();
