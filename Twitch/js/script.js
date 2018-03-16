/*var users = ["ESL_SC2", "OgamingSC2", "cretetion", "freecodecamp", "storbeck", "habathcx",
  "RobotCaleb", "noobs2ninjas"
];
var endPoint = "https://crossorigin.me/https://wind-bow.gomix.me/twitch-api/streams/";
*/

class Stream {
  constructor(name, isOnline, icon, url) {
    this.name = name;
    this.isOnline = isOnline;
    this.icon = isOnline ? icon : "src/twitch.png";
    this.url = url;
  }
}

var streams = [];
var response = [];

$(document).ready(function() {

  $('.btn').click(function(evt) {
    evt.preventDefault();

    $(this).addClass('btn-active').siblings().removeClass('btn-active');

    filterData($(this).text().replace(/\s+/g, ''))
  });


  /*
    var response = [];
    users.forEach(function(u) {
      $.getJSON(endPoint + u, function(res) {
        response.push(res);
      });
    });
  */

  response = [{
      "stream": {
        "mature": false,
        "status": "Greg working on Electron-Vue boilerplate w/ Akira #programming #vuejs #electron",
        "broadcaster_language": "en",
        "display_name": "FreeCodeCamp",
        "game": "Creative",
        "language": "en",
        "_id": 79776140,
        "name": "freecodecamp",
        "created_at": "2015-01-14T03:36:47Z",
        "updated_at": "2016-09-17T05:00:52Z",
        "delay": null,
        "logo": "https://static-cdn.jtvnw.net/jtv_user_pictures/freecodecamp-profile_image-d9514f2df0962329-300x300.png",
        "banner": null,
        "video_banner": "https://static-cdn.jtvnw.net/jtv_user_pictures/freecodecamp-channel_offline_image-b8e133c78cd51cb0-1920x1080.png",
        "background": null,
        "profile_banner": "https://static-cdn.jtvnw.net/jtv_user_pictures/freecodecamp-profile_banner-6f5e3445ff474aec-480.png",
        "profile_banner_background_color": null,
        "partner": false,
        "url": "https://www.twitch.tv/freecodecamp",
        "views": 161989,
        "followers": 10048,
        "_links": {
          "self": "https://api.twitch.tv/kraken/channels/freecodecamp",
          "follows": "https://api.twitch.tv/kraken/channels/freecodecamp/follows",
          "commercial": "https://api.twitch.tv/kraken/channels/freecodecamp/commercial",
          "stream_key": "https://api.twitch.tv/kraken/channels/freecodecamp/stream_key",
          "chat": "https://api.twitch.tv/kraken/chat/freecodecamp",
          "subscriptions": "https://api.twitch.tv/kraken/channels/freecodecamp/subscriptions",
          "editors": "https://api.twitch.tv/kraken/channels/freecodecamp/editors",
          "teams": "https://api.twitch.tv/kraken/channels/freecodecamp/teams",
          "videos": "https://api.twitch.tv/kraken/channels/freecodecamp/videos"
        }
      },
      "_links": {
        "self": "https://api.twitch.tv/kraken/streams/freecodecamp",
        "channel": "https://api.twitch.tv/kraken/channels/freecodecamp"
      }
    },
    {
      "stream": null,
      "display_name": "OgamingSC2",
      "_links": {
        "self": "https://api.twitch.tv/kraken/streams/ogamingsc2",
        "channel": "https://api.twitch.tv/kraken/channels/ogamingsc2"
      }
    },
    {
      "stream": {
        "mature": false,
        "status": "RERUN: StarCraft 2 - Kane vs. HuK (ZvP) - WCS Season 3 Challenger AM - Match 4",
        "broadcaster_language": "en",
        "display_name": "ESL_SC2",
        "game": "StarCraft II",
        "language": "en",
        "_id": 30220059,
        "name": "esl_sc2",
        "created_at": "2012-05-02T09:59:20Z",
        "updated_at": "2016-09-17T06:02:57Z",
        "delay": null,
        "logo": "https://static-cdn.jtvnw.net/jtv_user_pictures/esl_sc2-profile_image-d6db9488cec97125-300x300.jpeg",
        "banner": null,
        "video_banner": "https://static-cdn.jtvnw.net/jtv_user_pictures/esl_sc2-channel_offline_image-5a8657f8393c9d85-1920x1080.jpeg",
        "background": null,
        "profile_banner": "https://static-cdn.jtvnw.net/jtv_user_pictures/esl_sc2-profile_banner-f8295b33d1846e75-480.jpeg",
        "profile_banner_background_color": "#050506",
        "partner": true,
        "url": "https://www.twitch.tv/esl_sc2",
        "views": 60843789,
        "followers": 135275,
        "_links": {
          "self": "https://api.twitch.tv/kraken/channels/esl_sc2",
          "follows": "https://api.twitch.tv/kraken/channels/esl_sc2/follows",
          "commercial": "https://api.twitch.tv/kraken/channels/esl_sc2/commercial",
          "stream_key": "https://api.twitch.tv/kraken/channels/esl_sc2/stream_key",
          "chat": "https://api.twitch.tv/kraken/chat/esl_sc2",
          "subscriptions": "https://api.twitch.tv/kraken/channels/esl_sc2/subscriptions",
          "editors": "https://api.twitch.tv/kraken/channels/esl_sc2/editors",
          "teams": "https://api.twitch.tv/kraken/channels/esl_sc2/teams",
          "videos": "https://api.twitch.tv/kraken/channels/esl_sc2/videos"
        }
      },
      "_links": {
        "self": "https://api.twitch.tv/kraken/streams/esl_sc2",
        "channel": "https://api.twitch.tv/kraken/channels/esl_sc2"
      }
    },
    {
      "stream": null,
      "display_name": "noobs2ninjas",
      "_links": {
        "self": "https://api.twitch.tv/kraken/streams/esl_sc2",
        "channel": "https://api.twitch.tv/kraken/channels/esl_sc2"
      }
    },
    {
      "error": "Not Found",
      "status": 404,
      "message": "Channel 'not-a-valid-account' does not exist"
    }
  ];

  console.log(response);
  processData(response);
});

function processData(res) {
  res.forEach(function(r) {
    console.log(r);
    if (!r.error) {
      streams.push(
        new Stream(r.stream != null ? r.stream.display_name : r.display_name,
          r.stream != null,
          r.stream != null ? r.stream.logo : "",
          r.stream != null ? r.stream.url : r._links.self));
    }
  });
  console.log(streams);

  filterData("All");
}

function filterData(filter) {
  switch (filter) {
    case "Online":
    listItems(streams.filter(function (s) {
      return s.isOnline;
    }));
      break;
    case "Offline":
      listItems(streams.filter(function (s) {
        return !s.isOnline;
      }));
      break;
    default:
      listItems(streams);
  }
}

function listItems(items) {
  $(".list-group").html("");
  items.forEach(function(item) {
    var status = item.isOnline ? "Online" : "Offline";
    $(".list-group").append("<a href=\"" + item.url +
      "\" class=\"list-group-item list-group-item-action\">" +
      "<div class = \"d-flex w-100 justify-content-between align-self-center\">" +
      "<img class = \"icon align-self-center\" src=\"" + item.icon + "\"/>" +
      "<h3 class = \"align-self-center\" >" + item.name + "</h3>" +
      "<h5 class = \"align-self-center\">" + status + "</h5>" +
      "</div>" +
      "</a>")
  });

}
