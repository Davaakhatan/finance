// Display controller
var uiController = (function () {})();

// Finance Controller
var financeController = (function () {})();

// App connector controller
var appController = (function (uiController, financeController) {
  var ctrlAddItem = function () {
    // 1. Find input data from display

    console.log("Get the data from display ");

    // 2. Save the data to the finance controller

    // 3. Display the data to right place

    // 4. Calculate the budget

    // 5. Final remainder, display calculated data
  };

  document.querySelector(".add__btn").addEventListener("click", function () {
    ctrlAddItem();
  });
  document.addEventListener("keypress", function (event) {
    if (event.keyCode === 13 || event.which === 13) {
      ctrlAddItem();
    } else {
    }
  });
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
