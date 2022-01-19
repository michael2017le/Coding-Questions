// Example input
let testWords = ["good", "bad", "dog", "cat", "do", "dont"];
let testInput = "ddelgoo";

/*
2. Find all of the words in a set of words that can be formed by
a string provided as input. You can  assume that the set of words
are available as an array, in memory, and that the string will only
contain alpha characters. Characters in the input string may not be
used more than once, and not all  characters in the input string must
be used to form a word. The output of your algorithm should  return
an array of all words that can be formed, and if there are none,
that array should be empty.
*/
function wordsFromString(words, input) {

	let count = new Array(26).fill(0);
	let possibleWords = []

	// counts occurrence of each letter in "input"
	for (let char of input) {
		count[char.charCodeAt(0) - 'a'.charCodeAt(0)]++;
	}

	for (let word of words) {
		possible = true 
		countCopy = [...count];
		for (let char of word) {
			idx = char.charCodeAt(0) - 'a'. charCodeAt(0);
			countCopy[idx]--;

			// case where a letter was used too many times
			// so it is no longer possible to make that word
			if (countCopy[idx] < 0) {
				possible = false;
			}
		}
		if (possible) {
			possibleWords.push(word);
		}
	}
	return possibleWords;
}

// Expected result for example input: ["good", "dog", "do"] 
console.log(wordsFromString(testWords, testInput))