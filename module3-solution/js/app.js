(function() {
  'use strict';

  angular.module('NarrowItDownApp', [])
    .controller('NarrowItDownController', NarrowItDownController)
    .service('MenuSearchService', MenuSearchService)
    .constant('ApiBasePath', "https://davids-restaurant.herokuapp.com")
    .directive('foundItems', FoundItemsDirective);


  function FoundItemsDirective() {
    var ddo = {
      templateUrl: 'foundItems.html',
      scope: {
        found: '<',
        onRemove: '&'
      },
      controller: NarrowItDownController,
      controllerAs: 'narrowList',
      bindToController: true
    };

    return ddo;
  }

  NarrowItDownController.$inject = ['MenuSearchService'];

  function NarrowItDownController(MenuSearchService) {
    var itemToNarrowDown = this;

    itemToNarrowDown.NarrowItDown = function() {
      var promise = MenuSearchService.getMatchedMenuItems(itemToNarrowDown.keyWord);
      promise.then(function(response) {
          itemToNarrowDown.found = response;
        })
        .catch(function(error) {
          console.log("Something went terribly wrong.");
        });
    }

    itemToNarrowDown.onRemove = function(index) {
      var result = itemToNarrowDown.found.splice(index, 1);
    }
  };

  MenuSearchService.$inject = ['$http', 'ApiBasePath'];

  function MenuSearchService($http, ApiBasePath) {
    var service = this;

    service.getMatchedMenuItems = function(keyWord) {
      return $http({
        method: "GET",
        url: (ApiBasePath + "/menu_items.json")
      }).then(
        function success(response) {
          var itemList = response.data;
          var foundItems = [];

          if ((keyWord === undefined) || ((keyWord !== undefined) && (keyWord.trim().length === 0))) {
            console.log("Keyword issue!");
          } else {
            for (var i = 0; i < itemList.menu_items.length; i++) {
              var menuItem = itemList.menu_items[i];
              var menuItemDesc = menuItem.description;
              if (menuItemDesc.trim().toLowerCase().indexOf(keyWord.trim().toLowerCase()) !== -1) {
                foundItems.push(menuItem.name + " , " + menuItem.short_name + " , " + menuItem.description);
              }
            }
          }
          return foundItems;
        });
    };
  };
})();
