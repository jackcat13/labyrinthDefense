function createCookie(name,value,days) {
	if (days) {
		var date = new Date();
		date.setTime(date.getTime()+(days*24*60*60*1000));
		var expires = "; expires="+date.toGMTString();
	}
	else var expires = "";
	document.cookie = name+"="+value+expires+"; path=/";
}

function readCookie(name) {
	var nameEQ = name + "=";
	var ca = document.cookie.split(';');
	for(var i=0;i < ca.length;i++) {
		var c = ca[i];
		while (c.charAt(0)==' ') c = c.substring(1,c.length);
		if (c.indexOf(nameEQ) == 0) return c.substring(nameEQ.length,c.length);
	}
	return null;
}

function eraseCookie(name) {
	createCookie(name,"",-1);
}

var checkAccessToken = function(code){
    var cookieToken = readCookie(LABYRINTH_COOKIE);
    var refreshedCookie = readCookie(DISCORD_REFRESHED_TOKEN);
    eraseCookie(LABYRINTH_COOKIE);
    eraseCookie(DISCORD_REFRESHED_TOKEN);
    if(code != null){
        if (cookieToken == null){
            postTokenAccess(DISCORD_TOKEN_API_PATH, code);
        } else {
            if (refreshedCookie != null && refreshedCookie != ""){
                code = refreshedCookie;
            }
            postRefreshTokenAccess(DISCORD_TOKEN_API_PATH, code);
        }
    }
}

function postTokenAccess(path, code) {
    var form = $('<form id="postTokenAccessForm" action="' + path + '" method="post">' +
        '<input type="hidden" name="client_id" value="657781438799675392"/>' +
        '<input type="hidden" name="client_secret" value="xSvQuMxk8dH_xlaOS0l0vMcB8SPQHZG3"/>' +
        '<input type="hidden" name="grant_type" value="authorization_code"/>' +
        '<input type="hidden" name="code" value="'+code+'"/>' +
        '<input type="hidden" name="redirect_uri" value="http://localhost:9080/game.html"/>' +
    '</form>');
    $('body').append(form);
    $.post( path, $('#postTokenAccessForm').serialize()).done(function( data ) {
        var refreshedToken = data;
        createCookie(LABYRINTH_COOKIE, refreshedToken.access_token, 1);
        createCookie(DISCORD_REFRESHED_TOKEN, refreshedToken.refresh_token, 1);
        getUserInfo(DISCORD_USER_INFO_API_PATH);
    }).fail(function(xhr, status, error) {
        alert("Fail while checking user access, please contact the support team");
    });
}

function postRefreshTokenAccess(path, code) {
    var form = $('<form id="postTokenAccessForm" action="' + path + '" method="post">' +
        '<input type="hidden" name="client_id" value="657781438799675392"/>' +
        '<input type="hidden" name="client_secret" value="xSvQuMxk8dH_xlaOS0l0vMcB8SPQHZG3"/>' +
        '<input type="hidden" name="grant_type" value="refresh_token"/>' +
        '<input type="hidden" name="refresh_token" value="'+code+'"/>' +
        '<input type="hidden" name="redirect_uri" value="http://localhost:9080/game.html"/>' +
    '</form>');
    $('body').append(form);
    $.post( path, $('#postTokenAccessForm').serialize()).done(function( data ) {
        var refreshedToken = data;
        createCookie(LABYRINTH_COOKIE, refreshedToken.access_token, 1);
        createCookie(DISCORD_REFRESHED_TOKEN, refreshedToken.refresh_token, 1);
        getUserInfo(DISCORD_USER_INFO_API_PATH);
    }).fail(function(xhr, status, error) {
        alert("Fail while checking user access, please contact the support team");
    });
}

function getUserInfo(path) {
    var form = $('<form id="postGetUserInfo" action="' + path + '" method="post">' +
    '</form>');
    $('body').append(form);
    $.ajaxSetup({
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded',
            'Authorization': 'Bearer ' + readCookie(LABYRINTH_COOKIE)
        }
    });
    $.get( path, "").done(function( data ) {
        var userInfo = data;
        $("#connectedUser").html(userInfo.username);
        createCookie(USER_INFO_TOKEN, userInfo, 1);
        postTokenToBackend(userInfo);
    }).fail(function(xhr, status, error) {
        alert("Fail while checking user informations, please contact the support team");
    });
}

const PLAYER_RESOURCE_BACKEND_PATH = "http://localhost:8080/players";

function postTokenToBackend(userInfo) {
    $.ajaxSetup({
        headers: {
            'Content-Type': 'application/json'
        }
    });
    $.get(PLAYER_RESOURCE_BACKEND_PATH + "?username=" + userInfo.username, "").done(function( data ) {
        var playerDto = data;
        if (playerDto == null || playerDto == ""){
            $.post(PLAYER_RESOURCE_BACKEND_PATH, JSON.stringify(userInfo)).done(function( data ) {
                alert("First syncronization between discord and the application completed succesfull");
                $("#GameDiv").css("visibility", "visible");
                retrieveAvailableGameList();
            }).fail(function(xhr, status, error) {
                alert("Fail while synchronizing user informations with the server, please contact the support team");
            });
        }else{
            $("#GameDiv").css("visibility", "visible");
            retrieveAvailableGameList();
        }
    }).fail(function(xhr, status, error) {
        alert("Fail while checking user informations with the server, please contact the support team");
        console.log("xhr: " + JSON.stringify(xhr) + " // status: " + status + " // error: " + error);
    });
}