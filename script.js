let startBtn = document.getElementById('button')
let buttonContainer = document.getElementById('buttonContainer')
let countdown = document.getElementById('countdown');
let resultNumber = 0
let forAnswerAgain = [];


function start(){
    resultNumber = 0;
    forAnswerAgain = [];
    buttonContainer.innerHTML = '<div class="countdown" id="countdown"><div class="countdown-list"></div><div class="countdown-list"></div><div class="countdown-list"></div></div>'
    
    setTimeout (function (){
        showingNumber(5, 0)
    }, 3800)
}

function showingNumber(times, index){
    if(times <= 0){
        return resultScreen();
    }
    buttonContainer.innerHTML ='<div class="numberContainer" id="numberContainer"></div>'
    let numberContainer = document.getElementById('numberContainer')
    let eachNum = getRandom(1, 10);
        numberContainer.innerText = eachNum
        resultNumber = resultNumber + eachNum
        forAnswerAgain.push(eachNum);
        setTimeout(function(){
            return showingNumber(times-1, index+1)}, 800)
}
 
function getRandom(min, max) {
    var random = Math.floor( Math.random() * (max + 1 - min) ) + min;
  
    return random;
}

function resultScreen(){
    buttonContainer.innerHTML =`<div class="numberContainer" id="numberContainer"><input type=text id='resultInput' value=''></input><input id='submit' class="submit" type=submit name="button" value="submit"></input></div>`
    let submit = document.getElementById('submit')
   
    submit.addEventListener('click', ()=>{
        let resultInput = document.getElementById('resultInput').value
        judge(resultInput)
    })
    
}

function judge(resultInput){
    resultInput = Number(resultInput)
        if(resultInput === resultNumber){
            alert('Correct')
            buttonContainer.innerHTML = `<div class='button-container' id='buttonContainer'>
            <button id='button' class='start' onclick='start()'>START</button></div>`
        } else {
            alert('What a stupid guy!')
            buttonContainer.innerHTML = `<div class='end-button-container' id='buttonContainer'>
            <button id='button' class='answerAgain' onclick='restart()'>Answer Again</button>
            <button id='button' class='nextQuestion' onclick='start()'>Next Question</button></div>`
            
        }
}

function restart(){
    buttonContainer.innerHTML = '<div class="countdown" id="countdown"><div class="countdown-list"></div><div class="countdown-list"></div><div class="countdown-list"></div></div>'
   return setTimeout (function (){
    restartHelper(forAnswerAgain.length, 0)
    }, 3800)
    
}

function restartHelper(forAnswerAgainLength, index){
    if(forAnswerAgainLength === index){
        return resultScreen();
    }
    buttonContainer.innerHTML ='<div class="numberContainer" id="numberContainer"></div>'
    let numberContainer = document.getElementById('numberContainer')
    numberContainer.innerText = forAnswerAgain[index]

        setTimeout(function(){
            return restartHelper(forAnswerAgainLength, index+1)}, 800)
}