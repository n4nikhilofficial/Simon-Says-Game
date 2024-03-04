// script.js
let buttonArray = ["red", "green", "blue", "yellow"];
let randomGeneratedButton = [];
let userGeneratedButton = [];
let level = 0;
let started = false;

$(document).on("click touchstart", function () {
    if (!started) {
        $("h2").text("LEVEL-0");
        started = true;
        gameStart();
    }
});

// User interactions
$("button").on("click touchstart", function (event) {
    event.preventDefault(); // Prevent default behavior of touch events
    let userClickButton = $(this).attr("class");
    userGeneratedButton.push(userClickButton);
    $(`.${userClickButton}`).fadeOut(200).fadeIn(100, function () {
        var audio = new Audio(`sounds/${userClickButton}.mp3`);
        audio.play();
    });
    checkAnswer(userGeneratedButton.length - 1);
});

//checking answer
function checkAnswer(answer) {
    if (userGeneratedButton[answer] !== randomGeneratedButton[answer]) {
        $("h2").text("Game Over, press any key to restart");
        $("body").css("background-color", "red");
        setTimeout(function(){
            $("body").css("background-color", ""); 
            var audio = new Audio(`sounds/wrong.mp3`);
            audio.play();
            restart();
        }, 1000); 
    } else {
        if (userGeneratedButton.length === randomGeneratedButton.length) {
            setTimeout(function () {
            gameStart();
            }, 1000);
        }
    }
}

function gameStart() {
    level++;
    userGeneratedButton = [];
    $("h2").text(`Level-${level}`);
    let randomNumber = Math.floor(Math.random() * 4);
    let randomButton = buttonArray[randomNumber];
    randomGeneratedButton.push(randomButton);
    $(`.${randomButton}`).fadeOut(200).fadeIn(100, function () {
        var audio = new Audio(`sounds/${randomButton}.mp3`);
        audio.play();
    });
}

function restart() {
    randomGeneratedButton = [];
    userGeneratedButton = [];
    started = false;
    level = 0;
}

// Check if the device is a mobile device
function isMobileDevice() {
    return /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
}

// Add start and restart buttons for mobile devices
$(document).ready(function() {
    if (isMobileDevice()) {
        $("body").append("<button id='startButton'>Start</button>");
        $("body").append("<button id='restartButton'>Restart</button>");

        $("#startButton").on("click touchstart", function() {
            if (!started) {
                $("h2").text("LEVEL-0");
                started = true;
                gameStart();
            }
        });

        $("#restartButton").on("click touchstart", function() {
            restart();
            $("h2").text("Press Start to Begin");
        });
    }
});
