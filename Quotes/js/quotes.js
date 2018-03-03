var quotes = [
  'Formal education will make you a living; self-education will make you a fortune.',
  'Either you run the day, or the day runs you.',
  'We must all suffer from one of two pains: the pain of discipline or the pain of regret. The difference is discipline weighs ounces while regret weighs tons.',
  'If you don\'t design your own life plan, chances are you\'ll fall into someone else\'s plan. And guess what they have planned for you? Not much.',
  'If you are not willing to risk the unusual, you will have to settle for the ordinary.',
  'Your time is limited, so don\'t waste it living someone else\'s life. Don\'t be trapped by dogma – which is living with the results of other people\'s thinking. Don\'t let the noise of other\'s opinions drown out your own inner voice. And most important, have the courage to follow your heart and intuition.',
  'Where did you went to college? Books.'
];

function currentQuote() {
  return $('#quote').html();
}

function updateQuote() {
  //taking out the quote currently showed
  var current = currentQuote();
  $('#quote').addClass('animated bounceOutUp').one('webkitAnimationEnd mozAnimationEnd oAnimationEnd animationend MSAnimationEnd',
    function() {
      
      $(this).removeClass('animated bounceOutUp');

      var filteredQuotes = quotes.filter(q => q !== current);
      var newQuote = filteredQuotes[Math.floor(Math.random() * 6)];

      $('#quote').addClass('animated bounceInUp').one('webkitAnimationEnd mozAnimationEnd oAnimationEnd animationend MSAnimationEnd',
        function() {
          $(this).removeClass('animated bounceInUp');
        });
      $('#quote').text(newQuote);
    });
};

$(document).ready(function() {
  updateQuote();

  $("a").click(function() {
    var url = "https://twitter.com/intent/tweet" + "?text=" + encodeURIComponent(currentQuote());
    console.log(url);
    $(this).prop("href", url);
  });
});


$(window).keypress(function(e) {
  if (e.keyCode === 32) {
    updateQuote();
  }
});
