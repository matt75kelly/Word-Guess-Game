// List Global Variables Here (or object)
var letters = ["A", "B", "C", "D", "E", "F", "G", "H", "I", "J", "K", "L", "M", "N", "O", "P", "Q", "R", "S", "T", "U", "V", "W", "X", "Y", "Z"];
var guessed = "";
var guessedWrong = "";
var targetWord = "";
var playerWord = "";
var wins = 0;
var losses = 0;
var guessesLeft = 0;

// Need Function for choosing the Computer's Word
function computerWord() {
    targetWord = "RESERVED";
    playerWordSetup();
}
// Need a Function to setup the playerWord to Mirror the targetWord
function playerWordSetup(){
    for(i=0; i < targetWord.length; i++){
        playerWord = playerWord + "_";
    }
    guessesLeft = Math.floor(targetWord.length * 1.5);
}
// Need Function for validating Players Guess. 
function isValid(guess){
    var validGuess = false;

    if (isLetter(guess) && isUnique(guess)){
        validGuess = true;
    }
    return validGuess;
}
    // Part 1: Making sure it's a letter
function isLetter(guess){
    for(i=0; i<letters.length; i++){
        if(guess === letters[i]){
            return true;
        }
    }
    return false;
}
    // Part 2: Making sure it's not something already guessed
function isUnique(guess){
    for(i=0; i<guessed.length; i++){
        if(guess === guessed[i]){
            return false;
        }
    }
    return true;
}
// Need a Function for drawing/ updating the gameboard
function drawBoard(){
    document.getElementById("board").textContent = playerWord;
}
// Need a Function for drawing/ updating the guesses
function drawGuesses(){
    document.getElementById("lettersGuessed").textContent = guessedWrong;
}
// Need a Function to update the game stats
function updateStats(){
    document.getElementById("winCount").textContent = wins;
    document.getElementById("lossCount").textContent = losses;
    document.getElementById("guessCount").textContent = guessesLeft;
}
// Need a Function for updating the guess logs after each guess
function updateGuessList(guess){
    if(isMatch(guess)){
        guessed = guessed + guess + ", ";
        console.log("Guessed: " + guessed);
    }
    else if(!isMatch(guess)){
        guessedWrong = guessedWrong + guess + ", ";
        guessed = guessed + guess + ", ";
        console.log("Guessed Wrong: " + guessedWrong + "Guessed: " + guessed);
    }
}
// Need a Function for updating the Player Word
function updatePlayerWord(guess){
    console.log("entered updatePlayerWord Function")
    var word = "";
    var letter = "";
    var wordTwo = "";
    word.length = targetWord.length;
    for(i=0; i<targetWord.length; i++){
        if (guess === targetWord[i]){
            console.log("setting the " + i + " letter to " + guess);
            word = word + guess;
        }
        else {
            word = word + "_"
        }
    }
    console.log("Word: " + word);
    for (j=0; j < targetWord.length; j++) {
        console.log("Inside Loop for Word2");
        if(!(word[j] === "_")){
            letter = word.charAt(j);
            wordTwo = wordTwo + letter;
            console.log("charAt " + j + ": " + letter);
        }
        else if(!(playerWord[j] === "_")){
            letter = playerWord.charAt(j);
            wordTwo = wordTwo + letter;
            console.log("charAt " + j + ": " + letter);
        }
        else if (word[j] === "_" && playerWord[j] === "_"){
            letter = word.charAt(j);
            wordTwo = wordTwo + letter;
        }
    }
    console.log("WordTwo: " + wordTwo);
    playerWord = wordTwo;
    console.log("PlayerWord: " + playerWord);
}
// Need a function to check if we have a match. Depending on if its a match 
// determines what needs updating
function isMatch (guess){
    for(i=0; i<targetWord.length; i++){
        if (guess === targetWord[i]){
            return true;
        }
    }
    return false;
}
// Need a function to reset the game upon completion
function reset(){
    targetWord = "";
    playerWord = "";
    guessed = "";
    guessedWrong = "";
    computerWord();
    drawBoard();
    updateStats();
}
// Need function to initiate change upon winning the game
function victory() {
    // change the image displayed in the left column
document.getElementById("imgLeft").setAttribute("src", "");
    // play audio song
document.getElementById("music").style.display= "block";
document.getElementById("song").setAttribute("src", "");
document.getElementById("music").play();
    // update jumbotron with the title of the song
document.getElementById("songTitle").textContent = "";
    // execute reset
    reset();
}
// Need logic to execute on key up event by player
reset();
console.log(targetWord);

document.onkeyup = function(event){
    var playerGuess = event.key.toUpperCase();
    
    
    if (isValid(playerGuess) && guessesLeft >= 1){
        updateGuessList(playerGuess);
        if (isMatch(playerGuess)){
            updatePlayerWord(playerGuess);
        }
        else {
            guessesLeft--;
            if (guessesLeft == 0){
                losses++;
                updateStats();
                reset();
             }
        }
        if (playerWord === targetWord){
            wins++;
            updateStats();
            victory();
        }
        drawGuesses();
        drawBoard();
        updateStats();
    }
}