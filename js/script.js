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
    // To select a random word, you’ll need first to transform the data you fetched into an array. Each word is separated by a newline (line break), so this is the delimiter you’ll use to create the array: 
    const wordArray = words.split("\n");
    // Log out your wordArray to see the data.
    console.log(wordArray);
    // To grab a random word from the file, create a variable to pull a random index from the wordArray. 
    const randomIndex = Math.floor(Math.random() * wordArray.length);
    // Still in the function, pull out a random word from the array and remove any extra whitespace around the word using the trim() method. Reassign the value of the existing word global variable to this new random word. This means you should also now declare the global word variable with let instead of const.
    word = wordArray[randomIndex].trim();
    // Call the placeholder function you created previously at the bottom of the function. Pass it in the variable holding your random (and freshly trimmed) word!
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
// Call the function and pass it the word variable as the argument. 
// placeholder(word);
// Take placeholder(word) from your code’s global space and place it at the bottom of getWord(). In the location the call to placeholder(word) used to be, call getWord() instead.
getWord();

// Steps 3.1-3.4: A function to validate the player’s input.
const validate = function (input) {
    // Use a regular expression to ensure the player inputs a letter. A regular expression literal consists of a pattern enclosed between slashes:
    const acceptedLetter = /[a-zA-Z]/;
    // Still inside the function, use a conditional block to check for different scenarios. Each condition should have a message directing the player on what to input. 
    if (input.length === 0) {
        // First, check if the input is empty. 
        message.innerText = "Did you forget to enter a letter?";
    } else if (input.length > 1) {
        // Then, check if the player has entered more than one letter. 
        message.innerText = "Only one letter, please.";
    } else if (!input.match(acceptedLetter)) {
        // Finally, check if they’ve entered a character that doesn’t match the regular expression pattern. Hint: You’ll need the .match() method here. 
        message.innerText = "Please enter a letter from A to Z.";
    } else {
        // If all the other conditions aren’t met, the input is a letter, which is what you’re looking for! Return the input.
        return input;
    }
};

// Steps 3.9-3.12: A function to capture player input.
const makeGuess = function (guess) {
    guess = guess.toUpperCase();
    // Once the letter transforms to uppercase, check to see if your guessedLetters array already contains that letter.
    if (guessedLetters.includes(guess)) {
        // If the player already guessed the same letter, update the message to inform the player they’ve already guessed that letter and try again. 
        message.innerText = "You already guessed that letter, silly. Try again.";
    } else {
        // If they haven’t guessed that letter before, add the letter to the guessedLetters array.
        guessedLetters.push(guess);
        // Log out the guessedLetters array to the console.
        console.log(guessedLetters);
        showGuessedLetters();
        // In the else clause of your makeGuess function, before the call to the function that will update the word in progress, call your new updateGuessesRemaining function to update the remaining guesses and pass it the letter that the player guessed as an argument.
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
            // If it does contain any of the letters, update the circle symbol with the correct letter. Hint: You’ll want to create a new array with the updated characters and then use join() to update the empty paragraph where the word in progress will appear.
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

    // Still in the function and below the conditional statement, determine if the remainingGuesses is a value of 0. 
    if (remainingGuesses === 0) {
        // If they have no guesses remaining, update the message to say the game is over and what the word is. 
        message.innerHTML = `Game over. The word was <span class="highlight">${word}</span>.`;
        remaining.innerText = ``;
        startOver();
    } else if (remainingGuesses === 1) {
        // If they have 1 guess, update the span inside the paragraph where the remaining guesses will display to tell the player they have one guess remaining. 
        span.innerText = `${remainingGuesses} guess`;
    } else {
        // If they have more than one guess, update the same span element to tell them the number of guesses remaining.
        span.innerText = `${remainingGuesses} guesses`;
    }
};

// Steps 4.11-4.12: A function to check if the player successfully guessed the word and won the game. 
const checkIfWin = function () {
    if (word.toUpperCase() === inProgress.innerText) {
        message.classList.add("win");
        // Also, update the paragraph’s contents to:
        message.innerHTML = `<p class="highlight">You guessed correctly! The word <em>was</em> ${word}. Congrats!</p>`;
        startOver();
    }
};

// Steps 2.6-2.8: An event listener for when a player clicks the Guess button. 
guessButton.addEventListener("click", function (e) {
    // This line of code prevents the default behavior of clicking a button, the form submitting, and then reloading the page. 
    e.preventDefault();
    // Inside the event handler function for the Guess button, empty the text of the message element.
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
