var started = false;
var level=0;

var gamePattern = [];
var userClickedPattern = [];
$(document).on('keypress',function()
{
  if(started===false)
  {
    $('#level-title').text('Level '+level);
    nextSequence();
    started = true;
  }
});

var buttonColors = ['red','blue','green','yellow'];
var RandomNum;

$('.btn').on('click',function()
{
  var userChosenColor = $(this).attr('id');
  userClickedPattern.push(userChosenColor);

  playSound(userChosenColor);
  animatePress(userChosenColor);

  checkAnswer(userClickedPattern.length-1);
});

function checkAnswer(currentLevel)
{
    if(gamePattern[currentLevel]===userClickedPattern[currentLevel])
    {  console.log('success');
      if(userClickedPattern.length==gamePattern.length)
      {
        setTimeout(function () {
          nextSequence();
        }, 1000);
      }
    }
    else
    {
      console.log("wrong");
      playSound('wrong');
      $('body').addClass('game-over');
      $('h1').text('Game Over, Press Any Key to Restart');
      setTimeout(function () {
        $('body').removeClass('game-over');
      }, 200);
      setTimeout(function () {
        startOver();
      }, 1000);
    }
}

function nextSequence()
{
  userClickedPattern=[];
  level++;
  $('#level-title').text('Level '+level);

  RandomNum = Math.floor(Math.random()*4);
  var randomChosenColor = buttonColors[RandomNum];
  console.log(randomChosenColor);
  gamePattern.push(randomChosenColor);
  $('#'+randomChosenColor).fadeOut(100).fadeIn(100);
  playSound(randomChosenColor);
}

function playSound(soundKey)
{
  var audio = new Audio('sounds/'+soundKey+'.mp3');
  audio.play();
}

function animatePress(currentColor)
{
  $('#'+currentColor).addClass('pressed');
  setInterval(function () {
    $('#'+currentColor).removeClass('pressed');
  }, 100);
}

function startOver()
{
  level=0;
  gamePattern=[];
  started=false;
}
