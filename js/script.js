//Global Variable(s)
let trueAnswer;
let trueAr = [];
let countZero;
let countOne;
let check = {};
//DOM Challenge
function updateTextInput(val,id) {
    document.getElementById(id).value=val; 
}

//user submit answer
function mySubmitFunction() {
    let ar = [];
    let answer;
    let userZero;
    let userOne;
    for (let i = 1; i < 5; i++){
        let x = 'textInput' + i;
        ar[i-1] = parseInt(document.getElementById(x).value);
            if (i===1){
                answer = "" + document.getElementById(x).value;
            }else{
                answer = answer + document.getElementById(x).value;
            }
        }
    document.getElementById('userAnswer').innerHTML = answer;

    //check user how many 0 and 1
    check = {};
    for (i = 0; i < ar.length; i++){
        if (check[ar[i]]){
            check[ar[i]] += 1;
        } else {
            check[ar[i]] = 1;
        }
    }
    check[0] = userZero;
    check[1] = userOne;
    console.log("userZero:" + userZero);
    console.log("userOne:" + userOne);
    console.log(answer);
    console.log(ar);
    //compare trueAnswer, correct digit(s), incorrect digit(s),correct digit(s) in worng position
    let cd = 0;
    let incd = 0;   
    for (i = 0; i < 4; i++){
        if(ar[i] === trueAr[i]){
            cd = cd + 1;
        }else{
            incd = incd + 1;
        }
    }
    if(cd != 0){
    document.getElementById('correctd').innerHTML = "Correct Digit(s): " + cd
    }   
    if(incd <= 2 && countZero === userZero && countOne === userOne && cd != 4){
        document.getElementById('incorrectd').innerHTML = "Correct Digit(s) in wrong position: " + incd
    }else if(incd != 0){
        document.getElementById('incorrectd').innerHTML = "Incorrect Digit(s): " + incd
    }
}

//start, random generate answer
function myStartGame(){
    check = {};
    //Math.floor(Math.random() *2)
    for (let i = 1; i < 5 ; i++){
        let x = Math.floor(Math.random() *2);
        trueAr[i-1] = x;
            if (i===1){
                trueAnswer = "" + x;
            }else{
                trueAnswer = trueAnswer + x;
            }
            if (check[trueAr[i-1]]){
                check[trueAr[i-1]] += 1;
            } else {
                check[trueAr[i-1]] = 1;
            }
        }
    check[0] = countZero;
    check[1] = countOne;    
    console.log(trueAnswer);
    console.log(trueAr);
    console.log("countZ:" + countZero);
    console.log("countOne:" + countOne);
}