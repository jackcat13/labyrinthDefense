const GAME_RESOURCE_BACKEND_PATH = "http://localhost:8080/games";

$(document).ready(function(){
    $("#createGameButton").click(function(e) {
        createGame($("#gameId").val(), $("#gameLabel").val());
    });
});

$(document).on('click', "input.gameJoinButton", function() {
    alert("join game with id:" + $(this).attr("id"));
});

function retrieveAvailableGameList(){
    $.get(GAME_RESOURCE_BACKEND_PATH + "?isGameStarted=false", "").done(function( data ) {
        var gameList = data;
        gameList.forEach(game => {
            $("#gameList").append("<div class='gameList'>"+game.gameId+":"+game.gameLabel+"<input type='submit' value='join' class='gameJoinButton' id='"+game.gameId+"'></input></div>");
        });
    }).fail(function(xhr, status, error) {
        alert("Error while retrieving available games, please contact the support team");
        console.log("xhr: " + JSON.stringify(xhr) + " // status: " + status + " // error: " + error);
    });
}

function createGame(gameId, gameLabel){
    $.post( GAME_RESOURCE_BACKEND_PATH, '{"gameId": "'+gameId+'","gameLabel": "'+gameLabel+'"}').done(function( data ) {
        $("#gameList").append("<div class='gameList'>"+gameId+":"+gameLabel+"<input type='submit' value='join' class='gameJoinButton' id='"+gameId+"'></input></div>");
    }).fail(function(xhr, status, error) {
        alert("Can't create a new game, another game with same Identifier may already exist");
    });
}