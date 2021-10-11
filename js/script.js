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

guessButton.addEventListener("click", function (e) {
    // Because we’re working with a form, you want to prevent the default behavior of clicking a button, the form submitting, and then reloading the page. To prevent this reloading behavior, add this line of code at the top of the callback function:
    e.preventDefault();
    const guess = input.value;
    console.log(guess);
    input.value = "";
});