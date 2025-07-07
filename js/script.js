//Global Variable(s)
let trueAnswer;
let trueAr = [];
let tries = 0;

//Reset Game
function resetGame(){
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
    document.getElementById("submitLayout").style.color = "#2E5266FF";
    document.getElementById("submitLayout").hidden = false;
    document.getElementById("submitLayout").disabled = false;
    tries = 0;
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
    let answer;
    let resultcomment;
    for (let i = 1; i < 5; i++){
        let x = 'textInput' + i;
        ar[i-1] = parseInt(document.getElementById(x).value);
            if (i === 1){
                answer = "" + document.getElementById(x).value;
            }else{
                answer = answer + document.getElementById(x).value;
            }
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
    tries = tries + 1;

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

    //check if wins
    if(correctPlaceCount === 4){
        document.getElementById('result').innerHTML = "🎉🎉 You have access the hidden code! 🎉🎉"
        resultcomment += ", 🎉🎉 You have access the hidden code! 🎉🎉"
        document.getElementById("submitLayout").style.color = "green";
        document.getElementById("submitLayout").disabled = true;
        document.getElementById("submitLayout").hidden = true;
        document.getElementById("submitLayoutTwo").hidden = false;
        document.getElementsByClassName("gifLayoutBox")[0].style.display = 'flex';
    }else{
        document.getElementById('result').innerHTML = ""
    }
    document.getElementById('tries').innerHTML = "Attempt: " + tries


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


function createDigitInputs(containerId, count = 4) {
  const container = document.getElementById(containerId);

  for (let i = 1; i <= count; i++) {
    const flexBox = document.createElement('div');
    flexBox.className = 'flexBox';

    // Create <select>
    const select = document.createElement('select');
    select.onchange = function () {
      updateTextInput(this.value, `textInput${i}`);
    };

    for (let j = 0; j < 10; j++) {
      const option = document.createElement('option');
      option.value = j;
      option.textContent = j;
      select.appendChild(option);
    }

    // Create <input disabled>
    const input = document.createElement('input');
    input.type = 'text';
    input.id = `textInput${i}`;
    input.value = '0';
    input.className = 'hiddenInput';
    input.disabled = true;

    // Append to flexBox and then to container
    flexBox.appendChild(select);
    flexBox.appendChild(input);
    container.appendChild(flexBox);
  }
}

function updateTextInput(val, id) {
  document.getElementById(id).value = val;

  // Recalculate combined value
  let inputString = "";
  for (let i = 1; i <= 4; i++) {
    inputString += document.getElementById("textInput" + i).value;
  }

  // Show in display paragraph
  document.getElementById("liveInputDisplay").textContent = inputString;

  // Also update the existing userAnswer field if needed
  document.getElementById("userAnswer").innerHTML = inputString;
}


//start, random generate answer
function myStartGame(){
    // Call this once after DOM is ready
    // Prevent duplicate inputs
    if (document.getElementById("inputContainer").childElementCount === 0) {
        createDigitInputs("inputContainer");
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
    document.getElementById("submitLayoutTwo").hidden = true;
    document.getElementsByClassName("gifLayoutBox")[0].style.display = 'none';
    
}