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
let discardPile = document.getElementById("discardPile");
let startButton = document.getElementById("startButton");
let timer = document.getElementById("timer");
let instructions = document.getElementById("instructions");
let stars = document.querySelectorAll(".emptyStar");

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
  currentCard = cards[currentCardIndex];

  discardPile.querySelector(".task").textContent = currentCard.task;
  discardPile
    .querySelector(".front")
    .setAttribute("data-minutes", currentCard.time);

  let timeDisplays = discardPile.querySelectorAll(".time");
  timeDisplays.forEach(
    (timeDisplay) => (timeDisplay.textContent = currentCard.time)
  );

  if (currentCard.star) {
    let star = document.createElement("div");
    star.className = "star";
    star.textContent = "☆";
    discardPile.querySelector(".card-contents").appendChild(star);
  }

  startButton.style.display = "block";
  startButton.style.backgroundColor = "blue";

  instructions.textContent = "Click Start to begin the task.";

  discardPile.classList.toggle("flipped");

  startTime = currentCard.time * 60;
}

function startTimer() {
  if (!isTimerStarted) {
    isTimerStarted = true;
    timerInterval = setInterval(countDown, 1000);
  }
  startButton.style.display = "none";
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
    yesNoModal.style.display = "block";

    setTimeout(function () {
      if (currentCard.star) {
        showYesNoDialog(
          "Did you do your best?",
          function () {
            alert("Congratulations! You earned a star!");
            stars[currentCardIndex].classList.remove("emptyStar");
            stars[currentCardIndex].classList.add("fullStar");
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
