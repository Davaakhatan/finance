// Display controller
var uiController = (function() {
  var DOMstrings = {
    inputType: ".add__type",
    inputDescription: ".add__description",
    inputValue: ".add__value",
    addBtn: ".add__btn"
  };

  return {
    getInput: function() {
      return {
        type: document.querySelector(DOMstrings.inputType).value, // exp, inc
        description: document.querySelector(DOMstrings.inputDescription).value,
        value: document.querySelector(DOMstrings.inputValue).value
      };
    },

    getDOMstrings: function() {
      return DOMstrings;
    }
  };
})();

// Finance Controller
// private function
var financeController = (function() {
  // private data
  var Income = function(id, description, value) {
    this.id = id;
    this.description = description;
    this.value = value;
  };

  // private data
  var Expense = function(id, description, value) {
    this.id = id;
    this.description = description;
    this.value = value;
  };

  // private data
  var data = {
    items: {
      inc: [],
      exp: []
    },

    totals: {
      inc: 0,
      exp: 0
    }
  };

  return {
    addItem: function(type, desc, val) {
      var item, id;

      if (data.items[type].length === 0) id = 1;
      else {
        id = data.items[type][data.items[type].length - 1].id + 1;
      }

      if (type === "inc") {
        item = new Income(id, desc, val);
      } else {
        item = new Expense(id, desc, val);
      }

      data.items[type].push(item);
    },

    seeData: function() {
      return data;
    }
  };
})();

// App connector controller
var appController = (function(uiController, financeController) {

  var ctrlAddItem = function() {
    // 1. Find input data from display
    var input = uiController.getInput();

    // 2. Save the data to the finance controller
    financeController.addItem(input.type, input.description, input.value);

    // 3. Display the data to right place

    // 4. Calculate the budget

    // 5. Final remainder, display calculated data
  };

  var setupEventListeners = function() {
    var DOM = uiController.getDOMstrings();

    document.querySelector(DOM.addBtn).addEventListener("click", function() {
      ctrlAddItem();
    });

    document.addEventListener("keypress", function(event) {
      if (event.keyCode === 13 || event.which === 13) {
        ctrlAddItem();
      }
    });
  };

  return {
    init: function() {
      console.log("Application started...");
      setupEventListeners();
    }
  };
})(uiController, financeController);

appController.init();

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
