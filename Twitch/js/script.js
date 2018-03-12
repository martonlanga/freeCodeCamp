var users = ["ESL_SC2", "OgamingSC2", "cretetion", "freecodecamp", "storbeck", "habathcx",
  "RobotCaleb", "noobs2ninjas"
];
var endPoint = "https://crossorigin.me/https://wind-bow.gomix.me/twitch-api/streams/";

$(document).ready(function() {

  var response = [];
  users.forEach(function(u) {
    $.getJSON(endPoint + u, function (res) {
      response.push(res);
    });
  });

  console.log(response);
});
