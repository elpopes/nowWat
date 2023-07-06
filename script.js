import cards from "./cards.js";

function shuffle(array) {
  let currentIndex = array.length;
  let temporaryValue, randomIndex;

  while (currentIndex !== 0) {
    randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex--;

    temporaryValue = array[currentIndex];
    array[currentIndex] = array[randomIndex];
    array[randomIndex] = temporaryValue;
  }

  return array;
}

shuffle(cards);

let deck = document.getElementById("deck");
let startButton = document.getElementById("startButton");
let timer = document.getElementById("timer");

let currentCardIndex = 0;
let currentCard;
let timerInterval;

function flipCard() {
  if (currentCardIndex >= cards.length) {
    alert("Congratulations! You have completed all the tasks.");
    return;
  }

  currentCard = cards[currentCardIndex];
  deck.innerHTML = currentCard.task + "<br/>" + currentCard.time + " min";
  deck.classList.add("flipped");
  startButton.style.backgroundColor = "green";

  startTimer();
}

function startTimer() {
  timerInterval = setInterval(countDown, 1000);
  startButton.removeEventListener("click", startTimer);
}

function countDown() {
  let minutes = Math.floor(currentCard.time / 60); // Calculate minutes
  let seconds = currentCard.time % 60; // Calculate remaining seconds

  // Format the time display
  let timeDisplay =
    minutes.toString().padStart(2, "0") +
    ":" +
    seconds.toString().padStart(2, "0");

  timer.textContent = timeDisplay;

  if (currentCard.time <= 0) {
    clearInterval(timerInterval);
    timer.textContent = "Time's up!";
    deck.classList.remove("flipped");
    startButton.addEventListener("click", startTimer);

    if (currentCard.star) {
      let answer = confirm("Did you do your best?");
      if (answer) {
        // User did their best, award a star
        alert("Congratulations! You earned a star!");
      } else {
        // User did not do their best
        let tryAgain = confirm(
          "Always try your best! Would you like to try again?"
        );
        if (tryAgain) {
          // Restart the game
          currentCardIndex = 0;
          flipCard();
        }
      }
    }

    // Move to the next card
    currentCardIndex++;
  }

  // Decrement the time by 1 minute
  currentCard.time -= 60;
}

deck.addEventListener("click", flipCard);

startButton.addEventListener("click", startTimer);
