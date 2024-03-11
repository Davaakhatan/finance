// Display controller
var uiController = (function () {
  var DOMstrings = {
    inputType: ".add__type",
    inputDescription: ".add__description",
    inputValue: ".add__value",
    addBtn: ".add__btn",
    incomeList: ".income__list",
    expenseList: ".expenses__list",
    budgetLabel: ".budget__value",
    incomeLabel: ".budget__income--value",
    expenseLabel: ".budget__expenses--value",
    percentageLabel: ".budget__expenses--percentage",
    containerDiv: ".container",
  };

  return {
    getInput: function () {
      return {
        type: document.querySelector(DOMstrings.inputType).value, // exp, inc
        description: document.querySelector(DOMstrings.inputDescription).value,
        value: parseInt(document.querySelector(DOMstrings.inputValue).value),
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
    },

    displayBudget: function (budget) {
      document.querySelector(DOMstrings.budgetLabel).textContent =
        budget.budget;
      document.querySelector(DOMstrings.incomeLabel).textContent =
        budget.totalInc;
      document.querySelector(DOMstrings.expenseLabel).textContent =
        budget.totalExp;
      if (budget.percent !== 0) {
        document.querySelector(DOMstrings.percentageLabel).textContent =
          budget.percent + "%";
      } else {
        document.querySelector(DOMstrings.percentageLabel).textContent =
          budget.percent;
      }
    },

    deleteListItem: function(id){
      var el = document.getElementById(id);
      el.parentNode.removeChild(el);
    },

    addListItem: function (item, type) {
      // write and html to contain income, expense
      var html, list;
      if (type === "inc") {
        list = DOMstrings.incomeList;
        html =
          '<div class="item clearfix" id="inc-%id%"><div class="item__description">$$DESCRIPTION$$</div><div class="right clearfix"><div class="item__value">$$VALUE$$</div><div class="item__delete">            <button class="item__delete--btn"><i class="ion-ios-close-outline"></i></button></div>        </div></div>';
      } else {
        list = DOMstrings.expenseList;
        html =
          '<div class="item clearfix" id="exp-%id%"><div class="item__description">$$DESCRIPTION$$</div>          <div class="right clearfix"><div class="item__value">$$VALUE$$</div><div class="item__percentage">21%</div><div class="item__delete"><button class="item__delete--btn">                <i class="ion-ios-close-outline"></i></button></div></div></div>';
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

  var calculateTotal = function (type) {
    var sum = 0;
    data.items[type].forEach(function (el) {
      sum = sum + el.value;
    });

    data.totals[type] = sum;
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

    budget: 0,

    percent: 0,
  };

  return {
    calculateBudget: function () {
      // calculate total income
      calculateTotal("inc");
      // calculate total expense
      calculateTotal("exp");

      // new calculate budget
      data.budget = data.totals.inc - data.totals.exp;

      // Calculate percent of inc and exp
      data.percent = Math.round((data.totals.exp / data.totals.inc) * 100);
    },

    getBudget: function () {
      return {
        budget: data.budget,
        percent: data.percent,
        totalInc: data.totals.inc,
        totalExp: data.totals.exp,
      };
    },

    deleteItem: function (type, id) {
      var ids = data.items[type].map(function (el) {
        return el.id;
      });

      // console.log("ids: " + ids);
      var index = ids.indexOf(id);
      // console.log("index:" + index);

      if (index !== -1) {
        // console.log("about to delete");
        data.items[type].splice(index, 1);
      }
    },

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

    if (input.description !== "" && input.value !== "") {
      // 2. Save the data to the finance controller
      var item = financeController.addItem(
        input.type,
        input.description,
        input.value
      );
    }

    // 3. Display the data to right place
    uiController.addListItem(item, input.type);
    uiController.clearFields();

    // 4. Calculate the budget
    financeController.calculateBudget();
    // 5. Final remainder, display calculated data
    var budget = financeController.getBudget();

    // 6. Display the final calculation
    uiController.displayBudget(budget);
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

    document
      .querySelector(DOM.containerDiv)
      .addEventListener("click", function (event) {
        var id = event.target.parentNode.parentNode.parentNode.parentNode.id;

        if (id) {
          // inc-1
          var arr = id.split("-");
          var type = arr[0];
          var itemId = parseInt(arr[1]);
          console.log(type + "---> " + itemId);
          // 1. use id to delete from finance module
          financeController.deleteItem(type, itemId);
          // 2. delete it from the display
          uiController.deleteListItem(id);
          // 3. calculate remaining and display it.
        }
      });
  };

  return {
    init: function () {
      console.log("Application started...");
      uiController.displayBudget({
        budget: 0,
        percent: 0,
        totalInc: 0,
        totalExp: 0,
      });
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
