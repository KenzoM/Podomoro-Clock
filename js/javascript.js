$(document).ready(function(){
  var sessionDefault = 1;
  var breakDefault = 2;
  var start = 0;
  var refresh; //this is what will call the timer

  function addition(number){
    var answer = parseInt(number) + 1;
    return answer;
  }

  function subtract(number){
    if (number > 1){
      var answer = parseInt(number) - 1;
      return answer;
    }
  }

  $("#session").append('<p>Session Length: <span class="number">'+
  sessionDefault +'</span>' + '<span class="more"> more </span>' +
  '<span class="less">less</span></p>');

  $("#break").append('<p>Break Length: <span class="number">'+
  breakDefault +'</span>' + '<span class="more"> more </span>' +
  '<span class="less">less</span></p>');

  $("#time").append("<p> <span class='sessionType'></span><span class='number'>"+
    "</span>:<span class='second'></span </p>");
  $("#time p").find(".sessionType").append("Session Time ")
  $("#time p").find(".number").append(sessionDefault);
  $("#time p").find(".second").append("00");

  $("#reset").on('click', resetAll)

  function resetAll(){
    $("#session").find(".number").text(sessionDefault);
    $("#break").find(".number").text(breakDefault);
    $("#time").find(".sessionType").text("Session Time ");
    $("#time").find(".number").text(sessionDefault);
    $("#time").find(".second").text("00");

    clearInterval(refresh);
    start = 0;
  }

  function startTimer(length, attrID){
    var typeSession = (attrID === "study") ? "Session Time " : "Break Time "
    var minutes = Math.floor(length / 60);
    minutes = (minutes < 10) ? "0" + minutes : minutes;
    var seconds = length % 60;
    seconds = (seconds < 10) ? "0" + seconds : seconds;

    $("#time").find(".sessionType").text(typeSession);
    $("#time").find(".number").text(minutes);
    $("#time").find(".second").text(seconds);
  }

  $("#session > p").children(".more").on('click',function(){
    if (start % 2 == 1){
      clearInterval(refresh)
      start --;
    }
    var currentNumber = $(this).siblings(".number").text();
    $(this).siblings(".number").text(addition(currentNumber));
    $("#time").html('<p>Session Time <span class="number">'+
      addition(currentNumber) +'</span>:<span class="second">'+ "00"
      +'</span></p>')
  })

  $("#session > p").children(".less").on('click',function(){
    if (start % 2 == 1){
      clearInterval(refresh)
      start --;
    }
    var currentNumber = $(this).siblings(".number").text();
    $(this).siblings(".number").text(subtract(currentNumber));
    if (subtract(currentNumber)){
      $("#time").html('<p>Session Time <span class="number">'+
        subtract(currentNumber) +'</span>:<span class="second">'+ "00"
        +'</span></p>')
    }
  })

  $("#break> p").children(".more").on('click',function(){
    var currentNumber = $(this).siblings(".number").text();
    $(this).siblings(".number").text(addition(currentNumber));

  })

  $("#break> p").children(".less").on('click',function(){
    var currentNumber = $(this).siblings(".number").text();
    $(this).siblings(".number").text(subtract(currentNumber));
  })

  $("#time").on('click','p', function(){
    start ++;
    var test = $(this).find(".sessionType").text();
    whichAppend(test);
  });

  function whichAppend(el){
    (el === "Session Time ") ? appendStudy() : appendBreak();
  }
  function appendStudy(){
    var jam = $("#time > p").find(".number").text()
    var ham = $("#time > p").find(".second").text()
    jam = parseInt(jam) * 60;
    ham = parseInt(ham) ;
    var timerLength = (jam + ham)
    if (start % 2 === 1){
      refresh = setInterval(function(){
        if (timerLength === 0){
          alert("Break Time!");
          clearInterval(refresh);
          $("#time").empty();
          appendBreak();
        } else {
          timerLength --;
          startTimer(timerLength, "study");
        }
      }, 30);
    } else{
      clearInterval(refresh);
    }
  }

  function appendBreak(){
    if ($("#time").html().length === 0){
      var currentBreak = $("#break").find(".number").text();
      $("#time").append('<p> <span class="sessionType">Break Time </span><span class="number">'+
        currentBreak +'</span>:<span class="second">00</span></p>');
    };
     var jam = $("#time > p").find(".number").text()
     var ham = $("#time > p").find(".second").text()
     jam = parseInt(jam) * 60;
     ham = parseInt(ham) ;
     var timerLength = (jam + ham);
     if (start % 2 === 1){
       refresh = setInterval(function(){
         if (timerLength === 0){
           alert("Break Time is Over!!");
           clearInterval(refresh);
           $("#time").empty();
           //needs to refactor this..
           $("#time").append("<p> <span class='sessionType'></span><span class='number'>"+
             "</span>:<span class='second'></span </p>");
           $("#time p").find(".sessionType").append("Session Time ")
           $("#time p").find(".number").append(sessionDefault);
           $("#time p").find(".second").append("00");
           appendStudy();
         } else {
           timerLength --;
           startTimer(timerLength, "break");
         }
       }, 10);
     } else{
       clearInterval(refresh);
     }
  }
});
