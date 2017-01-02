var express = require('express');
var router = express.Router();
var rest = require("restler");

/* GET users listing. */
router.get('/hello', function(req, res, next) {
  res.status(200);
  res.json("Hello You");
});

var sendJSONresponse = function(res, status, content) {
  res.status(status);
  res.json(content);
};

router.post('/login_ivp', function(req, res, next) {
  login_CTAP(req, res);
});

router.post('/login_twitter', function(req, res, next) {
  login_twitter(req, res);
});

router.post('/login_twitch', function(req, res, next) {
  login_twitch(req, res);
});

router.get('/login_twitch', function(req, res, next) {
  twitchOAuthUrl(req, res);
});

login_CTAP = function(req, res) {

    var clientId = process.env.IVP_CLIENT_ID;
    var clientSecret = process.env.IVP_CLIENT_SECRET;

    rest.post("https://cloudsso.cisco.com/as/token.oauth2", {
        data: {
            "client_id": clientId,
            "client_secret": clientSecret,
            "grant_type": "client_credentials"
    }}).on("success", function(token, response){
      console.log("success");
        token.client_id = clientId;
        sendJSONresponse(res, 200, token);
    }).on("fail", function(error, response){
      console.log("failure");
        sendJSONresponse(res, response.statusCode, error);
    });
};

login_twitter = function(req, res) {

    var clientId = process.env.TWITTER_CLIENT_ID;
    var clientSecret = process.env.TWITTER_CLIENT_SECRET;

    rest.post("https://api.twitter.com/oauth2/token", {
        data: {
            "client_id": clientId,
            "client_secret": clientSecret,
            "grant_type": "client_credentials"
    }}).on("success", function(token, response){
      console.log("success");
        token.client_id = clientId;
        sendJSONresponse(res, 200, token);
    }).on("fail", function(error, response){
      console.log("failure");
        sendJSONresponse(res, response.statusCode, error);
    });
};

/**
 * OAuth 2.0 phase 1 : Send the Twitch redirect URL to point the browser to when connecting a Twitch Account
 * @param req
 * @param res
 */
twitchOAuthUrl = function(req, res){

  var url ="https://api.twitch.tv/kraken/oauth2/authorize"+'?';
  url += "response_type=code"+'&';
  url += "client_id="+process.env.TWITCH_CLIENT_ID+'&';
  url += "redirect_uri="+process.env.TWITCH_REDIRECT_URL+'&';
  url += "state=toto";

  sendJSONresponse(res, 200, url);
}

login_twitch = function(req, res) {

  var code = req.query.code;
  var clientId = process.env.TWITCH_CLIENT_ID;
  var clientSecret = process.env.TWITCH_CLIENT_SECRET;

  rest.post("https://api.twitch.tv/kraken/oauth2/token", {
    data: {
      "client_id": clientId,
      "client_secret": clientSecret,
      "grant_type": "authorization_code",
      "redirect_uri":process.env.TWITCH_REDIRECT_URL,
      "code":code
    }}).on("success", function(token, response){
    console.log("success");
    token.client_id = clientId;
    sendJSONresponse(res, 200, token);
  }).on("fail", function(error, response){
    console.log("failure");
    sendJSONresponse(res, response.statusCode, error);
  });
};


module.exports = router;
