$(document).ready(function() {
  $('#input').keyup(function(e){
      if(e.keyCode == 13 && $(this).val().length > 1)
      {
        console.log('123');
      }
  });
});

//After clicking away from input, stop "Search" to transform back to original position
function stopMovingBack() {
  $(".effect~label").css("top", "-14px");
  $(".effect~label").css("font-size", "90%");
}

function openRandom() {
  window.open("https://en.wikipedia.org/wiki/Special:Random");
}
