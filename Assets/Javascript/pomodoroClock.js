
  $('#start-countdown').hide();
  $("#resume").hide();
$("#pause").show();


//session or break time variable. session time = true, break time = false.
var timeBlock = "true";

//display session / break length settings
var breakLength = 5;
var sessionLength = 25;
$(".display_break").text(breakLength);
$(".display_session").text(sessionLength);

//change break length 
$(".bk-break").click(function() {
  if (breakLength > 0) {
    breakLength--
    $(".display_break").text(breakLength)
  } else $(".display_break").text("Error!")
})
$(".fwd-break").click(function() {
    breakLength++;
    $(".display_break").text(breakLength)
  })
  //change session length 
$(".bk-session").click(function() {
  if (sessionLength > 0) {
    sessionLength--
    $(".display_session").text(sessionLength)
    $(".time").text(sessionLength + ":00:00")
  } else $(".display_session").text("Error!")
})
$(".fwd-session").click(function() {
  sessionLength++;
  $(".display_session").text(sessionLength)
  $(".time").text(sessionLength + ":00:00")
})
//arc progress bar animation
var pomCircle = function(x) {
  $('.pomProgressTimer').circleProgress({
    value: 1.0,
    thickness: '10',
    size: 225,
    lineCap: 'round',
    fill: {
      color: '#8c1b0b',
    },
    animation: {
      duration: x * 60500,
    },
  })
};

//timer functionality
var Example2 = new(function() {
  if(timeBlock = 'true'){  
   var  currentTime = 6000 * sessionLength
      } 
    else  var currentTime = 6000 * breakLength;
  var $countdown,
    $form, // Form used to change the countdown time
    incrementTime = 70,     
    updateTimer = function() {
      $countdown.html(formatTime(currentTime));
      if (currentTime == 0) {
        Example2.Timer.stop();
        timerComplete();
        Example2.resetBreak();
        return;
      }
      currentTime -= incrementTime / 10;
      if (currentTime < 0) currentTime = 0;
    },
    timerComplete = function() {
      alert('Break Time!: Session timer complete! Click OK to start Break. ');     
    },
    init = function() {
      $countdown = $('#countdown');
      Example2.Timer = $.timer(updateTimer, incrementTime, true);
      $form = $('#example2form');
      $form.bind('submit', function() {
        Example2.resetCountdown();
        return false;
      });
    };
  this.resetCountdown = function() {    
    var newTime = $('.display_session').text() * 6000  
    if (newTime > 0) {
      currentTime = newTime;
    }
    this.Timer.stop().once();
  };
  this.resetBreak = function(){
     var newTime = $('.display_break').text() * 6000
    if (newTime > 0) {
      currentTime = newTime;
    }
    this.Timer.stop().once();
    pomCircle(breakLength);
     $(function() {
        $stopwatch = $('#stopwatch');
        Example2.Timer = $.timer(updateTimer, incrementTime, true);  
    });
  };
  $(init);
  $(pomCircle(sessionLength));
});

//play pause resume and reset functionality

$('#start-countdown').click(function() {
  $('#start-countdown').hide();
  pomCircle(sessionLength).animationStartValue = 0.0;
  Example2();
// pomCircle.animationStartValue = 0.0;
  
});
$('#pause').on('click', function() {
 
  $("#resume").show();
  $("#pause").hide();
  $("#start-countdown").hide();
  var el = $('.pomProgressTimer');
  $(el.circleProgress('widget')).stop();
  $('body').toggleClass( "pomo", 750, "easeOutQuint" );
  $(".settings").css('color', 'white');
  $(".settings").css('text-shadow', '1px 1px 2px #555');
  $(".display_settings").css('color', 'white');
  $(".display_settings").css('text-shadow', '1px 1px 2px #555');
});
$('.resume-countdown').on('click', function() {
  $(".pause-countdown").show();
  $("#start-countdown").hide();
  $("#resume").hide();
  $('body').toggleClass( "pomo", 1000, "easeOutQuint" );
  var obj = $('.pomProgressTimer').data('circle-progress'),
    progress = obj.lastFrameValue;
  $('.pomProgressTimer').circleProgress({
    animationStartValue: progress,
  });
  $(".settings").css('color', 'black');
  $(".settings").css('text-shadow', '1px 1px 2px #fff');
  $(".display_settings").css('color', 'black');
  $(".display_settings").css('text-shadow', '1px 1px 2px #fff');
});
$("#stop").click(function() {
  $('#start-countdown').show();
  $("#pause").show();
  $("#resume").hide();
   pomCircle.animationStartValue = 0.0;
});
//time functions
function pad(number, length) {
  var str = '' + number;
  while (str.length < length) {
    str = '0' + str;
  }
  return str;
}

function formatTime(time) {
  var min = parseInt(time / 6000),
    sec = parseInt(time / 100) - (min * 60),
    hundredths = pad(time - (sec * 100) - (min * 6000), 2);
  return (min > 0 ? pad(min, 2) : "00") + ":" + pad(sec, 2) + ":" + hundredths;
}
$(document).ready(function() {

});