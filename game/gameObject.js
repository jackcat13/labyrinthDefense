const ELAPSED = 0.01;

function GameObject(x, y, width, height, speed) {
    this.x = x;
    this.y = y;
    this.width = width;
    this.height = height;
    this.speed = speed;
    this.image = "";
    this.focus = true;

    this.xStart = this.x;
    this.yStart = this.y;
    this.xTarget = this.x;
    this.yTarget = this.y;
    this.move = false;

    this.distance = 0.0;
    this.directionX = 0.0;
    this.directionY = 0.0;
 
    this.updateFrame = function(){
        //Updating the frame index 
        curFrame = ++curFrame % frameCount; 
        //Calculating the x coordinate for spritesheet 
        srcX = curFrame * width; 
    }

    this.changeTargetPosition = function(x, y){
        this.xStart = this.x;
        this.yStart = this.y;
        this.xTarget = x;
        this.yTarget = y;
        this.processDistance();
        this.move = true;
    }

    this.processDistance = function(){
        this.distance = Math.sqrt(Math.pow(this.xTarget-this.x,2)+Math.pow(this.yTarget-this.y,2));
        this.directionX = (this.xTarget-this.x) / this.distance;
        this.directionY = (this.yTarget-this.y) / this.distance;
    }

    this.processMovement = function(){
        if (this.move){
            this.x += this.directionX * this.speed * ELAPSED;
            this.y += this.directionY * this.speed * ELAPSED;
            if(Math.sqrt(Math.pow(this.x-this.xStart,2)+Math.pow(this.y-this.yStart,2)) >= this.distance){
                this.x = this.xTarget;
                this.y = this.yTarget;
                this.move = false;
            }
        }
    }

    this.showInfo = function() {
        alert(this.x + "," + this.y + "," + this.speed + "," + this.image + "," + this.focus);
    }
}