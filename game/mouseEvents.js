function MouseEvents(builder, canvas, objects){
    
    this.builder = builder;
    this.canvas = canvas;
    this.objects = objects;

    this.processRightClickEvent = function(){
        var builder = this.builder;
        var canvas = this.canvas;
        var objects = this.objects;
        canvas.addEventListener('mousedown', function (e){
            //left button check
            if(e.button == 0){
                objects.forEach(object => {
                    var mousePos = getMousePos(canvas, e);
                    if (mousePos.x >= object.x && mousePos.x <= object.x+object.width && mousePos.y >= object.y && mousePos.y <= object.y+object.height){
                        object.focus = true;
                    } else{
                        object.focus = false;
                    }
                });
            }
            //right button check
            else if(e.button == 2){
                if (builder.focus){
                    var mousePos = getMousePos(canvas, e);
                    builder.changeTargetPosition(mousePos.x, mousePos.y);
                }
            }
        }, false);

        getMousePos = function(canvas, evt) {
            var rect = canvas.getBoundingClientRect();
            return {
                x: evt.clientX - rect.left,
                y: evt.clientY - rect.top
            };
        }
    }
}