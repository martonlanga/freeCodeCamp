$(document).ready(function() {
  $('#input').keyup(function(e) {
    if (e.keyCode == 13 && $(this).val().length > 1) {
      getData($(this).val());
      $(".search").css("top", "7%");
      $(".search").css("transition", "0.4s");
    }
  });
});

//After clicking away from input, stop "Search" to transform back to original position
function stopMovingBack() {
  $(".effect~label").css("top", "-14px");
  $(".effect~label").css("font-size", "90%");
}

//Open random article
function openRandom() {
  window.open("https://en.wikipedia.org/wiki/Special:Random");
}


function getData(search) {
  $.getJSON('https://en.wikipedia.org/w/api.php?action=opensearch&format=json&origin=*&search=' +
    encodeURIComponent(search),
    function(data) {
      console.log(data);
      processData(data);
    });
}

function processData (data) {
  
}
