var letterInput = document.getElementById('letters');
var isDouble = document.getElementById("double"); //2x button
var isTriple = document.getElementById('triple'); //3x button
var foundWords = document.getElementById('words');

var findWords = function() {
  foundWords.innerHTML = ScrabbleWordFinder.find(letterInput.value.toLowerCase(), isDouble.value, isTriple.value).join('\n');
};
