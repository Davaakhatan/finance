// Display controller
var uiController = (function () {
  var DOMstring = {
    inputType: ".add__type",
    inputDescription: ".add__description",
    inputValue: ".add__value",
    addBtn: ".add__btn",
  };

  return {
    getInput: function () {
      return {
        type: document.querySelector(DOMstring.inputType).value,
        description: document.querySelector(DOMstring.inputDescription).value,
        value: document.querySelector(DOMstring.inputValue).value,
      };
    },

    getDOMstrings: function () {
      return DOMstring;
    },
  };
})();

// Finance Controller
var financeController = (function () {})();

// App connector controller
var appController = (function (uiController, financeController) {
  var ctrlAddItem = function () {
    // 1. Find input data from display
    console.log(uiController.getInput());

    // 2. Save the data to the finance controller

    // 3. Display the data to right place

    // 4. Calculate the budget

    // 5. Final remainder, display calculated data
  };

  var setupEventListener = function () {
    var DOM = uiController.getDOMstrings();
    document.querySelector(DOM.addBtn).addEventListener("click", function () {
      ctrlAddItem();
    });
    document.addEventListener("keypress", function (event) {
      if (event.keyCode === 13 || event.which === 13) {
        ctrlAddItem();
      } else {
      }
    });
  };

  return {
    init: function(){
      console.log('Application started...');
      setupEventListener();
    }
  }
})(uiController, financeController);

/*

var hunController = (function(){
    // data encapsulation

    // private data 
    var bodol = 'JavaScript tolgoi erguulmeer yum...';
    
    function tsusGuig(){

    }
    //private function 
    function huchilTurugchigAgaaraasSorjTsusruuOruulah(){

    }
    return {
        yarih: function(){
            bodol: 'Javascript bol lag';
            huchilTurugchigAgaaraasSorjTsusruuOruulah();
            tsusGuig();
            console.log('hi');
        }
    }
})();
*/

/*
var uiController = (function () {
    var x = 100;
    function add(y){
        return x + y;
    }

    return {
        publicAdd: function(a){
            console.log('Received input : ' + a);
        }
    }
})();

var financeController = (function () {

})();

var appController = (function (uiController, financeController) {
    uiController.publicAdd(150);
})(uiController, financeController);
*/
