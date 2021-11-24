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
const span = document.querySelector(".remaining span");
// The empty paragraph where messages will appear when the player guesses a letter.
const message = document.querySelector(".message");
// The hidden button that will appear prompting the player to play again.
const playAgain = document.querySelector(".play-again");

// Create a global variable called word and give it the value of "magnolia". Magnolia is your starting word to test out the game until you fetch words from a hosted file in a later step.
let word = "magnolia";
// Create a global variable called guessedLetters with an empty array. This array will contain all the letters the player guesses. 
let guessedLetters = [];
// Create a global variable called remainingGuesses and set it to a value of 8. The value 8 is the maximum number of guesses the player can make. You can decrease or increase this value to make the game harder or easier for the player! 
let remainingGuesses = 8;

// Steps 5.8-5.13: Near the top of your file, under the word, guessedLetters, and remainingGuesses global variables, add an async function called getWord() to fetch data from a file at the address below. 
const getWord = async function () {
    const response = await fetch("https://gist.githubusercontent.com/skillcrush-curriculum/7061f1d4d3d5bfe47efbfbcfe42bf57e/raw/5ffc447694486e7dea686f34a6c085ae371b43fe/words.txt");
    // In the second await statement, use .text() instead of .json() because you’re fetching data from a text file instead of a JSON file. 
    const words = await response.text();
    // Log out the result of the second await statement to see what data you retrieved! Don’t forget you’ll need to call getWord() in order to view the result in the console.
    console.log(words);
    // You know how to grab a random element from an array, now you’ll grab a random word. To select a random word, you’ll need first to transform the data you fetched into an array. Each word is separated by a newline (line break), so this is the delimiter you’ll use to create the array: 
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


// Steps 2.4-2.5: Create and name a function to update the paragraph’s innerText for the “word-in-progress” element with circle symbols (●) to represent each letter in the word. The symbols will stay on the screen until the correct letter is guessed (in a future step). Hint: Copy and paste the ● symbol into your code! 
// Displays our symbols ("●") as placeholders for the chosen word's letters.
const placeholder = function (word) {
    // I've created an empty placeholderLetters array to hold the placeholders (●) for the iterable word array.
    const placeholderLetters = [];
    // I'm using this for...of loop to iterate through the word array, breaking it into individual letters.
    for (const letter of word) {
        console.log(letter);
        // The push() method adds one or more elements to the end of the new placeholderLetters array, effectively substituting each letter of the word array with circle symbols.
        placeholderLetters.push("●");
    }
    // The join() method returns an array as a string. The elements will be separated by a specified separator. The default separator is comma (,). join() does not change the original array.
    inProgress.innerText = placeholderLetters.join("");
};
// Call the function and pass it the word variable as the argument. You should see 8 circle symbols on the screen, one for each letter in the word “magnolia.” Hint: You’ll need to use an array and then join it back to a string using the .join("") method.
// placeholder(word);
// Take placeholder(word) from your code’s global space and place it at the bottom of getWord(). In the location the call to placeholder(word) used to be, call getWord() instead.
// getWord();

// Steps 2.6-2.8: Add an event listener for when a player clicks the Guess button. In the callback function, add a parameter for the event: e.
guessButton.addEventListener("click", function (e) {
    // Because we’re working with a form, we want to prevent the default behavior of clicking a button, the form submitting, and then reloading the page. To prevent this reloading behavior, add this line of code at the top of the callback function:
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

// Steps 3.1-3.4: Create and name a function that accepts the input value as a parameter. This function’s purpose is to validate the player’s input.
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

// Steps 3.9-3.12: A function to capture player input.Below the function that checks input, create a new function called makeGuess that accepts a letter as the parameter. 
const makeGuess = function (guess) {
    // JavaScript is case sensitive, so it sees uppercase and lowercase letters as different characters. The easiest way to handle case-sensitivity is to convert all letters to one casing. We recommend converting your letter parameter to uppercase. 
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

// Steps 4.1-4.3: A function to show the guessed letters.This function updates the page with letters the player guesses.
const showGuessedLetters = function () {
    guessed.innerHTML = "";

    for (const letter of guessedLetters) {
        const li = document.createElement("li");
        li.innerText = letter;
        guessed.append(li);
    }
};

// Steps 4.6-4.8: Create and name a function to update the word in progress that accepts the guessedLetters array as a parameter. This function replaces the circle symbols with the correct letters guessed.
const wordInProgress = function (guessedLetters) {
    // Create a variable called wordUpper to change the word variable to uppercase. 
    const wordUpper = word.toUpperCase();
    // create a variable to split the word string into an array so that the letter can appear in the guessedLetters array:
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

// Steps 5.2-5.5: Create and name a new function that will accept the guess input as a parameter. In the code, place this function before the function that checks if the player won.
const updateGuessesRemaining = function (guess) {
    // In the function, grab the word and make it uppercase. Because the player’s guess is uppercase, making the word they’re guessing uppercase will compare letters with the same casing.
    const upperWord = word.toUpperCase();
    // Find out if the word contains the guessedLetter. 
    if (!upperWord.includes(guess)) {
        // If it doesn’t include the letter from guess, let the player know that the word doesn’t contain the letter and subtract 1 from their remainingGuesses. 
        message.innerText = `Sorry, the word has no ${guess}.`;
        remainingGuesses -= 1;
    } else {
        // If it does contain a letter, let the player know the letter is in the word.
        message.innerText = `Yay! This word contains the letter ${guess}!`;
    }

    // Still in the function and below the conditional statement, determine if the remainingGuesses is a value of 0. 
    if (remainingGuesses === 0) {
        // If they have no guesses remaining, update the message to say the game is over and what the word is. 
        message.innerHTML = `Game over. The word was <span class="highlight">${word}</span>.`;
        remaining.innerText = ``;
        // Call the startOver function here to trigger the reset of the game upon unsuccessful completion (losing).
        startOver();
    } else if (remainingGuesses === 1) {
        // If they have 1 guess, update the span inside the paragraph where the remaining guesses will display to tell the player they have one guess remaining. 
        span.innerText = `${remainingGuesses} guess`;
    } else {
        // If they have more than one guess, update the same span element to tell them the number of guesses remaining.
        span.innerText = `${remainingGuesses} guesses`;
    }
};

// Steps 4.11-4.12: Create and name a function to check if the player successfully guessed the word and won the game. 
const checkIfWin = function () {
    // Begin by verifying if their word in progress matches the word they should guess.
    if (word.toUpperCase() === inProgress.innerText) {
        // If the player has won, add the “win” class to the empty paragraph where messages appear when they guess the letter. 
        message.classList.add("win");
        // Also, update the paragraph’s contents to:
        message.innerHTML = `<p class="highlight">You guessed correctly! The word <em>was</em> ${word}. Congrats!</p>`;
        // Call the startOver function here to trigger the reset of the game upon successful completion (winning).
        startOver();
    }
};


// Steps 6.4-6.7: Add a click event listener for the Play Again button. 
playAgain.addEventListener("click", function () {
    // Remove the class of “win” applied to the message element. 
    message.classList.remove("win");
    // Empty the message text and the unordered list where the guessed letters appear.
    message.innerText = "";
    guessed.innerHTML = "";

    // Set the remaining guess back to 8 or whichever number of guesses you decided on.  Set your guessedLetter global variable back to an empty array. Populate the text of the span inside the paragraph where the remaining guesses display with the new amount of guesses.
    remainingGuesses = 8;
    const guessedLetter = [];
    span.innerText = `${remainingGuesses} guesses`;

    // Show the Guess button again.
    guessButton.classList.remove("hide");
    // Show the paragraph with remaining guesses again. 
    remaining.classList.remove("hide");
    // Show the guessed letters once more. 
    guessed.classList.remove("hide");
    // Hide the Play Again button.
    playAgain.classList.add("hide");

    // Call the getWord() async function that pulls the new word so the player can play again!
    getWord();
});

// Steps 6.1-6.2: At the bottom of the script.js file, create a function called startOver to reset the game.
const startOver = function () {
    // Hide the Guess button.
    guessButton.classList.add("hide");
    // Hide the paragraph where the remaining guesses will display.
    remaining.classList.add("hide");
    // Hide the unordered list where the guessed letters appear. 
    guessed.classList.add("hide");

    // Use the startOver function to show the button to play again.
    playAgain.classList.remove("hide");
}; 
