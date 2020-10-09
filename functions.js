function startUp() {
  $("#start_button").remove(); //remove start button on click
  displayTime();
  displayQuestion();
}


function displayTime() { ////every sec run doTime to simulate timer

  var currentTime = setInterval(function doTime() {

    timeLimit--;
    timeLocation.textContent = "Time Left: " + timeLimit;

    if (timeLimit <= 0 || currentQuestion === questions.length) {
      clearInterval(currentTime);
      timeLocation.textContent = "Time Left: 0";
    }
  }, 1000);
}


function displayQuestion() {
  $("#buttonArea").empty(); ///empty html location so new choices can be displayed properly

  var listChoices = questions[currentQuestion].choices; ///get the choices from the questions object
  currentAnswer = questions[currentQuestion].answer; ///get the right answer from questions object
  questionLocation.textContent = questions[currentQuestion].ask; ///display question to screen

  for (var i = 0; i < listChoices.length; i++) { ///display buttons for the amount of choices for a given question
    var button = document.createElement("button"); ///create a button every iteration of loop
    button.textContent = listChoices[i]; //put the choices for given question in button
    choiceLocation.appendChild(button).setAttribute("class", "p-3 m-3 btn btn-light btn-block"); ///add button to div and style
    button.setAttribute("onclick", "checkAnswer(event)");
  }
}


function checkAnswer(event) { //check choice button for click and compare to answer

  if (currentAnswer === event.target.textContent) {
    correctGuess();
  } else {
    wrongGuess();
  }

  if (currentQuestion === questions.length || timeLimit <= 0) {
    gameOver();
  } else {
    displayQuestion();
  }
}


function correctGuess() { ////display if the user was right and then remove the text

  informUser.textContent = "Correct!";

  setTimeout(function() {
    $('#tellUser').empty();
  }, 1000)

  currentQuestion++;
}


function wrongGuess() { ////display if the user was wrong and then remove the text

  informUser.textContent = "Wrong!";

  setTimeout(function() {
    $('#tellUser').empty();
  }, 900)

  timeLimit = timeLimit - 15;
  currentQuestion++;
}


function gameOver() {
  $("#buttonArea").empty();  ///clear game area of questions and answers
  $("#mainText").empty();

  if (timeLimit < 0) {  //if user guessed poorly set score to 0
    timeLimit = 0;
  }

  questionLocation.textContent = "Game Over.\n Your score was: " + timeLimit;

  createForm();
}


function createForm() { ///create form area for user intials

  ////create form element and attributes
  var theForm = document.createElement("form");
  theForm.setAttribute("id", "myForm");
  theForm.setAttribute("class", "form-control form-control-lg");

  ///put form in the area set aside in html
  var formEl = document.getElementById("formArea");
  formEl.appendChild(theForm);

  //make area for user text input
  var theInput = document.createElement("input");
  theInput.setAttribute("type", "text");
  theInput.setAttribute("placeholder", "Enter Initals");
  document.getElementById("myForm").appendChild(theInput);

  ///block user from hitting enter key in form
  $(theInput).keypress(
  function(event){
    if (event.which == '13') {
      event.preventDefault();
    }
  });

  ///create submit button for user intials
  var submitButton = document.createElement("button");
  submitButton.setAttribute("type", "button");
  submitButton.setAttribute("id", "subButton");
  submitButton.setAttribute("value", "Submit");
  submitButton.textContent = "Submit";
  formEl.appendChild(submitButton);

  ////store user input and save it to the leaderboard
  submitButton.addEventListener("click", function() {
    var userInitials = theInput.value;
    console.log(userInitials);

    if (userInitials === ""){ ///make sure user actually enters something
      $("#submitButton").off()
      $("#formArea").empty();
      createForm()
    } else {    ///store user input and score in variables and store it in local storage

      var newPlayer = {
        name: userInitials,
        userScore: timeLimit
      }

      var leaderboard = localStorage.getItem("leaderboard");
      if (leaderboard === null) {
        leaderboard = [];
      } else {
        leaderboard = JSON.parse(leaderboard);
      }

      leaderboard.push(newPlayer);
      var newEntry = JSON.stringify(leaderboard);
      localStorage.setItem("leaderboard", newEntry);

      window.location.replace("./Leaderboard.html");

    }
    });

}


////display leaderboard on page


  var boardLocation = document.querySelector("#scoreBoard");
  var leaderboard = localStorage.getItem("leaderboard");
  leaderboard = JSON.parse(leaderboard);

  if (leaderboard !== null) {
    for (var i = 0; i < leaderboard.length; i++) {

      var createEntry = document.createElement("li");
      createEntry.textContent = leaderboard[i].name + ": " + leaderboard[i].userScore;
      boardLocation.appendChild(createEntry);
    }
  }


function clearLeaders() {
  localStorage.clear();
  location.reload();
}

function goBack() {
  window.location.replace("./index.html");
}
