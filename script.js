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
let isTimerStarted = false;
let startTime;

let yesNoModal = document.getElementById("yesNoModal");
let yesButton = document.getElementById("yesButton");
let noButton = document.getElementById("noButton");
let modalText = document.getElementById("modalText");

function flipCard() {
  if (currentCardIndex >= cards.length) {
    alert("Congratulations! You have completed all the tasks.");
    return;
  }

  currentCard = cards[currentCardIndex];
  deck.innerHTML = currentCard.task + "<br/>" + currentCard.time + " min";
  deck.classList.add("flipped");
  startButton.style.backgroundColor = "green";

  startTime = currentCard.time * 60;
}

function startTimer() {
  if (!isTimerStarted) {
    isTimerStarted = true;
    timerInterval = setInterval(countDown, 1000);
  }
  startButton.removeEventListener("click", startTimer);
}

function countDown() {
  let minutes = Math.floor(startTime / 60);
  let seconds = startTime % 60;

  let timeDisplay =
    minutes.toString().padStart(2, "0") +
    ":" +
    seconds.toString().padStart(2, "0");

  timer.textContent = timeDisplay;

  if (startTime <= 0) {
    clearInterval(timerInterval);
    timer.textContent = "Time's up!";
    deck.classList.remove("flipped");
    startButton.addEventListener("click", startTimer);

    setTimeout(function () {
      if (currentCard.star) {
        showYesNoDialog(
          "Did you do your best?",
          function () {
            alert("Congratulations! You earned a star!");
            currentCardIndex++;
            flipCard();
          },
          function () {
            showYesNoDialog(
              "Always try your best! Would you like to try again?",
              function () {
                currentCardIndex = 0;
                flipCard();
              },
              function () {
                currentCardIndex++;
                flipCard();
              }
            );
          }
        );
      } else {
        currentCardIndex++;
        flipCard();
      }
    }, 1000);

    startTime = currentCard.time * 60;
  }

  startTime--;
}

function showYesNoDialog(text, yesCallback, noCallback) {
  modalText.textContent = text;
  yesButton.onclick = function () {
    yesNoModal.style.display = "none";
    yesCallback();
  };
  noButton.onclick = function () {
    yesNoModal.style.display = "none";
    noCallback();
  };
  yesNoModal.style.display = "block";
}

deck.addEventListener("click", flipCard);
startButton.addEventListener("click", startTimer);
