let startBtn = document.getElementById('button')
let buttonContainer = document.getElementById('buttonContainer')
let countdown = document.getElementById('countdown');
let resultNumber = 0
let forAnswerAgain = [];
let wordList = [];



async function start(){
    wordList.shift()
    await getWord()
    if(wordList.length === 0) wordList.push('happy')
    resultNumber = 0;
    forAnswerAgain = [];
    buttonContainer.innerHTML = '<div class="countdown" id="countdown"><div class="countdown-list"></div><div class="countdown-list"></div><div class="countdown-list"></div></div>'
    
    setTimeout (function (){
        showingNumber(5 , 0)
    }, 3800)
}

function showingNumber(times, index){
    if(times <= 0){
        return resultScreen();
    }
    buttonContainer.innerHTML ='<div class="numberContainer" id="numberContainer"></div>'
    let numberContainer = document.getElementById('numberContainer')
    let eachNum = getRandom(1, 5);
        numberContainer.innerText = eachNum
        resultNumber = resultNumber + eachNum
        forAnswerAgain.push(eachNum);
        setTimeout(function(){
            numberContainer.innerText = '  '
        }, 1300)
        setTimeout(function () {
        return showingWord(times, index);}, 1400)
}

function showingWord (times, index){
    console.log(index, wordList[0])
    if(wordList[0].split('')[index] === undefined){
        return resultScreen();
    }
    buttonContainer.innerHTML ='<div class="numberContainer" id="numberContainer"></div>'
    let numberContainer = document.getElementById('numberContainer')
    let eachCharacter = wordList[0].split('')[index]
    numberContainer.innerText = eachCharacter;
    setTimeout(function(){
        numberContainer.innerText = '  '
    }, 1300)
    setTimeout (function (){    
        return showingNumber(times-1, index+1)}, 1400)
}

function getRandom(min, max) {
    var random = Math.floor( Math.random() * (max + 1 - min) ) + min;

        return random;
  
}

function resultScreen(){
    buttonContainer.innerHTML =`<div class="answerContainer" id="numberContainer"><p class="formTitle">Number</p><input type=text id='resultInput'></input><p class="formTitle">Word</p><input type=text id='resultInputWord'></input><input id='submit' class="submit" type=submit name="button" value="submit"></input></div>`
    let submit = document.getElementById('submit')
    console.log(resultNumber, wordList[0])
    let getNumber = document.getElementById('resultInput');
    let getWord = document.getElementById('resultInputWord')
    setCursorNumber(getNumber);

    getNumber.addEventListener('keypress', function (e) {
        if (e.key === 'Enter') {
            let resultInputWord = document.getElementById('resultInputWord')
                 setCursor(resultInputWord) 
        }
    })

    getWord.addEventListener('keypress', function (e) {
        if (e.key === 'Enter') {
            let resultInput = document.getElementById('resultInput').value
        let resultInputWord = document.getElementById('resultInputWord').value
        judge(resultInput, resultInputWord)
        }
    })

    submit.addEventListener('click', ()=>{
        let resultInput = document.getElementById('resultInput').value
        let resultInputWord = document.getElementById('resultInputWord').value
        judge(resultInput, resultInputWord)
    })
    
}

function setCursorNumber(getNumber){
    let obj = getNumber;
    let e = obj.value;
    obj.value = ''
    obj.focus();
    obj.value = e; 
    }

// Jump to Word input
function setCursor(resultInputWord){
    let obj = resultInputWord;
    let e = obj.value;
    obj.value = ''
    obj.focus();
    obj.value = e; 
    }

function judge(resultInput, resultInputWord){
    resultInput = Number(resultInput)
    
        if(resultInput === resultNumber && resultInputWord === wordList[0]){
            alert('Correct')
            buttonContainer.innerHTML = `<div class='button-container' id='buttonContainer'>
            <button id='button' class='start' onclick='start()'>START</button></div>`
        } else {
            alert('What a stupid guy!')
            buttonContainer.innerHTML = `<div class='end-button-container' id='buttonContainer'>
            <button id='button' class='tryAgain' onclick='restart()'>Try Again</button>
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
        numberContainer.innerText = '  '
    }, 1300)
    setTimeout (function (){    
        return restartHelperWord(forAnswerAgainLength, index)}, 1400)
}

function restartHelperWord(forAnswerAgainLength, index){
    if(wordList[0].split('')[index] === undefined){
        return resultScreen();
    }
    buttonContainer.innerHTML ='<div class="numberContainer" id="numberContainer"></div>'
    let numberContainer = document.getElementById('numberContainer')
    let eachCharacter = wordList[0].split('')[index]
    numberContainer.innerText = eachCharacter;
    setTimeout(function(){
        numberContainer.innerText = '  '
    }, 1300)
    setTimeout (function (){    
        return restartHelper(forAnswerAgainLength, index+1)}, 1400)
}


async function getWord(){
    const proxyUrl = 'https://whispering-tor-04671.herokuapp.com/'
    const apiUrl = 'http://api.forismatic.com/api/1.0/?method=getQuote&lang=en&format=json';
    try {
        const response = await fetch(proxyUrl + apiUrl);
        const data = await response.json();
        const text = data.quoteText
        for(let i = 0; i< text.split(' ').length; i++){
            let word = text.toLowerCase().split(' ')[i]
            if(word.split('').includes('.') || word.split('').includes('!') || word.split('').includes('?') || word.split('').includes(',') || word.split('').includes(',') || word.split('').includes(';') || word.split('').includes(':')){
                word = word.substring(0, word.length-1)
            }
            if(word.length > 3 && word.length < 6){
                word = word.toLowerCase()
                wordList.push(word);
            }
        }
        console.log(wordList)
    }catch {
        getWord();
    }
}

getWord()


