// Display controller
var uiController = (function () {
  var DOMstrings = {
    inputType: ".add__type",
    inputDescription: ".add__description",
    inputValue: ".add__value",
    addBtn: ".add__btn",
    incomeList: ".income__list",
    expenseList: ".expenses__list",
  };

  return {
    getInput: function () {
      return {
        type: document.querySelector(DOMstrings.inputType).value, // exp, inc
        description: document.querySelector(DOMstrings.inputDescription).value,
        value: document.querySelector(DOMstrings.inputValue).value,
      };
    },

    getDOMstrings: function () {
      return DOMstrings;
    },

    clearFields: function () {
      var fields = document.querySelectorAll(
        DOMstrings.inputDescription + ", " + DOMstrings.inputValue
      );

      // Convernt List to Array
      var fieldArr = Array.prototype.slice.call(fields);
      fieldArr.forEach(function (el, index, array) {
        el.value = "";
      });

      fieldArr[0].focus();
      // for (var i = 0; i < fieldArr.length; i++) {
      //   fieldArr[i].value = "";
      // }
    },

    addListItem: function (item, type) {
      // write and html to contain income, expense
      var html, list;
      if (type === "inc") {
        list = DOMstrings.incomeList;
        html =
          '<div class="item clearfix" id="income-%id%"><div class="item__description">$$DESCRIPTION$$</div><div class="right clearfix"><div class="item__value">$$VALUE$$</div><div class="item__delete">            <button class="item__delete--btn"><i class="ion-ios-close-outline"></i></button></div>        </div></div>';
      } else {
        list = DOMstrings.expenseList;
        html =
          '<div class="item clearfix" id="expense-%id%"><div class="item__description">$$DESCRIPTION$$</div>          <div class="right clearfix"><div class="item__value">$$VALUE$$</div><div class="item__percentage">21%</div><div class="item__delete"><button class="item__delete--btn">                <i class="ion-ios-close-outline"></i></button></div></div></div>';
      }
      // on that HTML, use replace function to modify income and expense
      html = html.replace("%id%", item.id);
      html = html.replace("$$DESCRIPTION$$", item.description);
      html = html.replace("$$VALUE$$", item.value);
      // into DOM
      document.querySelector(list).insertAdjacentHTML("beforeend", html);
    },
  };
})();

// Finance Controller
// private function
var financeController = (function () {
  // private data
  var Income = function (id, description, value) {
    this.id = id;
    this.description = description;
    this.value = value;
  };

  // private data
  var Expense = function (id, description, value) {
    this.id = id;
    this.description = description;
    this.value = value;
  };

  // private data
  var data = {
    items: {
      inc: [],
      exp: [],
    },

    totals: {
      inc: 0,
      exp: 0,
    },
  };

  return {
    addItem: function (type, desc, val) {
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

      return item;
    },

    seeData: function () {
      return data;
    },
  };
})();

// App connector controller
var appController = (function (uiController, financeController) {
  var ctrlAddItem = function () {
    // 1. Find input data from display
    var input = uiController.getInput();

    // 2. Save the data to the finance controller
    var item = financeController.addItem(
      input.type,
      input.description,
      input.value
    );

    // 3. Display the data to right place
    uiController.addListItem(item, input.type);
    uiController.clearFields();
    // 4. Calculate the budget

    // 5. Final remainder, display calculated data
  };

  var setupEventListeners = function () {
    var DOM = uiController.getDOMstrings();

    document.querySelector(DOM.addBtn).addEventListener("click", function () {
      ctrlAddItem();
    });

    document.addEventListener("keypress", function (event) {
      if (event.keyCode === 13 || event.which === 13) {
        ctrlAddItem();
      }
    });
  };

  return {
    init: function () {
      console.log("Application started...");
      setupEventListeners();
    },
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
