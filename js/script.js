
const gameState = {
    trueAnswer: null,   // your solution answer
    trueAr: [],
    tries: 0,
    isGameWon: false,
    easterEggDifficultyUnlock: false,
    currentInput: "",
};



//Reset Game
function resetGame(difficultyDigits){
    gameState.tries = 0;
    document.getElementById('tries').innerHTML = ""
    document.getElementById('correctd').innerHTML = ""
    document.getElementById('incorrectd').innerHTML = ""
    document.getElementById('result').innerHTML = ""
    let listResult = document.getElementsByClassName('resultOverflow')[0]
    let newListItem = document.createElement('p');
    newListItem.textContent = "--------------------Restart Game--------------------"
    newListItem.style.color = "#EBA286";
    listResult.appendChild(newListItem);
    listResult.scrollTop = listResult.scrollHeight;
    gameState.currentInput = "";
    gameState.isGameWon = false;
    myStartGame(difficultyDigits);
}

//user submit answer
function mySubmitFunction() {
    let ar = [];
    let resultcomment = "";
    let answer = gameState.currentInput;

    // Convert string to array of numbers
    for (let i = 0; i < gameState.trueAr.length; i++) {
        ar[i] = parseInt(gameState.currentInput[i]);
    }

    document.getElementById('userAnswer').innerHTML = answer;

    //compare trueAnswer, correct digit(s), incorrect digit(s),correct digit(s) in worng position
    let correctPlaceCount = 0;
    let wrongPlaceCount = 0;

    let trueUsed = new Array(gameState.trueAr.length).fill(false); // Tracks which digits in trueAr are matched
    let userUsed = new Array(gameState.trueAr.length).fill(false); // Tracks which digits in user guess are matched

    // First: check exact matches
    for (let i = 0; i < gameState.trueAr.length; i++) {
        if (ar[i] === gameState.trueAr[i]) {
            correctPlaceCount++;
            trueUsed[i] = true;
            userUsed[i] = true;
        }
    }

    // Second: check for correct digits in wrong places
    for (let i = 0; i < gameState.trueAr.length; i++) {
        if (userUsed[i]) continue;

        for (let j = 0; j < gameState.trueAr.length; j++) {
            if (!trueUsed[j] && ar[i] === gameState.trueAr[j]) {
                wrongPlaceCount++;
                trueUsed[j] = true;
                break;
            }
        }
    }

    let incorrectCount = gameState.trueAr.length - correctPlaceCount - wrongPlaceCount;
    gameState.tries = gameState.tries + 1;
    //display comment
    if(correctPlaceCount){
        document.getElementById('correctd').innerHTML = "✅ Correct Digit(s) in Correct Position: " + correctPlaceCount
        resultcomment = ", Correct Digit(s) in Correct Position: " + correctPlaceCount
    }else{
        document.getElementById('correctd').innerHTML = ""
        resultcomment = ""
    }
    
    let incorrectdOutput = "";

    if (wrongPlaceCount) {
    incorrectdOutput += "🔁 Correct Digit(s) in Wrong Position: " + wrongPlaceCount;
    resultcomment += ", Correct Digit(s) in Wrong Position: " + wrongPlaceCount;
    }

    if (incorrectCount) {
    if (incorrectdOutput.length > 0) incorrectdOutput += "<br>";
    incorrectdOutput += "❌ Incorrect Digit(s): " + incorrectCount;
    resultcomment += ", Incorrect Digit(s): " + incorrectCount;
    }

    document.getElementById('incorrectd').innerHTML = incorrectdOutput;
    gameState.currentInput = "";
    //check if wins
    if(correctPlaceCount === gameState.trueAr.length){
        document.getElementById('result').innerHTML = "🎉🎉 You have access the hidden code! 🎉🎉"
        resultcomment += ", You have access the hidden code!"
        document.getElementsByClassName("gifLayoutBox")[0].style.display = 'flex';
        gameState.currentInput = "Unlocked";
        gameState.isGameWon = true;
        
    }else{
        document.getElementById('result').innerHTML = ""
    }
    document.getElementById('tries').innerHTML = "Attempt: " + gameState.tries


    let listResult = document.getElementsByClassName('resultOverflow')[0];

    let newListItem = document.createElement('p');
    newListItem.textContent = answer + resultcomment
    if(correctPlaceCount === gameState.trueAr.length){
        newListItem.style.color = "Green";
    }else{
        newListItem.style.color = "Red";
    }
    listResult.appendChild(newListItem);
    listResult.scrollTop = listResult.scrollHeight;
}

//modal Hint Open
let modal = document.getElementById("modalBackground")

function myHintFunction(){
    modal.style.display = "block";
}
//modal Hint Close
document.getElementsByClassName("close")[0].onclick = modalCloseFunction;

function modalCloseFunction(){
    modal.style.display = "none";
}

window.onclick = function(event) {
    if (event.target == modal) {
      modal.style.display = "none";
    }
}


function createDigitPad(containerId = "digitPad") {
    const pad = document.getElementById(containerId);
    pad.innerHTML = ""; // Clear any existing buttons

    // Create wrapper container for rows
    const wrapper = document.createElement("div");
    wrapper.className = "padWrapper"; // Vertical stack (column)

    // First row: 0–9 buttons
    const digitRow = document.createElement("div");
    digitRow.className = "digitRow";

    for (let i = 0; i <= 9; i++) {
        const btn = document.createElement("button");
        btn.type = "button";
        btn.className = "numberButton";
        btn.textContent = i;
        btn.onclick = () => pressDigit(i);
        digitRow.appendChild(btn);
    }

    // Second row: Undo and New Game
    const controlRow = document.createElement("div");
    controlRow.className = "controlRow";

    const undoBtn = document.createElement("button");
    undoBtn.type = "button";
    undoBtn.className = "undoRestartButton";
    undoBtn.textContent = "↩️ Undo";
    undoBtn.onclick = undoDigit;

    const newGameBtn = document.createElement("button");
    newGameBtn.type = "button";
    newGameBtn.className = "undoRestartButton";
    newGameBtn.textContent = "🔄 New Game";
    newGameBtn.onclick = function () {
        showCustomConfirm(
            "Start a New Game?",
            () => resetGame(4),  // Easy
            () => resetGame(6),  // Hard
            () => resetGame(8)   // Extreme
        );
    };
    controlRow.appendChild(undoBtn);
    controlRow.appendChild(newGameBtn);

    // Append both rows to wrapper
    wrapper.appendChild(digitRow);
    wrapper.appendChild(controlRow);

    // Add wrapper to pad container
    pad.appendChild(wrapper);
}

function pressDigit(digit) {
    // If the game is already won and easter egg has been triggered, prevent any further input
    if (gameState.currentInput === "Unlock1218") {
        return; // Block further input
    }

    // If game is won and user is typing "Unlock..." to trigger easter egg
    if (gameState.isGameWon && gameState.currentInput.startsWith("Unlock")) {
        gameState.currentInput += digit;

        if (gameState.currentInput === "Unlock1218") {
        triggerEasterEgg(); // Trigger secret function
        }

        updateDisplay(); // Only update if not yet fully "Unlock1218"
        return;
    }

    // Regular game flow
    if (gameState.currentInput.length < (gameState.trueAr.length - 1)) {
        gameState.currentInput += digit;
        updateDisplay();
    } else {
        gameState.currentInput += digit;
        mySubmitFunction();  // Handle normal submission
        updateDisplay();
    }
}
function undoDigit() {
    // If the game is already won and easter egg has been triggered, prevent any further input
    if (gameState.currentInput === "Unlock1218") {
        return; // Block further input
    }
    
    // Remove the last digit
    gameState.currentInput = gameState.currentInput.slice(0, -1);
    updateDisplay();
}

function updateDisplay() {
    // For example, display the current input in an element with id 'userAnswer' or 'liveInputDisplay'
    document.getElementById('userAnswer').innerHTML = gameState.currentInput || "0";
}


function showCustomConfirm(message, onEasy, onHard, onExtreme) {
    // Create overlay
    const overlay = document.createElement("div");
    overlay.className = "confirm-overlay";

    // Create dialog
    const dialog = document.createElement("div");
    dialog.className = "confirm-dialog";

    const msg = document.createElement("p");
    msg.textContent = message;

    const btnContainer = document.createElement("div");
    btnContainer.className = "confirm-buttons";

    const easyBtn = document.createElement("button");
    easyBtn.textContent = "Easy";
    easyBtn.className = "easy-button";
    easyBtn.onclick = () => {
        onEasy();
        document.body.removeChild(overlay);
    };

    const hardBtn = document.createElement("button");
    hardBtn.textContent = "Hard";
    hardBtn.className = "hard-button";
    hardBtn.onclick = () => {
        onHard();
        document.body.removeChild(overlay);
    };

    const backContainer = document.createElement("div");
    backContainer.className = "confirm-back-container";

    const backBtn = document.createElement("button");
    backBtn.textContent = "Back";
    backBtn.className = "back-button";
    backBtn.onclick = () => {
        document.body.removeChild(overlay);
    };

    const closeBtn = document.createElement("span");
    closeBtn.className = "closeRestart";
    closeBtn.innerHTML = "&times;";
    closeBtn.onclick = () => {
        document.body.removeChild(overlay);
    };

    // Assemble
    btnContainer.appendChild(easyBtn);
    btnContainer.appendChild(hardBtn);

    if(gameState.easterEggDifficultyUnlock){
        const extremeBtn = document.createElement("button");
        extremeBtn.textContent = "Extreme";
        extremeBtn.className = "extreme-button";
        extremeBtn.onclick = () => {
            onExtreme();
            document.body.removeChild(overlay);
        };
        btnContainer.appendChild(extremeBtn);
    }
    backContainer.appendChild(backBtn);

    dialog.appendChild(closeBtn);
    dialog.appendChild(msg);
    dialog.appendChild(btnContainer);
    dialog.appendChild(backContainer);

    overlay.appendChild(dialog);
    document.body.appendChild(overlay);

    // Dismiss if clicked outside
    overlay.addEventListener("click", () => {
        document.body.removeChild(overlay);
    });

    dialog.addEventListener("click", (e) => {
        e.stopPropagation();
    });
}

function triggerEasterEgg() {
    gameState.easterEggDifficultyUnlock = true;

    const legend = document.querySelector("legend");
    if (legend) {
        legend.textContent = "Unlock Lemonekko Bug🤖";
    }

    const container = document.getElementById("fireworksContainer");
    container.classList.remove("hidden");
    container.innerHTML = "";

    // Trigger 5 bursts at random locations with delay
    for (let i = 0; i < 7; i++) {
        setTimeout(() => {
        createFireworkBurst(container); // each burst has its own random position
        }, i * 400); // stagger every 400ms
    }

    // Hide fireworks after all are done
    setTimeout(() => {
        container.classList.add("hidden");
        container.innerHTML = "";
    }, 7 * 400 + 1000); // give extra time for the last burst to fade out
}

function createFireworkBurst(container) {
  const colors = ["#FF2D00", "#FF931E", "#FFC700", "#12D8F4", "#A516BA"];

  const centerX = Math.random() * window.innerWidth * 0.8 + window.innerWidth * 0.1;
  const centerY = Math.random() * window.innerHeight * 0.8 + window.innerHeight * 0.1;

    for (let i = 0; i < 40; i++) {
        const particle = document.createElement("div");
        particle.className = "firework-particle";

        const angleDeg = Math.random() * 360;

        particle.style.left = `${centerX}px`;
        particle.style.top = `${centerY}px`;
        particle.style.setProperty("--angle", `${angleDeg}deg`);
        particle.style.setProperty("--color", colors[Math.floor(Math.random() * colors.length)]);

        container.appendChild(particle);
    }
}

//start, random generate answer
function myStartGame(difficultyDigits){
    // Call this once after DOM is ready
    // Prevent duplicate inputs
    if (document.getElementById("inputContainer").childElementCount === 0) {
        createDigitPad("inputContainer");
    }

    gameState.trueAr.length = 0; // reset array completely
    // Reset trueAnswer to empty string before generating new number:
    gameState.trueAnswer = "";

    document.getElementsByClassName('secondScene')[0].style.display = 'block';
    // Allows digits 0–9
    // Generate new digits based on difficultyDigits
    for (let i = 0; i < difficultyDigits; i++) {
        let x = Math.floor(Math.random() * 10);
        gameState.trueAr[i] = x;
        gameState.trueAnswer += x;  // concatenate as string
    }
        document.getElementById('userAnswer').innerHTML = "0".repeat(difficultyDigits);

    document.getElementsByClassName('firstScene')[0].style.display = 'none';
    document.getElementsByClassName('headerLayout')[0].style.height = 'auto';
    document.getElementsByClassName("gifLayoutBox")[0].style.display = 'none';
}