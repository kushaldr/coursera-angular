(function(){
  'use strict';

  angular.module('MsgApp', [])
  .controller('MsgController',  MsgController);

  MsgController.$inject = ['$scope'];

  function MsgController($scope){
    $scope.name = "Praneetha";

    $scope.school = "1";

    $scope.sayMessage = function(){
    return "Hello!!";
  };

  $scope.flipImage = function (){
    $scope.school = "2";
  };

}
})();
