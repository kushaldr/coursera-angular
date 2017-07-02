(function() {
  'use strict';

  angular.module('ShoppingListCheckOff', [])
    .controller('ToBuyController', ToBuyController)
    .controller('AlreadyBoughtController', AlreadyBoughtController)
    .service('ShoppingListCheckOffService', ShoppingListCheckOffService);

  ToBuyController.$inject = ['ShoppingListCheckOffService'];

  function ToBuyController(ShoppingListCheckOffService) {
    var itemToBuy = this;
    itemToBuy.items = ShoppingListCheckOffService.getToBuyItems();

    itemToBuy.removeItem = function(itemBoughtIndex) {
      try {
        ShoppingListCheckOffService.removeItemFromToBuyList(itemBoughtIndex);
      } catch (error) {
        itemToBuy.errorMessage = error.message;
      }
    }
  }

  AlreadyBoughtController.$inject = ['ShoppingListCheckOffService'];

  function AlreadyBoughtController(ShoppingListCheckOffService) {
    var itemBought = this;
    itemBought.errorMessage = "Nothing bought yet.";
    itemBought.items = ShoppingListCheckOffService.getAlreadyBoughtList();
  }


  function ShoppingListCheckOffService() {
    var service = this;

    var toBuyList = [{
        name: "Milk",
        quantity: "2 Bottles"
      },
      {
        name: "Donuts",
        quantity: "200 Pieces"
      },
      {
        name: "Cookies",
        quantity: "300 Pieces"
      },
      {
        name: "Chocolate",
        quantity: "5 Bags"
      },
      {
        name: "Wafers",
        quantity: "20 Packs"
      }
    ];

    var alreadyBoughtList = [

    ];

    service.addItemToBoughtList = function(itemIdex) {
      var item = {
        name: toBuyList[itemIdex].name,
        quantity: toBuyList[itemIdex].quantity
      };
      alreadyBoughtList.push(item);
      removeItemFromToBuyList(itemIdex);
    };

    service.removeItemFromToBuyList = function(itemIdex) {
      var item = {
        name: toBuyList[itemIdex].name,
        quantity: toBuyList[itemIdex].quantity
      };
      alreadyBoughtList.push(item);
      toBuyList.splice(itemIdex, 1);
      if ((toBuyList === undefined) || (toBuyList !== undefined) && (toBuyList.length === 0)) {
        throw new Error("Everything is bought!");
      }
    };

    service.getToBuyItems = function() {
      return toBuyList;
    };

    service.getAlreadyBoughtList = function() {
      return alreadyBoughtList;
    }
  }
})();
