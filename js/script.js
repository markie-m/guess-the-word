// The unordered list where the player’s guessed letters will appear.
const guessed = document.querySelector(".guessed-letters");
// The button with the text “Guess!” in it.
const guessButton = document.querySelector(".guess");
// The text input where the player will guess a letter.
const input = document.querySelector(".letter");
// The empty paragraph where the word in progress will appear.
const inProgress = document.querySelector(".word-in-progress");
// The paragraph where the remaining guesses will display.
const remaining = document.querySelector(".remaining");
// The span inside the paragraph where the remaining guesses will display.
const span = document.querySelector("span");
// The empty paragraph where messages will appear when the player guesses a letter.
const message = document.querySelector(".message");
// The hidden button that will appear prompting the player to play again.
const playAgain = document.querySelector(".play-again");

// Magnolia is your starting word to test out the game until you fetch words from a hosted file in a later step.
let word = "magnolia";
// The guessedLetters empty array will contain all the letters the player guesses. 
const guessedLetters = [];
// The value 8 is the maximum number of guesses the player can make. 
let remainingGuesses = 8;

// Steps 5.8-5.13: An async function to fetch data from a file at the address below. 
const getWord = async function () {
    const response = await fetch("https://gist.githubusercontent.com/skillcrush-curriculum/7061f1d4d3d5bfe47efbfbcfe42bf57e/raw/5ffc447694486e7dea686f34a6c085ae371b43fe/words.txt");
    const words = await response.text();
    console.log(words);
    const wordArray = words.split("\n");
    console.log(wordArray);
    const randomIndex = Math.floor(Math.random() * wordArray.length);
    word = wordArray[randomIndex].trim();
    placeholder(word);
};
getWord();


// Steps 2.4-2.5: Create and name a function to update the paragraph’s innerText for the “word-in-progress” element with circle symbols (●) to represent each letter in the word. 
const placeholder = function (word) {
    const placeholderLetters = [];
    for (const letter of word) {
        console.log(letter);
        placeholderLetters.push("●");
    }
    inProgress.innerText = placeholderLetters.join("");
};
// placeholder(word);
// Take placeholder(word) from your code’s global space and place it at the bottom of getWord(). In the location the call to placeholder(word) used to be, call getWord() instead.
getWord();

// Steps 3.1-3.4: A function to validate the player’s input.
const validate = function (input) {
    // Use a regular expression to ensure the player inputs a letter.
    const acceptedLetter = /[a-zA-Z]/;
    // Use a conditional block to check for different scenarios. 
    if (input.length === 0) {
        message.innerText = "Did you forget to enter a letter?";
    } else if (input.length > 1) {
        message.innerText = "Only one letter, please.";
    } else if (!input.match(acceptedLetter)) {
        message.innerText = "Please enter a letter from A to Z.";
    } else {
        return input;
    }
};

// Steps 3.9-3.12: A function to capture player input.
const makeGuess = function (guess) {
    guess = guess.toUpperCase();
    if (guessedLetters.includes(guess)) {
        message.innerText = "You already guessed that letter, silly. Try again.";
    } else {
        guessedLetters.push(guess);
        console.log(guessedLetters);
        showGuessedLetters();
    
        updateGuessesRemaining(guess);
        wordInProgress(guessedLetters);
    }
};

// Steps 4.1-4.3: A function to show the guessed letters.
const showGuessedLetters = function () {
    guessed.innerHTML = "";

    for (const letter of guessedLetters) {
        const li = document.createElement("li");
        li.innerText = letter;
        guessed.append(li);
    }
};

// Steps 4.6-4.8: A function to update the word in progress that accepts the guessedLetters array as a parameter. This function replaces the circle symbols with the correct letters guessed.
const wordInProgress = function (guessedLetters) {
    const wordUpper = word.toUpperCase();
    // Create a variable to split the word string into an array so that the letter can appear in the guessedLetters array:
    const wordArray = wordUpper.split("");
    
    const revealWord = [];

    // Check if the wordArray contains any letters from the guessedLetters array.
    for (const letter of wordArray) {
        if (guessedLetters.includes(letter)) {
            // If it does contain any of the letters, update the circle symbol with the correct letter. 
            revealWord.push(letter.toUpperCase());
        } else {
            revealWord.push("●");
        }
    }
    console.log(revealWord);
    inProgress.innerText = revealWord.join("");
    // At the bottom of the function that updates the word in progress, call this function to check if the player has won.
    checkIfWin();
};

// Steps 5.2-5.5: A function that accepts the guess input as a parameter. 
const updateGuessesRemaining = function (guess) {
    const upperWord = word.toUpperCase();
    if (!upperWord.includes(guess)) {
        message.innerText = `Sorry, the word has no ${guess}.`;
        remainingGuesses -= 1;
    } else {
        message.innerText = `Yay! This word contains the letter ${guess}!`;
    }

    if (remainingGuesses === 0) {
        message.innerHTML = `Game over. The word was <span class="highlight">${word}</span>.`;
        remaining.innerText = ``;
        startOver();
    } else if (remainingGuesses === 1) {
        span.innerText = `${remainingGuesses} guess`;
    } else {
        span.innerText = `${remainingGuesses} guesses`;
    }
};

// Steps 4.11-4.12: A function to check if the player successfully guessed the word and won the game. 
const checkIfWin = function () {
    if (word.toUpperCase() === inProgress.innerText) {
        message.classList.add("win");
        message.innerHTML = `<p class="highlight">You guessed correctly! The word <em>was</em> ${word}. Congrats!</p>`;
        startOver();
    }
};

// Steps 2.6-2.8: An event listener for when a player clicks the Guess button. 
guessButton.addEventListener("click", function (e) {
    // This line of code prevents the default behavior of clicking a button, the form submitting, and then reloading the page. 
    e.preventDefault();
    message.innerText = "";
    const guess = input.value;
    console.log(guess);
    
    // At the bottom of the event handler, call the function you made that checks the input, and pass it the input value as an argument. Save the result of this function call to a variable and log it out to the console.
    const result = validate(guess);
    console.log(result);

    if (result) {
        makeGuess(guess);
    }
    // Use the console to check the input. Enter a character other than a letter into the input. Notice how the message updates on the screen!
    input.value = "";
});

// Steps 6.4-6.7: A click event listener for the Play Again button. 
playAgain.addEventListener("click", function () {
    message.classList.remove("win");
    message.innerText = "";
    guessed.innerHTML = "";

    remainingGuesses = 8;
    const guessedLetter = [];
    span.innerText = `${remainingGuesses} guesses`;

    guessButton.classList.remove("hide");
    remaining.classList.remove("hide");
    guessed.classList.remove("hide");
    playAgain.classList.add("hide");

    getWord();
});

// Steps 6.1-6.2: A function to reset the game. 
const startOver = function () {
    guessButton.classList.add("hide");
    remaining.classList.add("hide");
    guessed.classList.add("hide");

    playAgain.classList.remove("hide");
}; 
