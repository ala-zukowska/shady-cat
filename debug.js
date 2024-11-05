function debugPainter(worldToScreen){
    let mouseRayIntersects = (x,y) => false; 
    let enabled = false;
    let mousePosition = {x: 0, y: 0};
    let shapes = [];
    function setIntersectFunction(func){
        mouseRayIntersects = func;
    }
    function setMousePosition(x,y){
        mousePosition.x = x;
        mousePosition.y = y;
    }
    function addShape(shape){
        if (enabled){
            shapes.push(shape);
        }
    }
    function toggle(){
        enabled = !enabled;
    }
    function draw(context){
        if (!enabled){
            return;
        }
        for (let shape of shapes){
            let colour = shape.colour;
            context.strokeStyle = colour;
            if (shape.type == "line"){
                context.beginPath();
                let screenA = worldToScreen(shape.a.x, shape.a.y);
                let screenB = worldToScreen(shape.b.x, shape.b.y);
                context.moveTo(screenA.x, screenA.y);
                context.lineTo(screenB.x, screenB.y);
                context.stroke(); 
            } else if (shape.type == "rectangle"){
                let screenA = worldToScreen(shape.a.x, shape.a.y);
                let screenB = worldToScreen(shape.b.x, shape.b.y);
                context.strokeRect(screenA.x, screenA.y, screenB.x-screenA.x, screenB.y-screenA.y);
            }
        }
        let intersectionPoint = mouseRayIntersects(mousePosition.x, mousePosition.y);
        context.strokeStyle = intersectionPoint !== null ? "red" : "green";
        context.fillStyle = "red";
        context.beginPath();
        let screenMouse = worldToScreen(mousePosition.x, mousePosition.y);
        context.moveTo(context.canvas.width/2, context.canvas.height/2);
        context.lineTo(screenMouse.x, screenMouse.y);
        context.stroke(); 
        if (intersectionPoint !== null){
            context.beginPath();
            context.arc(intersectionPoint.x, intersectionPoint.y, 10, 0, 2 * Math.PI);
            context.fill();
        }
        shapes.length = 0;
    }

    return {addShape, toggle, draw, setMousePosition, setIntersectFunction};
}