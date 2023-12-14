let boxes = document.querySelectorAll(".box");
let resetBtn = document.querySelector(".resetBtn");
let newGameBtn = document.querySelector("#newGameBtn");
let msgContainer = document.querySelector(".msg-container");
let msg = document.querySelector("#msg");
let playerOInput = document.getElementById("player1");
let playerXInput = document.getElementById("player2");
let playerO = "";
let playerX = "";

playerOInput.addEventListener("keydown", function(event)
{
    if(event.keyCode === 13)
    {
         playerO = playerOInput.value;
        console.log("text input: " + playerO);
    }
});
playerXInput.addEventListener("keydown", function(event)
{
    if(event.keyCode === 13)
    {
         playerX = playerXInput.value;
        console.log("text input: " + playerX);
    }
});

let turn0 = true;
let count = 0; //playerX, playerO

const winPatterns = [
    [0, 1, 2],
    [0, 3, 6],
    [0, 4, 8],
    [1, 4, 7],
    [2, 5 ,8],
    [2, 4, 6],
    [3, 4, 5],
    [6, 7, 8]
];

const resetGame = () =>{
turn0 = true;
count = 0;
enableBoxes();
msgContainer.classList.add("hide");
};

boxes.forEach((box) =>{
    box.addEventListener("click", () =>{
     //   console.log("box was clicked");
       if(turn0){
        box.innerHTML = "0";
        turn0 = false;
       }
       else{
        box.innerText = "X";
        turn0 = true;
       }
       box.disabled = true;
       count++;

       let isWinner = checkWinner();
       
       if(count === 9 && !isWinner){
        gameDraw();
       }
    });
});

const gameDraw = () => {
    msg.innerText = `Game Was a Draw.`;
    msgContainer.classList.remove("hide");
    disabledBoxes();
};

const enableBoxes = () => {
    for (let box of boxes){
        box.disabled = false;
        box.innerText = "";

    }
};
const disabledBoxes = () => {
    for (let box of boxes){
        box.disabled = true;
    }
};

const showWinner = (winner) => {
    // var winner = "";
    if(winner === '0'){
        winner = playerO;
    }
    else if (winner === 'X') {
        winner = playerX;
    }
    msg.innerText =`Congratulations, Winner is ${winner}`;
    msgContainer.classList.remove("hide");
    disabledBoxes();
};


const checkWinner = () =>{
    for (let pattern of winPatterns){
        //console.log(boxes[pattern[0]],boxes[pattern[1]],boxes[pattern[2]]);
        let pos1Value = boxes[pattern[0]].innerHTML;
        let pos2Value = boxes[pattern[1]].innerHTML;
        let pos3Value = boxes[pattern[2]].innerHTML;
        
        if(pos1Value != "" && pos2Value != "" && pos3Value !="")
        {
            if(pos1Value === pos2Value && pos2Value === pos3Value)
            {
                console.log("winner",pos1Value);
                showWinner(pos1Value);
            }
        }
    }
};

newGameBtn.addEventListener("click",resetGame);
resetBtn.addEventListener("click",resetGame);


