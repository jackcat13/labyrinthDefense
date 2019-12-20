const FOCUS_MARGIN = 5
const BACKGROUND_IMAGE = "game/assets/background.png"

function GameLoop(canvas, ctx, gameWidth, gameHeight){

    gameLoop = this
    this.canvas = canvas;
    this.ctx = ctx;
    this.gameWidth = gameWidth;
    this.gameHeight = gameHeight;
    this.objects = new Array();
    this.builder = new Builder(50, 50, 30, 30);
    this.objects.push(this.builder);
    this.mouseEvents = new MouseEvents(this.builder, this.canvas, this.objects);
    this.particleManager = new ParticleManager(this.ctx);

    var backroundImage = new Image();
    backroundImage.src = BACKGROUND_IMAGE;

    this.loop = function() {
   
        if(!this.paused) {
            // mettre à jour tous les objets
            this.update(); 
        }
 
        // dessine toute la scène sur l'écran
        this.draw();
         
        window.requestAnimFrame(function() {
            // relance la fonction loop sur chaque image
            gameLoop.loop(); 
        });
    }

    this.draw = function(){
        this.objects.forEach(object => {
            this.ctx.drawImage(object.image, object.x-object.halfWidth(), object.y-object.halfHeight(), object.width, object.height)
            if (object.focus){
                this.ctx.strokeStyle = "#4EDC5B";
                this.ctx.strokeRect(object.x-FOCUS_MARGIN-object.halfWidth(), object.y-FOCUS_MARGIN-object.halfHeight(), object.width+(FOCUS_MARGIN*2), object.height+(FOCUS_MARGIN*2));
            }
            if (object instanceof Builder){
                this.particleManager.createExplosion(object.x-object.halfWidth()+5, object.y+object.height-object.halfHeight(), 5, 2, 10, 10, 0);
                this.particleManager.createExplosion(object.x-object.halfWidth()+object.width-5, object.y+object.height-object.halfHeight(), 5, 2, 10, 10, 0);
                this.particleManager.draw();
            }
        });
    }

    this.update = function(){
        this.ctx.drawImage(backroundImage, 0, 0, this.gameWidth, this.gameHeight);
        this.mouseEvents.processRightClickEvent();
        this.objects.forEach(object => {
            object.processMovement();
        });
    }
}