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

// Create another global variable called word and give it the value of "magnolia". Magnolia is your starting word to test out the game until you fetch words from a hosted file in a later step.
const word = "magnolia";
// Create another global variable called guessedLetters with an empty array. This array will contain all the letters the player guesses. 
const guessedLetters = [];
// Create a global variable called remainingGuesses and set it to a value of 8. The value 8 is the maximum number of guesses the player can make. You can decrease or increase this value to make the game harder or easier for the player! 
let remainingGuesses = 8;

// Create and name a function to update the paragraph’s innerText for the “words-in-progress” element with circle symbols (●) to represent each letter in the word. The symbols will stay on the screen until the correct letter is guessed (in a future step). Hint: Copy and paste the ● symbol into your code!
const placeholder = function (word) {
    // I've created an empty array.
    const placeholderLetters = [];
    // I'm using this for...of loop to loop through the placeholderLetters array.
    for (const letter of word) {
        console.log(letter);
        placeholderLetters.push("●");
    }
    // The join() method returns an array as a string. The elements will be separated by a specified separator. The default separator is comma (,). join() does not change the original array.
    inProgress.innerText = placeholderLetters.join("");
};
// Call the function and pass it the word variable as the argument. You should see 8 circle symbols on the screen, one for each letter in the word “magnolia.” Hint: You’ll need to use an array and then join it back to a string using the .join("") method.
placeholder(word);

const validate = function (input) {
    // Use a regular expression to ensure the player inputs a letter. A regular expression literal consists of a pattern enclosed between slashes:
    const acceptedLetter = /[a-zA-Z]/;
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

// Below the function that checks input, create a new function called makeGuess that accepts a letter as the parameter. 
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
        wordInProgress(guessedLetters);
    }
};

const showGuessedLetters = function () {
    guessed.innerHTML = "";

    for (const letter of guessedLetters) {
        const li = document.createElement("li");
        li.innerText = letter;
        guessed.append(li);
    }
};

// Create and name a function to update the word in progress that accepts the guessedLetters array as a parameter. This function will replace the circle symbols with the correct letters guessed.
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

// Create and name a function to check if the player successfully guessed the word and won the game. Begin by verifying if their word in progress matches the word they should guess.
const checkIfWin = function () {
    // If the player has won, add the “win” class to the empty paragraph where messages appear when they guess the letter. 
    if (word.toUpperCase() === inProgress.innerText) {
        message.classList.add("win");
        // Also, update the paragraph’s contents to:
        message.innerHTML = `<p class="highlight">You guessed correct the word! Congrats!</p>`;
    }
};

guessButton.addEventListener("click", function (e) {
    // Because we’re working with a form, we want to prevent the default behavior of clicking a button, the form submitting, and then reloading the page. To prevent this reloading behavior, add this line of code at the top of the callback function:
    e.preventDefault();
    message.innerText = "";
    const guess = input.value;
    console.log(guess);
    

    const result = validate(guess);
    console.log(result);

    if (result) {
        makeGuess(guess);
    }

    input.value = "";
});
