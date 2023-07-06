const cards = [
  { task: "Clean your room", time: 15, star: true },
  { task: "Watch one show of parent's choice", time: 30, star: false },
  { task: "Read a chapter of your favorite book", time: 20, star: true },
  { task: "Play a math game online", time: 15, star: true },
  { task: "Draw a picture of your favorite animal", time: 30, star: true },
  { task: "Help mom or dad with what they're doing", time: 20, star: true },
  {
    task: "Spend time practicing a sport of your choice",
    time: 20,
    star: true,
  },
  { task: "Write a letter to a family member", time: 15, star: true },
  { task: "Do stretching exercises", time: 10, star: true },
  { task: "Help fold laundry", time: 15, star: true },
  { task: "Practice writing cursive", time: 15, star: true },
  { task: "Brush your teeth and floss", time: 10, star: true },
  { task: "Play a board game with a family member", time: 20, star: true },
  {
    task: "Spend time learning a new language on a learning app",
    time: 15,
    star: true,
  },
  { task: "Do a meditation", time: 10, star: true },
  { task: "Go outside and play", time: 20, star: true },
  { task: "Help dad or mom wash the dishes", time: 15, star: true },
  { task: "Write a short story", time: 20, star: true },
  { task: "Make your bed", time: 10, star: true },
  { task: "Listen to an educational podcast", time: 20, star: true },
  { task: "Practice a musical instrument", time: 20, star: true },
  { task: "Do a puzzle", time: 15, star: true },
  { task: "Plant a seed in the garden", time: 15, star: true },
  { task: "Do science experiments", time: 15, star: true },
  { task: "Feed your pet", time: 10, star: true },
  { task: "Practice multiplication tables", time: 15, star: true },
  {
    task: "Write three things you're grateful for today",
    time: 10,
    star: true,
  },
  { task: "Help set the table for dinner", time: 10, star: true },
  {
    task: "Spend time learning about a historical event",
    time: 15,
    star: true,
  },
  { task: "Organize your toys", time: 15, star: true },
  { task: "Do jumping jacks", time: 10, star: true },
  { task: "Write and perform a small play", time: 20, star: true },
  { task: "Play a memory card game", time: 15, star: true },
  { task: "Help dad or mom vacuum the house", time: 15, star: true },
  { task: "Make a DIY craft", time: 20, star: true },
  { task: "Draw a map of your neighborhood", time: 20, star: true },
  { task: "Water the plants", time: 10, star: true },
  { task: "Read a science article", time: 20, star: true },
  { task: "Spend time doing a painting", time: 15, star: true },
  { task: "Learn a new magic trick", time: 20, star: true },
  { task: "Have a dance party in your room", time: 20, star: true },
  { task: "Help make a grocery list", time: 15, star: true },
  { task: "Build a fort out of blankets", time: 30, star: true },
  { task: "Practice spelling words", time: 15, star: true },
  { task: "Learn to sew a button", time: 20, star: true },
  { task: "Spend time on a nature walk", time: 20, star: true },
  { task: "Do a crossword puzzle", time: 15, star: true },
  { task: "Help sort recycling", time: 10, star: true },
  { task: "Listen to a chapter of an audiobook", time: 20, star: true },
  {
    task: "Spend time learning about a planet of your choice",
    time: 15,
    star: true,
  },
  { task: "Bake cookies with mom or dad", time: 30, star: true },
  { task: "Write a poem about your favorite thing", time: 20, star: true },
  { task: "Play a video game", time: 15, star: false },
  { task: "Do yoga for kids", time: 10, star: true },
  { task: "Learn a new dance routine", time: 20, star: true },
  { task: "Help prepare your lunch for tomorrow", time: 15, star: true },
];

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
  currentCard.time--;
  timer.textContent = currentCard.time + " min";

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
}

deck.addEventListener("click", flipCard);

startButton.addEventListener("click", startTimer);
