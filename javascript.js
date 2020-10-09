var questions = [
  {
    ask: "Inside what element do you put javascript?",
    choices: ["<javascript>", "<js>", "<scripting>", "<script>"],
    answer: "<script>"
  },
  {
    ask: "How do you write \"Hello World\" in an alert box?",
    choices: ["alertBox(\"Hello World\");", "msgBox(\"Hello World\");", "alert(\"Hello World\");", "msg(\"Hello World\")"],
    answer: "alert(\"Hello World\");"
  },
  {
    ask: "How do you create a function in Javascript?",
    choices: ["function myFunction()", "function = myFunction()", "function:myFunction()"],
    answer: "function myFunction()"
  },
  {
    ask: "JavaScript is the same as Java?",
    choices: ["True", "False"],
    answer: "False"
  },
  {
    ask: "How does a WHILE loop start?",
    choices: ["while i = 1 to 10", "while (i <= 10)", "while (i <=10; i++)"],
    answer: "while (i <= 10)"
  },

];


var timeLimit = 60;
var currentQuestion = 0;
var currentAnswer;


//SELECT HTML ELEMENTS in index.html
var questionLocation = document.querySelector("#mainText");
var choiceLocation = document.querySelector('#buttonArea');
var timeLocation = document.querySelector("#timer");
var scoreLocation = document.querySelector("#score");
var informUser = document.querySelector("#tellUser");
var formLocation = document.querySelector("#formArea")


///select HTML elements in Leaderboard.html
var clearBut = document.querySelector("#clearLead");
var backBut = document.querySelector("#goBack");

/*
## Acceptance Criteria

```
GIVEN I am taking a code quiz
WHEN I click the start button
THEN a timer starts and I am presented with a question
WHEN I answer a question
THEN I am presented with another question
WHEN I answer a question incorrectly
THEN time is subtracted from the clock
WHEN all questions are answered or the timer reaches 0
THEN the game is over
WHEN the game is over
THEN I can save my initials and score
```
*/
