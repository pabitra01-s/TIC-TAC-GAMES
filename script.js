 let boxes = document.querySelectorAll(".box");
let resetBtn = document.querySelector("#reset-btn");
let msg = document.querySelector("#msg");
let line = document.querySelector(".line");

let turnO = true;

const winPatterns = [
    { combo: [0,1,2], top: "10%", left: "0%", rotate: "0deg" },
    { combo: [3,4,5], top: "50%", left: "0%", rotate: "0deg" },
    { combo: [6,7,8], top: "90%", left: "0%", rotate: "0deg" },

    { combo: [0,3,6], top: "50%", left: "-33%", rotate: "90deg" },
    { combo: [1,4,7], top: "50%", left: "0%", rotate: "90deg" },
    { combo: [2,5,8], top: "50%", left: "33%", rotate: "90deg" },

    { combo: [0,4,8], top: "50%", left: "0%", rotate: "45deg" },
    { combo: [2,4,6], top: "50%", left: "0%", rotate: "-45deg" }
];

boxes.forEach(box => {
    box.addEventListener("click", () => {
        if (turnO) {
            box.innerText = "O";
            box.style.color = "#00e5ff"; // neon blue O
            turnO = false;
        } else {
            box.innerText = "X";
            box.style.color = "#ff4c4c"; // dark red X
            turnO = true;
        }
        box.disabled = true;
        checkWinner();
    });
});

function checkWinner() {
    for (let pattern of winPatterns) {
        let [a, b, c] = pattern.combo;

        if (
            boxes[a].innerText !== "" &&
            boxes[a].innerText === boxes[b].innerText &&
            boxes[b].innerText === boxes[c].innerText
        ) {
            showWinner(boxes[a].innerText, pattern);
            disableBoxes();
            return;
        }
    }
}

function showWinner(winner, pattern) {
    msg.innerText = `🎉 Winner is ${winner} 🎉`;
    msg.classList.add("win");

    line.style.width = "100%";
    line.style.top = pattern.top;
    line.style.left = pattern.left;
    line.style.transform = `rotate(${pattern.rotate})`;
}

function disableBoxes() {
    boxes.forEach(box => box.disabled = true);
}

function resetGame() {
    turnO = true;
    msg.innerText = "";
    msg.classList.remove("win");
    line.style.width = "0";

    boxes.forEach(box => {
        box.innerText = "";
        box.disabled = false;
        box.style.color = "white";
    });
}

resetBtn.addEventListener("click", resetGame);


