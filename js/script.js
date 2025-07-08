//Global Variable(s)
let trueAnswer;
let trueAr = [];
let userTries = 0;

//Reset Game
function resetGame(){
    userTries = 0;
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
    currentInput = "";
    myStartGame();
}

//DOM Challenge
function updateTextInput(val,id) {
    document.getElementById(id).value=val;
    for (let i = 1; i < 5; i++){
        let x = 'textInput' + i;
            if (i === 1){
                answer = "" + document.getElementById(x).value;
            }else{
                answer = answer + document.getElementById(x).value;
            }
        }
    document.getElementById('userAnswer').innerHTML = answer;
}

//user submit answer
function mySubmitFunction() {
    let ar = [];
    let resultcomment = "";
    let answer = currentInput;

    // Convert string to array of numbers
    for (let i = 0; i < 4; i++) {
        ar[i] = parseInt(currentInput[i]);
    }

    document.getElementById('userAnswer').innerHTML = answer;

    //compare trueAnswer, correct digit(s), incorrect digit(s),correct digit(s) in worng position
    let correctPlaceCount = 0;
    let wrongPlaceCount = 0;

    let trueUsed = new Array(4).fill(false); // Tracks which digits in trueAr are matched
    let userUsed = new Array(4).fill(false); // Tracks which digits in user guess are matched

    // First: check exact matches
    for (let i = 0; i < 4; i++) {
        if (ar[i] === trueAr[i]) {
            correctPlaceCount++;
            trueUsed[i] = true;
            userUsed[i] = true;
        }
    }

    // Second: check for correct digits in wrong places
    for (let i = 0; i < 4; i++) {
        if (userUsed[i]) continue;

        for (let j = 0; j < 4; j++) {
            if (!trueUsed[j] && ar[i] === trueAr[j]) {
                wrongPlaceCount++;
                trueUsed[j] = true;
                break;
            }
        }
    }

    let incorrectCount = 4 - correctPlaceCount - wrongPlaceCount;
    userTries = userTries + 1;
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
    currentInput = "";
    //check if wins
    if(correctPlaceCount === 4){
        document.getElementById('result').innerHTML = "🎉🎉 You have access the hidden code! 🎉🎉"
        resultcomment += ", You have access the hidden code!"
        document.getElementsByClassName("gifLayoutBox")[0].style.display = 'flex';
        currentInput = "Unlocked";
        
    }else{
        document.getElementById('result').innerHTML = ""
    }
    document.getElementById('tries').innerHTML = "Attempt: " + userTries


    let listResult = document.getElementsByClassName('resultOverflow')[0];

    let newListItem = document.createElement('p');
    newListItem.textContent = answer + resultcomment
    if(correctPlaceCount === 4){
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
        showCustomConfirm("Start a new game?", resetGame);
  };

  controlRow.appendChild(undoBtn);
  controlRow.appendChild(newGameBtn);

  // Append both rows to wrapper
  wrapper.appendChild(digitRow);
  wrapper.appendChild(controlRow);

  // Add wrapper to pad container
  pad.appendChild(wrapper);
}

let currentInput = ""; // to store the digits user pressed

function pressDigit(digit) {
  if (currentInput.length < 3) {
    currentInput += digit;
    updateDisplay();
  }else{
    currentInput += digit;
    mySubmitFunction();
    updateDisplay();
  }
}

function undoDigit() {
  // Remove the last digit
  currentInput = currentInput.slice(0, -1);
  updateDisplay();
}

function updateDisplay() {
  // For example, display the current input in an element with id 'userAnswer' or 'liveInputDisplay'
  document.getElementById('userAnswer').innerHTML = currentInput || "0";
}


function showCustomConfirm(message, onConfirm) {
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

    const yesBtn = document.createElement("button");
    yesBtn.textContent = "Yes";
    yesBtn.className = "yes-button";
    yesBtn.onclick = () => {
        onConfirm();
        document.body.removeChild(overlay);
    };

    const noBtn = document.createElement("button");
    noBtn.textContent = "No";
    noBtn.className = "no-button";
    noBtn.onclick = () => {
        document.body.removeChild(overlay);
    };

    btnContainer.appendChild(yesBtn);
    btnContainer.appendChild(noBtn);
    dialog.appendChild(msg);
    dialog.appendChild(btnContainer);
    overlay.appendChild(dialog);
    document.body.appendChild(overlay);

    // Click outside the dialog = cancel
    overlay.addEventListener("click", () => {
        document.body.removeChild(overlay);
    });

    // Prevent overlay click from firing when clicking inside dialog
    dialog.addEventListener("click", (e) => {
        e.stopPropagation();
    });
}


//start, random generate answer
function myStartGame(){
    // Call this once after DOM is ready
    // Prevent duplicate inputs
    if (document.getElementById("inputContainer").childElementCount === 0) {
        createDigitPad("inputContainer");
    }
    document.getElementsByClassName('secondScene')[0].style.display = 'block';
    // Allows digits 0–9
    for (let i = 0; i < 4 ; i++){
        let x = Math.floor(Math.random() * 10);
        trueAr[i] = x;
            if (i===0){
                trueAnswer = "" + x;
            }else{
                trueAnswer = trueAnswer + x;
            }
        }
    document.getElementsByClassName('firstScene')[0].style.display = 'none';
    document.getElementsByClassName('headerLayout')[0].style.height = 'auto';
    document.getElementsByClassName("gifLayoutBox")[0].style.display = 'none';
    
}