const BUILDER_SPEED = 1000;

function Builder(x, y, width, height){
    GameObject.call(this, x, y, width, height, BUILDER_SPEED);
    this.image = new Image();
    this.image.src = "game/objects/images/builder.png";
}