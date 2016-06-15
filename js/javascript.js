$(document).ready(function(){

  var sessionDefault = 1;
  var breakDefault = 5;
  var start = 0;

  $("#session").append('<p>Session Length: <span class="number">'+
  sessionDefault +'</span>' + '<span class="more"> more </span>' +
  '<span class="less">less</span></p>');

  $("#break").append('<p>Break Length: <span class="number">'+
  breakDefault +'</span>' + '<span class="more"> more </span>' +
  '<span class="less">less</span></p>');


  $("#time p").find(".number").append(sessionDefault);
  $("#time p").find(".second").append("00");
  $("#reset").click(function(){
    $("#session").find(".number").text(sessionDefault);
    $("#break").find(".number").text(breakDefault);
    $("#time").find(".number").text(sessionDefault);
    $("#time").find(".second").text("00");
    clearInterval(refresh);
    start = 0;
  })


  var sessionNumber = $("#session > p").children(".number").text();

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

  $("#session > p").children(".more").click(function(){
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

  $("#session > p").children(".less").click(function(){
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

  $("#break> p").children(".more").click(function(){
    var currentNumber = $(this).siblings(".number").text();
    $(this).siblings(".number").text(addition(currentNumber));
  })

  $("#break> p").children(".less").click(function(){
    var currentNumber = $(this).siblings(".number").text();
    $(this).siblings(".number").text(subtract(currentNumber));
  })

  function startTimer(length){
    var minutes = Math.floor(length / 60);
    minutes = (minutes < 10) ? "0" + minutes : minutes;
    var seconds = length % 60;
    seconds = (seconds < 10) ? "0" + seconds : seconds;
    var text = '<p>Session Time <span class="number">'+ minutes
      +'</span>:<span class="second">'+ seconds +'</span></p>';
    $("#time").html(text);
  }

  function startBreak(breakLength){

  }

  var refresh; //this is what will call the timer
  $("#time").click(function(){
    start ++;
    var jam = $("#time > p").find(".number").text()
    var ham = $("#time > p").find(".second").text()
    jam = parseInt(jam) * 60;
    ham = parseInt(ham) ;
    var timerLength = (jam + ham)
    if (start % 2 === 1){
      refresh = setInterval(function(){
        if (timerLength === 0){
          alert("Break Time!")
          clearInterval(refresh);
        } else {
          timerLength --;
          startTimer(timerLength);
        }
      }, 1000);
    } else{
      clearInterval(refresh);
    }
  });
});
