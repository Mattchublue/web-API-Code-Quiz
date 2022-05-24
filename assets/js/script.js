var quizQuestions = [
    {
      title: "Commonly used data types DO NOT include:",
      choices: ["strings", "booleans", "alerts", "numbers"],
      answer: "alerts"
    },
    {
      title: "The condition in an if / else statement is enclosed within ____.",
      choices: ["quotes", "curly brackets", "parentheses", "square brackets"],
      answer: "parentheses"
    }
    ]
const startButton = document.getElementById('start-btn')

startButton.addEventListener('click', startGame)
var questionContainer=document.querySelector("#question-container")
var questionTitle=document.querySelector("#question")
var answerChoices=document.querySelector("#answer-buttons")
var timerDisplay=document.querySelector("#timer-display")
var timerState;
var initialTime=60;
var indexQuestion=0;
var endScreen=document.querySelector("#end-screen");
var finalscore=document.querySelector("#final-score")
var initials=document.querySelector("#initials")
var submitBtn=document.querySelector("#submitBtn")
var scoreList=document.querySelector("#score-list")
function startGame() {
    startButton.setAttribute("class", "hide")
    console.log('Started')
timerState=setInterval(function(){
    initialTime--
    timerDisplay.textContent=initialTime
if (initialTime<=0){
    endGame()
}
},1000)
questionContainer.removeAttribute("class")
setNextQuestion()
}

function setNextQuestion() {
var currentQuestion=quizQuestions[indexQuestion]
questionTitle.textContent=currentQuestion.title
answerChoices.innerHTML=""
currentQuestion.choices.forEach(function(choice){
    var questionButton=document.createElement("button")
    questionButton.setAttribute("value",choice)
    questionButton.textContent=choice
    questionButton.onclick=selectAnswer
    answerChoices.appendChild(questionButton)
})
}

function selectAnswer() {
if(this.value===quizQuestions[indexQuestion].answer){
    alert("You are right!")
}
else {alert("YOU ARE WRONG!!!")
initialTime=initialTime-10
timerDisplay.textContent=initialTime
}
indexQuestion++
if (indexQuestion===quizQuestions.length) {
    endGame()
}
else {setNextQuestion()}
}

function endGame() {
  questionContainer.setAttribute("class", "hide")
  endScreen.removeAttribute("class")
  clearInterval(timerState)  
  finalscore.textContent=initialTime
}

function saveScore() {
    var scoreArray=JSON.parse(localStorage.getItem("scores"))||[]
    var newScores={name:initials.value, score:initialTime}
    scoreArray.push(newScores)
    localStorage.setItem("scores", JSON.stringify(scoreArray))
    showScores()   
}

function showScores() {
    var scoreArray=JSON.parse(localStorage.getItem("scores"))||[]
    scoreArray.sort(function(a,b){
    return b.score-a.score    
    //if (b.score>a.score){return 1}
    //elseif(b.score)<a.score{return -1}
    })
    scoreArray.forEach(function(object){
    var scoreObject=document.createElement("li")
    scoreObject.textContent="name: "+object.name+"-- score : "+object.score
    scoreList.appendChild(scoreObject)
}
        
        )
}
    submitBtn.onclick=saveScore