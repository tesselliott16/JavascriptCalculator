/*TODO List:
  - Create equals calculation
  - Create operators
*/
'use strict';

var myApp = angular.module('calculator', []);

myApp.controller('CalculatorController', ['$scope', function($scope) {
  //inital value
  $scope.output = "0";
  //if the number was the first number input
  $scope.newNumber = true;
  //if the button selected was an operator (plus, minus, etc.)
  $scope.operator = null;
  $scope.lastValue = null;
  $scope.usePreviousCalc = false;
  $scope.runningTotal = 0;
  //the running total to be displayed on the screen
  $scope.currentTotal = 0;
  //saving the previous calculation in case of chaining
  $scope.previousCalc = 0;
  $scope.history = [];

  //variables needed
  var ADD = "+";
  var SUB = "-";
  var MULT = "*";
  var DIV = "/";

  //function takes the number input, checks to see if it was the first number,
  //sets the output to the new number string, then adds the number value of our
  //new number to the current total
  $scope.updateScreen = function(btn) {
    if ($scope.newNumber || $scope.usePreviousCalc) {
      // if ($scope.output == "0" || $scope.newNumber || $scope.usePreviousCalc) {
      $scope.output = btn;
      $scope.newNumber = false
    } else if (btn == "." && $scope.lastValue.toString().indexOf(".") > -1) {
      $scope.output = $scope.output;
    } else {
      $scope.output += String(btn);
    }
    $scope.usePreviousCalc = false;
    $scope.lastValue = $scope.output;
  };

  $scope.add = function() {
    $scope.operator = ADD;
    if (!$scope.usePreviousCalc){
      $scope.runningTotal = $scope.lastValue;
    }
    $scope.newNumber = true
  }
  $scope.sub = function() {
    $scope.operator = SUB;
    if (!$scope.usePreviousCalc){
      $scope.runningTotal = $scope.lastValue;
    }
    $scope.newNumber = true
  }
  $scope.mult = function() {
    $scope.operator = MULT;
    if (!$scope.usePreviousCalc){
      $scope.runningTotal = $scope.lastValue;
    }
    $scope.newNumber = true
  }
  $scope.div = function () {
    $scope.operator = DIV;
    if (!$scope.usePreviousCalc){
      $scope.runningTotal = $scope.lastValue;
    }
    $scope.newNumber = true
  }
  $scope.neg = function() {
    $scope.lastValue = (0 - $scope.output);
    if($scope.usePreviousCalc){
      $scope.runningTotal = $scope.lastValue;
    }
    $scope.output = $scope.lastValue;
  }
  $scope.recall = function(oldVal) {
    if($scope.usePreviousCalc){
      $scope.runningTotal = oldVal;
    }
    $scope.lastValue = oldVal;
    $scope.output = $scope.runningTotal;
  }
  $scope.calc = function() {
    if(!isNaN($scope.lastValue)) {
      $scope.lastValue = parseFloat($scope.lastValue);
      $scope.runningTotal = parseFloat($scope.runningTotal);
      var oldVal = $scope.runningTotal;
      if ($scope.runningTotal && $scope.operator == ADD) {
        $scope.runningTotal += $scope.lastValue;
      } else if ($scope.runningTotal && $scope.operator == SUB) {
        $scope.runningTotal -= $scope.lastValue;
      } else if ($scope.runningTotal && $scope.operator == MULT) {
        $scope.runningTotal *= $scope.lastValue;
      } else if ($scope.runningTotal && $scope.operator == DIV) {
        if ($scope.lastValue != 0) {
          $scope.runningTotal /= $scope.lastValue;
        }
        else {
          $scope.output = "Error, don't divide by zero!"
          $scope.runningTotal = null;
          $scope.operator = null;
          $scope.lastValue = null;
          $scope.currentTotal = null;
          $scope.previousCalc = null;
          $scope.newNumber = true;
          return;
        }
      } else (
        $scope.runningTotal = $scope.lastValue
      )
    }
    $scope.runningTotal = Math.round($scope.runningTotal*10000)/10000;
    if($scope.operator !== null){
      var temp = {string: oldVal + " " + $scope.operator + " " + $scope.lastValue + " = " + $scope.runningTotal, total: $scope.runningTotal};
      if($scope.history.length > 8) {
        $scope.history.splice(8, 1);
        $scope.history.unshift(temp);
      } else {
        $scope.history.unshift(temp);
      }
    }
    $scope.output = Math.round($scope.runningTotal*1000000)/1000000;
    $scope.previousCalc = $scope.runningTotal;
    $scope.usePreviousCalc = true;

  }
  $scope.clear = function() {
    $scope.runningTotal = null;
    $scope.operator = null;
    $scope.lastValue = null;
    $scope.currentTotal = null;
    $scope.previousCalc = null;
    $scope.newNumber = true;
    $scope.output = 0;
  }
  $scope.clearHist = function() {
    $scope.history = [];
  }
}]);
