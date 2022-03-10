//grab the dictionary
var ScrabbleWordFinder = (() => {
  var ScrabbleWordFinder = function() {
    this.dict = new ScrabbleDictionary(Object.keys(ScrabbleWordList));
  };

  //global vars for now to get the 2x and 3x values
  var isDouble;
  var isTriple;
  ScrabbleWordFinder.prototype.find = function(letters, double, triple) {
    isDouble = double;
    isTriple = triple;
    return validWords(this.dict.root, letters);
  };

//validwords pushes words into the result array 
  var validWords = function(node, letters, word = '', results = []) {
    if (node.isWord) {
      score = points(word, isDouble, isTriple);
      results.push(word + ' ' + score);
    }
    var seen = new Set();
    for (let ch of letters) {
      if (!seen.has(ch)) {
        seen.add(ch);
        if (node.children[ch]) {
          validWords(node.children[ch], letters.replace(ch, ''), word + ch, results);
        }
      }
    }
    return results;
  };

  //Calculates the points, takes in a word and if it is using point modifier

  var points = function(word,double,triple) {
    let score = ScrabbleWordList[word];
    if(document.getElementById('double').checked)
    {
      score *= 2;
    }
    if(document.getElementById('triple').checked)
    {
      score *= 3;
    }
    return score;
  }


  //
  var ScrabbleDictionary = function(words) {
    this.root = new ScrabbleTrieNode();
    words.forEach(word => this.insert(word));
  };

  var ScrabbleTrieNode = function() {
    this.children = Object.create(null);
  };

  ScrabbleDictionary.prototype.insert = function(word) {
    var cursor = this.root;
    for (let letter of word) {
      if (!cursor.children[letter]) {
        cursor.children[letter] = new ScrabbleTrieNode();
      }
      cursor = cursor.children[letter];
    }
    cursor.isWord = true;
  };

  return new ScrabbleWordFinder();
})();


