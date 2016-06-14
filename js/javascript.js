$(document).ready(function(){

  var sessionDefault = 25;
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
    var currentNumber = $(this).siblings(".number").text();
    $(this).siblings(".number").text(addition(currentNumber));
    $("#time").html('<p>Session Time <span class="number">'+
      addition(currentNumber) +'</span>:00</p>')

  })

  $("#session > p").children(".less").click(function(){
    var currentNumber = $(this).siblings(".number").text();
    $(this).siblings(".number").text(subtract(currentNumber));
    if (subtract(currentNumber)){
      $("#time").html('<p>Session Time <span class="number">'+
        subtract(currentNumber) +'</span>:00</p>')
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
    console.log(length)
    var minutes = Math.floor(length / 60);
    minutes = (minutes < 10) ? "0" + minutes : minutes;
    var seconds = length % 60;
    seconds = (seconds < 10) ? "0" + seconds : seconds;
    var text = '<p>Session Time <span class="number">'+ minutes
      +'</span>:'+ seconds +'</p>';
    $("#time").html(text);
  }
  var refresh; //this is what will call the timer
  $("#time").click(function(){
    start ++;
    var timerLength = $(this).find(".number").text() * 60;
    if (start % 2 === 1){
      refresh = setInterval(function(){
        console.log(timerLength)
        timerLength --;
        startTimer(timerLength);
      }, 1000);
    } else{
      clearInterval(refresh);
      console.log("Stops the timer")
    }
  });
});
