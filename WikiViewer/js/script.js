$(document).ready(function() {
  $('.input').keyup(function(e) {
    if (e.keyCode == 13 && $(this).val().length > 1) {
      getData($(this).val());

      $(".intro").css("margin-bottom", "2%");
      $(".intro").css("margin-top", "2%");
      $(".intro").css("transition", "0.5s");
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

function processData(data) {
  var headings = data[1];
  var descriptions = cropDescription(data[2]);
  var links = data[3];

  var html = '';

  for (var i = 0; i < headings.length; i++) {
    html +=
      '<a href=\"' + links[i] +
      '\" class=\"list-group-item list-group-item-action\">' +
      '<div class=\"d-flex w-100\">' +
      '<h3 class=\"">' + headings[i] + '</h3>' +
      '</div>' +
      '<div class=\"d-flex\">' +
      '<p>' + descriptions[i] + '</p>' +
      '</div>' +
      '</a>'
  }

  showData(html)
}

function showData(html) {
  $(".list-group").html(html);
}

function cropDescription(descriptions) {
  var croppedDescriptions = [];
  descriptions.forEach(function(d) {
    if (d.length > 50) {
      croppedDescriptions.push(d.substring(0, 100) + '...');
    } else {
      croppedDescriptions.push(d);
    }
  });

  return croppedDescriptions;
}
