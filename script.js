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
let redrawButton = document.getElementById("redrawButton");
let timer = document.getElementById("timer");
let instructions = document.getElementById("instructions");
let stars = document.querySelectorAll(".emptyStar");

startButton.style.display = "none";
redrawButton.style.display = "none";

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

  let cardStar = discardPile.querySelector(".cardStar");
  cardStar.innerHTML = "";

  if (currentCard.star) {
    let star = document.createElement("div");
    star.className = "star";
    star.textContent = "☆";
    cardStar.appendChild(star);
  }

  startButton.style.display = "inline-block";

  redrawButton.style.display = [...stars].some((star) =>
    star.classList.contains("fullStar")
  )
    ? "block"
    : "none";

  startButton.classList.add("active");

  instructions.textContent = "Click Start to begin the task.";

  discardPile.classList.toggle("flipped");

  startTime = currentCard.time * 60;
}

function useStarToRedraw() {
  let fullStars = [...stars].filter((star) =>
    star.classList.contains("fullStar")
  );

  redrawButton.style.display = [...stars].some((star) =>
    star.classList.contains("fullStar")
  )
    ? "inline-block"
    : "none";

  if (fullStars.length > 0) {
    redrawButton.classList.add("active");
    fullStars[0].classList.remove("fullStar");
    fullStars[0].classList.add("emptyStar");
    currentCardIndex = Math.floor(Math.random() * cards.length);
    flipCard();
  }
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

redrawButton.addEventListener("click", useStarToRedraw);

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
redrawButton.addEventListener("click", useStarToRedraw);
