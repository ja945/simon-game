let flashArr = [];
let clickedArr = [];
let lvl = 0;
let isgamestarted = false;
let lvlpassed = true;
let flashlvl = 0;

let h2 = document.querySelector("h2");
let btns = document.querySelectorAll(".btn");
let resetbtn = document.querySelector(".resetbtn");
let closeButton = document.getElementById("closebtn");
let popup = document.getElementById("myPopup");
let overlay = document.getElementById("overlay");

gameBegin(0);

function gameBegin(newlevel) {
    if (newlevel === 0) {
        flashArr = [];
    }
    clickedArr = [];
    lvl = newlevel + 1;
    h2.innerText = level ${lvl};
    console.log("level ", lvl);
    isgamestarted = true;
    let randno = Math.floor(Math.random() * 4) + 1;
    flash(500, "redd", randno);
    flashArr.push(randno);
    closePopup();
    resetbtn.removeEventListener("click", resethandler);
    resetclk();
    clickAction();
}

function clickAction() {
    btns.forEach((btn) => {
        btn.addEventListener("click", clickhandler);
    });
}

function showPopup() {
    overlay.style.display = "block";
    setTimeout(() => {
      closePopup();
    }, 2000);
}

function closePopup() {
    overlay.style.display = "none";
    console.log("button clicked");
}
closeButton.addEventListener("click", closePopup);

window.addEventListener("keydown", function(event) {
  if (event.key === "Escape") {
    closePopup();
  }
});


window.onload = showPopup;
window.onclick = closePopup;
if (closeButton) {
    closeButton.addEventListener("click", function() {
      console.log("b");
        closePopup();
    });
} else {
    console.error("Close button not found!");
}

function resetclk() {
    resetbtn.addEventListener("click", resethandler);
}

function resethandler() {
    resetbtn.style.backgroundColor = "yellow";
    resetbtn.style.color = "black";
    setTimeout(() => {
        resetbtn.style.backgroundColor = "rgba(125, 125, 245, 0.536)";
        resetbtn.style.color = "white";
    }, 200);
    gameBegin(0);
    console.log("game reseted");
}

function clickhandler(evt) {
    console.log("btn clicked", evt.target.id);
    clickedArr.push(parseInt(evt.target.id));
    flash(100, "cyan", parseInt(evt.target.id));

    if (clickedArr.length <= lvl) {
        let count = 0;

        for (let i = 0; i < clickedArr.length; i++) {
            if (clickedArr[i] === flashArr[i]) {
                count++;
            } else {
                console.log("game over");
                h2.innerText = You Lost in level ${lvl};
                document.body.style.backgroundColor = "red";
                setTimeout(() => {
                    document.body.style.backgroundColor = "#323232";
                }, 500);

                btns.forEach((btn) => {
                    btn.removeEventListener("click", clickhandler);
                });
            }
        }

        if (count === lvl) {
            console.log("Level passed");
            if (lvl === 4) {
                console.log("Game completed");
                celebrations();
            } else {
                setTimeout(() => {
                    gameBegin(lvl);
                }, 1000);
            }
        }
    }
}

function flash(delay, clr, x) {
    let flashbtn = document.getElementById(${x});
    flashbtn.classList.add(clr);
    setTimeout(() => {
        flashbtn.classList.remove(clr);
    }, delay);
}

function celebrations() {
    changebg("green", 500, () => {
        changebg("grey", 500, () => {
            changebg("yellow", 500, () => {
                changebg("purple", 500, () => {
                    changebg("#323232", 500);
                });
            });
        });
    });
}

function changebg(clr, delay, callback) {
    let bdy = document.body;
    setTimeout(() => {
        bdy.style.backgroundColor = clr;
        if (typeof callback === "function") {
            callback();
        }
    }, delay);
}
