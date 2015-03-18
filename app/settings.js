'use strict';


var APISettings = {};
APISettings.clientId = "419658066049438eb0bbd3cd7d726b9a";
APISettings.redirectUri = "http://followforfollow.dev/token.html";
APISettings.scope = ["likes", "comments", "relationships", "basic"];
APISettings.apiUri = "https://instagram.com/oauth/authorize/?client_id=" + APISettings.clientId + "&redirect_uri=" + APISettings.redirectUri + "&response_type=token&scope=likes+comments+relationships+basic";
APISettings.apiBaseUri = "https://api.instagram.com/v1";