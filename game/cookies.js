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
    });
}