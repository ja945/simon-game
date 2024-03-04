let gameSeq = [];
let userSeq = [];

let btns = ["yellow", "red", "purple", "green"];

let started = false;
let level = 0;

let h2 = document.querySelector("h2");
let close = document.querySelector("closebtn");
document.addEventListener("keypress", function (event) {
  if (!started) {
    console.log("Game started");
    started = true;
    levelUp();
    h2.innerText = `Game started! Level ${level}`;
  }
});



function gameFlash(btn) {
  btn.classList.add("flash");
  setTimeout(function () {
    btn.classList.remove("flash");
  }, 250);
}

function userFlash(btn) {
  btn.classList.add("userflash");
  setTimeout(function () {
    btn.classList.remove("userflash");
  }, 250);
}


function levelUp() {
  userSeq = [];
  level++;
  h2.innerText = `Level ${level}`;
  let randIdx = Math.floor(Math.random() * 4)+1;
  let randColor = btns[randIdx];
  let randBtn = document.querySelector(`.${randColor}`);
  gameSeq.push(randColor);
  console.log(gameSeq);
  gameFlash(randBtn);
  setTimeout(() => {
    h2.innerText = "Press any key to start the game";
  }, 1000); // Reset the message after 1 second
}


function checkAns(idx) {
  let c =0;
  if (userSeq[idx] === gameSeq[idx]) {
    if (userSeq.length == gameSeq.length) {
      // setTimeout(levelUp, 1000);
      h2.innerHTML = `level {c}`
    }
  } else {
    h2.innerHTML = `Game Over! Your score was <b>${level}</b> <br> Press any key to start.`;
    document.querySelector("body").style.backgroundColor = "red";
    setTimeout(function () {
      document.querySelector("body").style.backgroundColor = "white";
    }, 150);
    reset();
  }
}
function btnPress() {
  let btn = this;
  gameFlash(btn); // Display flash when button is clicked
  userFlash(btn);

  userColor = btn.getAttribute("id");
  userSeq.push(userColor);

  checkAns(userSeq.length - 1);
}

let allBtns = document.querySelectorAll(".btn");
for (btns of allBtns) {
  btns.addEventListener("click", btnPress);
}

// Select the reset button
let resetButton = document.querySelector(".resetbtn");

resetButton.addEventListener("click", function() {
  console.log("button clicked");
  reset();
});

// Reset function
function reset() {
  started = false;
  gameSeq = [];
  userSeq = [];
  level = 0;
  // h2.innerText = "Press any key to start the game";
  document.querySelector("body").style.backgroundColor = "red";
}

function myFunction() {
  var popup = document.getElementById("myPopup");
  popup.classList.toggle("show");
}
function closePopup() {
  let popup = document.getElementById("myPopup");
  if (popup) {
    popup.style.display = "none";
  } else {
    console.error("Popup not found!");
  }
}
let closeButton = document.getElementById("close");
if (closeButton) {
  closeButton.addEventListener("click", function() {
    closePopup();
  });
} else {
  console.error("Close button not found!");
}
