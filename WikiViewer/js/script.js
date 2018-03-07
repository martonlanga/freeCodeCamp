$(document).ready(function() {
  $('.input').keyup(function(e) {
    if (e.keyCode == 13 && $(this).val().length > 1) {
      getData($(this).val());

      var width = $(window).width();
      console.log(width);
      if (width >= 1600) {
        $(".intro").css("margin-bottom", "42%");
      } else if (width < 1600 && width > 1200) {
        $(".intro").css("margin-bottom", "42%");
      } else if (width <= 1200 && width > 900) {
        $(".intro").css("margin-bottom", "52%");
      } else if (width <= 900 && width > 768) {
        $(".intro").css("margin-bottom", "72%");
      } else if (width <= 768 && width > 480) {
        $(".intro").css("margin-bottom", "88%");
      } else {
        $(".intro").css("margin-bottom", "130%");
        console.log(width);

      }

      $(".intro").css("transition", "0.3s");
    }
  });
});

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
