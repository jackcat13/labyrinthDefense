const GAME_DIV = "GameDiv"
const GAME_CANVAS = "GameCanvas"
const WIDTH = "width"
const HEIGHT = "height"
const GAME_WIDTH = "1200"
const GAME_HEIGHT = "700"
const SIZE_UNIT = "px"
const CURSOR_STYLE = "cursor"
const GAME_DIMENSIONS = "2d"
const HTML5_WARNING = "Your browser doesn't support HTML5, please update it!"
const LABYRINTH_COOKIE = "labyrinthDefenseUser"
const DISCORD_REFRESHED_TOKEN = "labyrinthDefenseUserRefreshed"
const DISCORD_TOKEN_API_PATH = "https://discordapp.com/api/oauth2/token"
const DISCORD_USER_INFO_API_PATH = "https://discordapp.com/api/users/@me"
const USER_INFO_TOKEN = "userInfoToken"

function Game() {
    // la <div> qui contient l'élément canvas
    this.div = document.getElementById(GAME_DIV);
    this.div.style.width = GAME_WIDTH + SIZE_UNIT;
    this.div.style.height = GAME_HEIGHT + SIZE_UNIT;
 
    // l'élément <canvas>
    this.canvas = document.getElementById(GAME_CANVAS);
    this.canvas.setAttribute(WIDTH, GAME_WIDTH);
    this.canvas.setAttribute(HEIGHT, GAME_HEIGHT);
    this.canvas.defaultWidth = this.canvas.width;
    this.canvas.defaultHeight = this.canvas.height;
 
    // to prevent the context menu popping up
    this.canvas.addEventListener("contextmenu", (event) => {
        event.preventDefault();
    });
 
    // context 2d
    this.ctx = this.canvas.getContext(GAME_DIMENSIONS);
    if(!this.ctx){
        alert(HTML5_WARNING);
    }

    this.gameLoop = new GameLoop(this.canvas, this.ctx, GAME_WIDTH, GAME_HEIGHT);
    this.gameLoop.loop();
}
 
function StartGame(){
    // crée une instance de game
    game = new Game();
}
 
window.addEventListener('load', function() {
    checkAccessToken(getQueryString("code"));
    StartGame();
}, true);

var getQueryString = function ( field, url ) {
	var href = url ? url : window.location.href;
	var reg = new RegExp( '[?&]' + field + '=([^&#]*)', 'i' );
	var string = reg.exec(href);
	return string ? string[1] : null;
};

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