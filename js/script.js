//DOM Challenge
function updateTextInput(val,id) {
    document.getElementById(id).value=val; 
}

function mySubmitFunction() {
    let ar = [];
    let answer;
    for (let i = 1; i < 5 ; i++){
        let x = 'textInput' + i;
        ar[i-1] = document.getElementById(x).value;
            if (i===1){
                answer = document.getElementById(x).value;
            }else{
                answer = answer + document.getElementById(x).value;
            }
        }
    document.getElementById('userAnswer').innerHTML = answer;
  }