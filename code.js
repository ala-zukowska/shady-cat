function game(scene, parameters){

    const canvas=parameters.canvas;
    const ctx=canvas.getContext("2d");
    let UNITS_IN_WIDTH = parameters.unitsInWidth;
    const PIXELS_PER_UNIT = (canvas.width / UNITS_IN_WIDTH) | 0;
    let CENTER_X_IN_UNITS = UNITS_IN_WIDTH/2;
    let CENTER_Y_IN_UNITS = (canvas.height / PIXELS_PER_UNIT)/2;
    let cat = scene.objects.find(obj => obj.type == "player");
    const dbg = debugPainter(worldToScreen);
    let lightCanvas = new OffscreenCanvas(canvas.width, canvas.height);
    const lightCtx = lightCanvas.getContext("2d");
    lightCtx.filter = "blur(7px)";

    const images = {
        catSprite: document.getElementById("catSprite"),
        mouseSprite: document.getElementById("mouseSprite"),
        ratSprite: document.getElementById("ratSprite"),
        wolfSprite: document.getElementById("wolfSprite"),
        tileset2: document.getElementById("tileset2"),
        blacksmith: document.getElementById("blacksmith"),
        woodshop: document.getElementById("woodshop"),
        lightSource: document.getElementById("lightSource"),
        medieval: document.getElementById("medieval"),
        baseAssets: document.getElementById("baseAssets"),
        hearts: document.getElementById("hearts"),
    }

    dbg.setIntersectFunction((x,y) => {
        let centerX = scene.camera.x;
        let centerY = scene.camera.y;
        let directionX = (x - centerX);
        let directionY = (y - centerY);
        let results = getSegmentsForObjects(getObjectBoundaries(scene.objects.filter(obj => obj.lineOfSightBox && obj.type != "player")))
            .map(segment => {
                let tmp = rayToSegmentIntersection(
                    {x: centerX, y: centerY}, 
                    {x: directionX, y: directionY}, 
                    segment.a, 
                    segment.b);
                tmp = rayToSegmentIntersection(
                    {x: centerX, y: centerY}, 
                    {x: directionX, y: directionY}, 
                    segment.a, 
                    segment.b);
                return tmp;
            })
            .filter(intersection => intersection !== null);
        if (results.length == 0){return null}
        let result = results.reduce((prev, curr) => utils.sqrDistance(prev,{x: centerX, y: centerY}) < utils.sqrDistance(curr,{x: centerX, y: centerY},) ? prev : curr);;
        return result ? worldToScreen(result.x,result.y) : null;
    })

    function spawnObject(object, number, x1, y1, x2, y2){
        let spawned = 0;
        let loops = 0;
        while (spawned < number && loops < 10000){
            let x = utils.rand(x1,x2);
            let y = utils.rand(y1,y2);
            let newObject = utils.deepCopy({...object, x: x, y: y});
            if (newObject.type == "light"){
                scene.objects.push(newObject);
                spawned += 1;
            } else if (scene.objects.some(obj => checkCollision(newObject,obj)) == false) {
                scene.objects.push(newObject);
                spawned += 1;
            } 
            loops += 1;
        }
    }

    let lastTime;

    function init() {
        if (scene.audio){
            scene.audio.chooseWindow.muted = false;
        }
        if (parameters.setup){
            parameters.setup(spawnObject, chooseCat);
            cat = scene.objects.find(obj => obj.type == "player");
            
        }
        lastTime = Date.now();
        window.requestAnimationFrame(update);
        
    }

    function removeFromScene(object){
        utils.removeFromArray(scene.objects, object)
    }

    function screenToWorld(x,y = 0){
        return {
            x : (x / PIXELS_PER_UNIT) - CENTER_X_IN_UNITS + scene.camera.x, 
            y : (y / PIXELS_PER_UNIT) - CENTER_Y_IN_UNITS + scene.camera.y
        };
    }

    function worldToScreen(x,y = 0){
        return {
            x : (x + CENTER_X_IN_UNITS - scene.camera.x) * PIXELS_PER_UNIT, 
            y : (y + CENTER_Y_IN_UNITS - scene.camera.y) * PIXELS_PER_UNIT
        };
    }

    function onSegment(a,b,r){
        if (r.x >= Math.min(a.x,b.x) && r.x <= Math.max(a.x,b.x) && 
        r.y >= Math.min(a.y,b.y) && r.y <= Math.max(a.y,b.y)){
            return true
        }
        return false
    }

    function whichOrientation(a,b,r){
        let orient = (b.y - a.y)*(r.x - b.x)-(r.y - b.y)*(b.x - a.x);

        if (orient == 0){
            return 0
        }
        return (orient>0)? 1 : 2;
    }

    function intersection(a1,b1,a2,b2){
        let or1 = whichOrientation(a1,b1,a2);
        let or2 = whichOrientation(a1,b1,b2);
        let or3 = whichOrientation(a2,b2,a1);
        let or4 = whichOrientation(a2,b2,b1);

        if (or1 != or2 && or3 != or4){
            return true
        } else if (or1 == 0 && onSegment(a1,b1,a2)){
            return true
        } else if (or2 == 0 && onSegment(a1,b1,b2)){
            return true
        } else if (or3 == 0 && onSegment(a2,b2,a1)){
            return true
        } else if (or4 == 0 && onSegment(a2,b2,b1)){
            return true
        }
        return false
    }

    function findBoundingBoxCorners(object, whichBoundingBox){
        let boundingBox;
        if (whichBoundingBox == "lineOfSightBox"){
            let currentAnimation = object.currentAnimation ? object.currentAnimation : "idle";
            boundingBox = object.lineOfSightBox[currentAnimation];
        } else if (whichBoundingBox == "collisionBox"){
            boundingBox = object.collisionBox;
        }
        let x1 = object.x + boundingBox.x1 * object.size;
        let y1 = object.y + boundingBox.y1 * object.size;
        let x2 = object.x + boundingBox.x2 * object.size;
        let y2 = object.y + boundingBox.y2 * object.size;
        // a1 left-top, clockwise
        let a1 = {
            x: x1,
            y: y1
        };
        let a2 = {
            x: x2,
            y: y1
        };
        let a3 = {
            x: x2,
            y: y2
        };
        let a4 = {
            x: x1,
            y: y2
        };
        dbg.addShape({
            type: "rectangle",
            colour: whichBoundingBox == "collisionBox" ? "red" : "blue",
            a: a1,
            b: a3,
        });
        return [a1,a2,a3,a4]
    
    }

    function isInLineOfSight(prey, predator){
        let p = {
            x: prey.x + (prey.size/2),
            y: prey.y + (prey.size/2)
        };
        let q = {
            x: predator.x + (predator.size/2),
            y: predator.y + (predator.size/2)
        };
        for (let object of scene.objects){
            if (object.type == "prop" && object.lineOfSightBox !== null){
                let corners = findBoundingBoxCorners(object, "lineOfSightBox");
                let a1 = corners[0];
                let a2 = corners[1];
                let a3 = corners[2];
                let a4 = corners[3];
                if (intersection(p,q,a1,a2) || intersection(p,q,a2,a3) || 
                intersection(p,q,a4,a3) || intersection(p,q,a1,a4)) {
                    return false
                }
            }
        }
        dbg.addShape({
            type: "line",
            colour: "yellow",
            a: p,
            b: q,
        });
        return true
    }

    function getAnimationFromVelocity(vx,vy){
        if (vx > 0){
            return "walkRight";
        } else if (vx < 0){
            return "walkLeft";
        } else if (vy > 0) {
            return "walkDown";
        } else if (vy < 0) {
            return "walkUp";
        }
        return "idle";
    }

    function walkTo(sprite,x,y, stop = false){
        let dx = Math.abs(sprite.x - x);
        let dy = Math.abs(sprite.y - y);
        if (stop == true){
            sprite.velocityX = 0;
            sprite.velocityY = 0;
        } else if (dx > dy && stop == false){
            sprite.velocityX = x > sprite.x ? 1.0: -1.0;
            sprite.velocityY = 0;
            sprite.currentAnimation = getAnimationFromVelocity(sprite.velocityX, sprite.velocityY);
        } else if (dy > dx && stop == false){
            sprite.velocityY = y > sprite.y ? 1.0: -1.0;
            sprite.velocityX = 0;
            sprite.currentAnimation = getAnimationFromVelocity(sprite.velocityX, sprite.velocityY);
        }

    }

    function predatorBrain(predator,player){
        let dx = predator.x - player.x;
        let dy = predator.y - player.y;
        let distanceSqr = dx * dx + dy * dy;
        if (predator.sound == undefined){
            predator.sound = scene.audio.wolfGrowl.cloneNode(true)
        }
        if (predator.sound2 == undefined){
            predator.sound2 = scene.audio.wolfSteps.cloneNode(true)
        }
        if (distanceSqr < 6 && isInLineOfSight(predator,player) && 
        predator.velocityX == 0 && predator.velocityY == 0) {
            walkTo(predator, player.x, player.y);
            predator.sound.play();
            predator.sound2.play();
        } else if (distanceSqr > 8 || isInLineOfSight(predator,player) == false) {
            walkTo(predator, player.x, player.y, stop = true);
            predator.currentAnimation = getAnimationFromVelocity(predator.velocityX, predator.velocityY);
            predator.sound2.pause();
            predator.sound2.currentTime = 0;
            predator.sound.pause();
            predator.sound.currentTime = 0;
        } else if (distanceSqr < 2) {
            walkTo(predator, player.x, player.y, stop = true);
        }
    }

    function preyBrain(prey,predator){
        let dx = predator.x - prey.x;
        let dy = predator.y - prey.y;
        let distanceSqr = dx * dx + dy * dy;
        if (prey.isStuck) {
            let aux = prey.velocityX;
            prey.velocityX = prey.velocityY;
            prey.velocityY = aux;
            prey.currentAnimation = getAnimationFromVelocity(prey.velocityX, prey.velocityY);
            prey.isStuck = false;
        } 
        if (prey.sound == undefined){
            prey.sound = scene.audio.mouse.cloneNode(true)
        }
        if (distanceSqr<4){
            prey.sound.play();
        } else if (distanceSqr>32){
            prey.sound.pause();
            prey.sound.currentTime = 0;
        }
        if (distanceSqr < 4 && isInLineOfSight(prey,predator) && 
        prey.velocityX == 0 && prey.velocityY == 0) {
            if (Math.abs(dx)<Math.abs(dy)) {
                
                prey.velocityX = dx<0 ? 1.0 : -1.0;
                prey.velocityY = 0;
                prey.currentAnimation = getAnimationFromVelocity(prey.velocityX, prey.velocityY);
            } else {
                prey.velocityY = dy<0 ? 1.0 : -1.0;
                prey.velocityX = 0;
                prey.currentAnimation = getAnimationFromVelocity(prey.velocityX, prey.velocityY);
            }
        } else if (distanceSqr > 16) {
            prey.velocityX = 0;
            prey.velocityY = 0;
            prey.currentAnimation = getAnimationFromVelocity(prey.velocityX, prey.velocityY);
            prey.isStuck = false;
        }
    }

    function isOverlapping(a1,b1,a2,b2){
        return !(a1.x > b2.x || a2.x > b1.x) && !(a1.y > b2.y || a2.y > b1.y);
    }

    function bounceBack(object){
        if (object.velocityY == 0){
            let oldX = object.x;
            object.velocityX < 0 ? object.x = object.x +utils.rand(1,2) : object.x = object.x +utils.rand(-2,-1);
            for (let stuff of scene.objects){
                if (stuff.type == "prop"){
                    if (checkCollision(stuff,object)){
                        object.x = oldX;
                        break;
                    }
                }
                
            }
        } else if (object.velocityX == 0){
            let oldY = object.y;
            object.velocityY < 0 ? object.y = object.y +utils.rand(1,2) : object.y = object.y +utils.rand(-2,-1);
            for (let stuff of scene.objects){
                if (stuff.type == "prop"){
                    if (checkCollision(stuff,object)){
                        object.y = oldY;
                        break;
                    }
                }
            }
        }
    }

    function checkCollision(object1, object2, dx = 0, dy = 0){
        if (object1.collisionBox === null || object2.collisionBox === null){
            return false;
        }
        let [a1,a2,a3,a4] = findBoundingBoxCorners(object1, "collisionBox");
        let [b1,b2,b3,b4] = findBoundingBoxCorners(object2, "collisionBox");
        if (isOverlapping({x: a1.x+dx, y: a1.y+dy},{x: a3.x+dx, y: a3.y+dy},b1,b3)){
            if (object1.type == "prey"){
                object1.isStuck = true;
            }
            if (object1.type == "prey" && object2.type =="player"){
                scene.playerScore += object1.scoreValue;
                removeFromScene(object1);
            } else if (object1.type == "player" && object2.type =="prey"){
                scene.playerScore += object2.scoreValue;
                removeFromScene(object2);
            }
            if (object1.type == "predator" && object2.type =="player" && scene.playerLives > 1){
                scene.playerLives -= 1;
                bounceBack(object1);
            } else if (object2.type == "predator" && object1.type =="player" && scene.playerLives > 1){
                scene.playerLives -= 1;
                bounceBack(object2);
            } else if (((object2.type == "predator" && object1.type =="player") 
                || (object1.type == "predator" && object2.type =="player")) 
                && scene.playerLives == 1) {
                scene.playerLives -= 1;
            }
            return true;
        }
        return false;
    }

    function walkInLoop(walk){
        let path = walk.path;
        let currentX = cat.x;
        let currentY = cat.y;
        let currentElement = path[walk.currentIndex];
        if (path.length == 0){
            cat.velocityX = 0;
            cat.velocityY = 0;
            cat.currentAnimation = "idle";
        }
        if (currentElement.direction == "R"){
            if (currentX <= currentElement.destinationX) {
                cat.velocityX = 1.0;
                cat.velocityY = 0;
                cat.currentAnimation = getAnimationFromVelocity(cat.velocityX, cat.velocityY);
            } else {
                walk.currentIndex = (walk.currentIndex+1)%path.length;
            }
        }
        if (currentElement.direction == "L" ){
            if (currentX >= currentElement.destinationX) {
                cat.velocityX = -1.0;
                cat.velocityY = 0;
                cat.currentAnimation = getAnimationFromVelocity(cat.velocityX, cat.velocityY);
            } else {
                walk.currentIndex = (walk.currentIndex+1)%path.length;
            }  
        } 
        if (currentElement.direction == "D"){
            if (currentY <= currentElement.destinationY) {
                cat.velocityY = 1.0;
                cat.velocityX = 0;
                cat.currentAnimation = getAnimationFromVelocity(cat.velocityX, cat.velocityY);
            } else {
                walk.currentIndex = (walk.currentIndex+1)%path.length;
            }  
        } 
        if (currentElement.direction == "U"){
            if (currentY >= currentElement.destinationY) {
                cat.velocityY = -1.0;
                cat.velocityX = 0;
                cat.currentAnimation = getAnimationFromVelocity(cat.velocityX, cat.velocityY);
            } else {
                walk.currentIndex = (walk.currentIndex+1)%path.length;
            }
            
        }
    }

    function update(){
        if (scene.walkState){
            walkInLoop(scene.walkState);
        }
        const deltaTime = Date.now() - lastTime;
        lastTime = Date.now();
        draw(lastTime);
        scene.objects.sort((a,b) => (a.zOrder - b.zOrder)*1000000 + ( a.y - b.y));
        for (let object of scene.objects){
            if (object.type == "prey") {
                preyBrain(object,cat);
            }
            if (object.type == "predator"){
                predatorBrain(object,cat);
            }
            let vScale = ("velocityScale" in object) ? object.velocityScale : 1.0;
            let dx = object.velocityX * (deltaTime / 1000) * vScale;
            let dy = object.velocityY * (deltaTime / 1000) * vScale; 
            if (!(dx == 0 && dy == 0) 
                && scene.objects.some(target => target !== object 
                && target.collisionBox 
                && checkCollision(object,target,dx,dy)) == false){
                object.x += dx;
                object.y += dy;
            }             
        }
        if (scene.camera.onCat == true){
            scene.camera.x = cat.x + (cat.size / 2);
            scene.camera.y = cat.y + (cat.size / 2);
        }
        
        if (scene.cameraLight) {
            scene.cameraLight.x = scene.camera.x;
            scene.cameraLight.y = scene.camera.y;
        }
        window.requestAnimationFrame(update);
    }

    function draw(lastTime){
        ctx.fillStyle = parameters.backgroundColour;
        ctx.fillRect(0,0,canvas.width, canvas.height);
        lightCtx.clearRect(0,0,lightCanvas.width, lightCanvas.height)
        if (scene.cameraLight){
            lightCtx.fillStyle = "black";
            lightCtx.fillRect(0,0,lightCanvas.width, lightCanvas.height);
        }
        for (let object of scene.objects){
            if (object.type == "light") {
                if (utils.isObjectInBoundries(object, cat.x-10, cat.y-7, cat.x+10, cat.y+7)){
                    updateLightNoise(object);
                    let lightPolygon = computeLightPolygon({x: object.x + object.noiseParameters[0].value, y: object.y + object.noiseParameters[1].value, size: object.size});
                    drawLight(object, lightPolygon);
                }
            } else if (object.animations){
                drawSprite(object, lastTime);
            } else {
                drawProp(object);
            }
        }  
        ctx.globalCompositeOperation = "multiply";
        ctx.drawImage(lightCanvas,0,0);
        ctx.globalCompositeOperation = "source-over";
        if (scene.playerScore != undefined){drawScore()};
        if (scene.playerLives != undefined){drawLives()};
        dbg.draw(ctx);
    }

    function updateLightNoise(light){
        const alpha = 0.02;
        for (let p of light.noiseParameters){
            let sample = utils.rand(-p.range,p.range)*light.flicker;
            p.value = sample * alpha + p.value * (1 - alpha);
        }
    }

    function getObjectsInRange(x,y,range){
        let result = [];
        for (let object of scene.objects){
            let dx = object.x - x;
            let dy = object.y - y;
            let distSqr = dx * dx + dy * dy;
            if (distSqr <= range * range){
                result.push(object);
            }
        }
        return result;
    }

    function rayToSegmentIntersection(o,direction,a,b){
        let v1x = o.x - a.x;
        let v1y = o.y - a.y;
        let v2x = b.x - a.x;
        let v2y = b.y - a.y;
        let v3x = -direction.y;
        let v3y = direction.x;
        let t1numerator = v2x*v1y - v1x*v2y;
        let denom = v2x*v3x + v2y*v3y;
        let t2numerator = v1x*v3x + v1y*v3y;
        if (denom == 0){
            return null
        } 
        let t2 = t2numerator/denom;
        let t1 = t1numerator/denom;
        if (t1 >= 0 && t2 >= 0 && t2 <=1){
            return {x: o.x + direction.x*t1, y: o.y + direction.y*t1}
        }
        return null
    }

    function pickCorrectIntersection(intersections, light){
        let sortedIntersections = intersections.sort((a,b) => utils.sqrDistance(a,light) - utils.sqrDistance(b,light));
        if (sortedIntersections.length == 0){
            return [];
        } else if (sortedIntersections.length == 1){
            return sortedIntersections [0];
        } else {
            let i = 1;
            let candidate = sortedIntersections[i];
            while (i+1 < sortedIntersections.length){
                let nextCandidate = sortedIntersections[i+1];
                let previousCandidate = sortedIntersections[i-1];
                if (!isSamePoint(previousCandidate, candidate) && !isSamePoint(nextCandidate, candidate)){
                    break;
                }
                i++;
                candidate = sortedIntersections[i];
            }
            return sortedIntersections[i >= sortedIntersections.length ? (sortedIntersections.length-1) : i];

        }

        function isSamePoint(previousCandidate, candidate) {
            return Math.abs(previousCandidate.x - candidate.x) < 0.001 && Math.abs(previousCandidate.y - candidate.y) < 0.001;
        }
    }

    function computeLightPolygon(light){
        let objectsInRange = getObjectsInRange(light.x, light.y, light.size+2).filter(obj => obj.lineOfSightBox && obj.type =="prop");
        let objectBoundaries = getObjectBoundaries(objectsInRange);
        let points = objectBoundaries.flat();
        let allPoints = getAllPointsForLight(points, light);
        let segments = getSegmentsForObjects(objectBoundaries);
        addBigBoxSegmentsForLight(light, segments, allPoints);
        let rays = allPoints.map(point => ({x: point.x - light.x, y: point.y - light.y}));
        let polygon = rays.flatMap(ray => {
            let intersections = segments.flatMap(segment => {
                let intersection = rayToSegmentIntersection(light,ray,segment.a,segment.b);
                if (intersection === null) {
                    return [];
                }
                let dx = intersection.x - light.x;
                let dy = intersection.y - light.y;
                let dot = dx*ray.x + dy*ray.y;
                return dot > 0 ? [intersection] : [];
            });
            return pickCorrectIntersection(intersections, light);
        });
        polygon.sort((a,b) => Math.atan2(a.y-light.y,a.x-light.x)-Math.atan2(b.y-light.y,b.x-light.x));
        for (let i=1; i<=polygon.length; i++){
            dbg.addShape({type: "line", colour: "green", a: polygon[i-1], b: polygon[i%polygon.length]});
        }
        return polygon;
    }

    function addBigBoxSegmentsForLight(light, segments, points) {
        let bigBoxSize = (light.size + 2) * 2;
        let p1 = { x: light.x - bigBoxSize, y: light.y - bigBoxSize };
        let p2 = { x: light.x + bigBoxSize, y: light.y - bigBoxSize };
        let p3 = { x: light.x + bigBoxSize, y: light.y + bigBoxSize };
        let p4 = { x: light.x - bigBoxSize, y: light.y + bigBoxSize };
        segments.push({ a: p1, b: p2 });
        segments.push({ a: p2, b: p3 });
        segments.push({ a: p3, b: p4 });
        segments.push({ a: p4, b: p1 });
        points.push(p1,p2,p3,p4);
        dbg.addShape({type: "line", colour: "purple", a: p1, b: p2});
        dbg.addShape({type: "line", colour: "purple", a: p2, b: p3});
        dbg.addShape({type: "line", colour: "purple", a: p3, b: p4});
        dbg.addShape({type: "line", colour: "purple", a: p4, b: p1});

    }

    function getObjectBoundaries(objectsInRange) {
        return objectsInRange.map(obj => findBoundingBoxCorners(obj, "lineOfSightBox"));
    }

    function getSegmentsForObjects(objectBoundaries) {
        return objectBoundaries.flatMap(bs => {
            let result = [];
            for (let i = 1; i <= bs.length; i++) {
                result.push({ a: bs[i - 1], b: bs[i % bs.length] });
            }
            return result;
        });
    }

    function getAllPointsForLight(points, light) {
        return points.flatMap(point => {
            let directionX = point.x - light.x;
            let directionY = point.y - light.y;
            let directionLength = Math.sqrt(directionX * directionX + directionY * directionY);
            directionX /= directionLength;
            directionY /= directionLength;
            let perpendicularX = -directionY;
            let perpendicularY = directionX;
            return [
                { x: point.x - perpendicularX * 0.001, y: point.y - perpendicularY * 0.001 },
                point,
                { x: point.x + perpendicularX * 0.001, y: point.y + perpendicularY * 0.001 }
            ];
        });
    }

    function drawLight(light, lightPolygon){
        if (lightPolygon.length == 0){
            return;
        }
        let {x,y} = worldToScreen(light.x, light.y)
        const gradient = lightCtx.createRadialGradient(x, y, 0, x, y, (light.size + light.noiseParameters[2].value) * PIXELS_PER_UNIT);
        const r = light.colour.r;
        const g = light.colour.g;
        const b = light.colour.b;
        gradient.addColorStop(0, `rgb(${r},${g},${b})`);
        gradient.addColorStop(0.3, `rgb(${r},${g},${b})`);
        gradient.addColorStop(0.6, `rgb(${r>>1},${g>>1},${b>>1})`);
        gradient.addColorStop(0.8, `rgb(${r>>2},${g>>2},${b>>2})`);
        gradient.addColorStop(0.9, `rgb(${r>>3},${g>>3},${b>>3})`);
        gradient.addColorStop(1, "rgb(0,0,0)");
        lightCtx.globalCompositeOperation = "lighter";
        lightCtx.fillStyle = gradient;
        lightCtx.beginPath();
        let firstPoint = worldToScreen(lightPolygon[0].x, lightPolygon[0].y);
        lightCtx.moveTo(firstPoint.x, firstPoint.y);
        for (let i = 1; i < lightPolygon.length; i++) {
            let currentPoint = worldToScreen(lightPolygon[i].x, lightPolygon[i].y);
            lightCtx.lineTo(currentPoint.x, currentPoint.y);

        }
        lightCtx.closePath();
        lightCtx.fill();

    }


    function drawProp(object) {
        let {x,y} = worldToScreen(object.x, object.y);
        let size = object.size * PIXELS_PER_UNIT;
        const image = images[object.image];
        ctx.drawImage(image,
            object.tileWidth * object.tileI,
            object.tileHeight * object.tileJ,
            object.tileWidth,
            object.tileHeight,
            x,
            y,
            size,
            size,
        );
    }

    function drawSprite(object, time) {
        let {x,y} = worldToScreen(object.x, object.y);
        let size = object.size * PIXELS_PER_UNIT;
        let { i, j } = getTileIndeces(object, time);
        const image = images[object.image];
        ctx.drawImage(image,
            object.tileWidth * i,
            object.tileHeight * j,
            object.tileWidth,
            object.tileHeight,
            x,
            y,
            size,
            size,
        );
    }
    function getTileIndeces(object, time) {
        let i = object.tileI ? object.tileI : 0;
        let j = object.tileJ ? object.tileJ : 0;
        if (object.currentAnimation != null) {
            let animation = object.animations[object.currentAnimation];
            let speed = "animationSpeed" in object ? object.animationSpeed : 1.0;
            let frameDuration = animation.duration / animation.tiles.length;
            let frameIndex = (((time * speed) % animation.duration) / frameDuration) | 0;
            i = animation.tiles[frameIndex].i;
            j = animation.tiles[frameIndex].j;


        }
        return { i, j };
    }

    const movementStack = []

    function handleKeyUp(event) {
        const multiplier = event.shiftKey ? 3.5 : 1.0;
        cat.velocityScale = multiplier;
        cat.animationSpeed = multiplier;
        if (["KeyW", "KeyS", "KeyA", "KeyD"].includes(event.code)) {
            utils.removeFromArray(movementStack, event.code);
            if (movementStack.length == 0) {
                cat.currentAnimation = "idle";
                cat.velocityY = 0;
                cat.velocityX = 0;
            }
            else {
                handleMovement(movementStack[movementStack.length - 1]);
            }
        } else if (event.code == "Equal"){
            dbg.toggle();
        } else if (event.code == "KeyF"){
            toggleFullscreen(event.code);
        } else if (event.code == "KeyM"){
            toggleMusic();
        } else if (event.code == "KeyN"){
            toggleSoundEffects();
        } 
    }

    function handleKeyDown(event) {
        let key = event.code;
        const multiplier = event.shiftKey ? 3.5 : 1.0;
        cat.velocityScale = multiplier;
        cat.animationSpeed = multiplier;
        handleMovement(key);
        if (["KeyW", "KeyS", "KeyA", "KeyD"].includes(key)) {
            if (!movementStack.includes(key)) {
                movementStack.push(key);
            }
        }
    }

    function handleMouseMove(event) {
        let rect = canvas.getBoundingClientRect();
        let scaleX = canvas.width / rect.width;   
        let scaleY = canvas.height / rect.height;  
        let {x,y} = screenToWorld((event.clientX - rect.left) * scaleX, (event.clientY - rect.top) * scaleY);
        dbg.setMousePosition(x,y);
    }

    function handleMovement (key) {
        const speed = 0.6;
        if (key == "KeyW") {
            cat.currentAnimation = "walkUp";
            cat.velocityY = -speed;
            cat.velocityX = 0;
        }
        else if (key == "KeyS") {
            cat.currentAnimation = "walkDown";
            cat.velocityY = speed;
            cat.velocityX = 0;
        }
        else if (key == "KeyA") {
            cat.currentAnimation = "walkLeft";
            cat.velocityY = 0;
            cat.velocityX = -speed;
        }
        else if (key == "KeyD") {
            cat.currentAnimation = "walkRight";
            cat.velocityY = 0;
            cat.velocityX = speed;
        }
    }

    function toggleMusic(){
        document.getElementById("musicButton") 
        ? utils.toggleButtonById("musicButton", "musicButtonOff", {"onclick": "toggleMusic()"}) 
        : utils.toggleButtonById("musicButtonOff","musicButton", {"onclick": "toggleMusic()"});
        if (document.getElementById("musicButtonOff")){
            scene.audio.mainTheme.volume = 0;
            scene.audio.chooseWindow.volume = 0;
            document.getElementById("musicRange").value = 0;
        } else {
            scene.audio.mainTheme.volume = 1;
            scene.audio.chooseWindow.volume = 1;
            document.getElementById("musicRange").value = 100;
        }
    
    }

    function toggleSoundEffects(){
        document.getElementById("soundEffectsButton") ? 
        utils.toggleButtonById("soundEffectsButton", "soundEffectsButtonOff",  {"onclick": "toggleSoundEffects()"}) 
        : utils.toggleButtonById("soundEffectsButtonOff","soundEffectsButton", {"onclick": "toggleSoundEffects()"});
        if (document.getElementById("soundEffectsButtonOff")){
            for (let object of scene.objects){
                if (object.type == "prey"){
                    object.sound.volume = 0;
                } else if (object.type == "predator"){
                    object.sound.volume = 0;
                    object.sound2.volume = 0;
                }
            }
            document.getElementById("soundRange").value = 0;
        } else if (document.getElementById("soundEffectsButton")){
            for (let object of scene.objects){
                if (object.type == "prey"){
                    object.sound.volume = 1;
                } else if (object.type == "predator"){
                    object.sound.volume = 1;
                    object.sound2.volume = 1;
                }
            }
            document.getElementById("soundRange").value = 100;
        }
    }

    function toggleFullscreen(event) {
        if (!document.fullscreenElement) {
            document.documentElement.requestFullscreen();
            document.getElementById("fullScreenToggle").checked = true;
          } else {
            document.exitFullscreen();
            document.getElementById("fullScreenToggle").checked = false;
          }
    }

    function resizeToFullScreen(){
        canvas.width = screen.width - 3;
        canvas.height = screen.height - 3;

        UNITS_IN_WIDTH = canvas.width / PIXELS_PER_UNIT;
        CENTER_X_IN_UNITS = UNITS_IN_WIDTH/2;
        CENTER_Y_IN_UNITS = (canvas.height / PIXELS_PER_UNIT)/2;
        lightCanvas.width = canvas.width;
        lightCanvas.height = canvas.height;
        draw();
    }

    function sizeBack(){
        if (!document.fullscreenElement && !document.webkitIsFullScreen && !document.mozFullScreen && !document.msFullscreenElement) {
            canvas.width = 1024;
            canvas.height = 576;

            UNITS_IN_WIDTH = canvas.width / PIXELS_PER_UNIT;
            CENTER_X_IN_UNITS = UNITS_IN_WIDTH/2;
            CENTER_Y_IN_UNITS = (canvas.height / PIXELS_PER_UNIT)/2;
            lightCanvas.width = canvas.width;
            lightCanvas.height = canvas.height;
            draw();
        }
        
    }


    function handleFullscreenChange(event) {
        if (document.fullscreenElement) {
          resizeToFullScreen();
        } else {
          sizeBack();
        }
      }

    function chooseCat (colour) {
        for (let animation of Object.values(cat.animations)) {
            for (let tile of Object.values(animation.tiles)){
                if (colour == "white") {tile.i = tile.i%4 + (4 * 0)}
                else if (colour == "orange") {tile.i = tile.i%4 + (4 * 1)}
                else if (colour == "brown") {tile.i = tile.i%4 + (4 * 2)}
                else if (colour == "black") {tile.i = tile.i%4 + (4 * 3)}
            }
        }
    }

    function drawScore() {
        ctx.textAlign = "center";
        ctx.font = "32px Alagard";
        ctx.fillStyle = "#FFE5B4";
        ctx.fillText(`Score: ${scene.playerScore }`, canvas.width * 0.5, canvas.height * 0.12);
      }
    
    function drawLives(){
    if (scene.playerLives == 0) {
        document.getElementById("gameOver").style.display = "block";
        for (let object of scene.objects){
            if (object.type == "prey"){
                object.sound.volume = 0;
            } else if (object.type == "predator"){
                object.sound.volume = 0;
                object.sound2.volume = 0;
            }
        }
        scene.audio.mainTheme.volume = 0;
        scene.audio.chooseWindow.volume = 0;
        scene.audio.catPurr.play();
    }
    let startPixelX = canvas.width - 320;
    let lastHeartPosition = startPixelX;
    let fullHearts = scene.playerLives / 2 | 0;
    let halfHearts = 0;
    scene.playerLives % 2 != 0 ? halfHearts = 1 : halfHearts;
    let emptyHearts = 5 - fullHearts - halfHearts;
    for (let i = 0; i < fullHearts; i++) {
        lastHeartPosition += 50;
        ctx.drawImage(images.hearts, 0, 0, 36, 32, lastHeartPosition, canvas.height *0.9, 36, 32)
        }
    for (let i = 0; i < halfHearts; i++) {
        lastHeartPosition += 50;
        ctx.drawImage(images.hearts, 38, 0, 36, 32, lastHeartPosition, canvas.height *0.9, 36, 32)
        }
    for (let i = 0; i < emptyHearts; i++) {
        lastHeartPosition += 50;
        ctx.drawImage(images.hearts, 76, 0, 36, 32, lastHeartPosition, canvas.height *0.9, 36, 32)
        }
}

    init();

    return {handleKeyDown, handleKeyUp, chooseCat, handleMouseMove, handleFullscreenChange, toggleFullscreen, toggleMusic, toggleSoundEffects};

}

const mainGameScene = { 
    camera : {
        x : 0,
        y : 0,
        onCat: true,
    },
    cameraLight: utils.deepCopy({...light, size: 3, flicker: 0.1}),
    objects : [],
    audio: {
        chooseWindow: document.getElementById("awesomeness"),
        mainTheme: document.getElementById("lonelyWitch"),
        menuTheme: document.getElementById("windsOfStories"),
        wolfGrowl: document.getElementById("growl"),
        wolfSteps: document.getElementById("wolfRun"),
        mouse: document.getElementById("mouse"),
        catPurr: document.getElementById("catPurr"),
    },
    playerScore: 0,
    playerLives: 10,
};

const mainGameParameters = {
    setup: function(spawnObject){
        mapLoader(mainGameScene).load("map1");
        let cat = mainGameScene.objects.find(obj => obj.type == "player");
        mainGameScene.objects.push(mainGameScene.cameraLight);
    },
    backgroundColour: "black",
    canvas: document.getElementById("maincanvas"),
    unitsInWidth: 10,
}

const mainGame = game(mainGameScene, mainGameParameters);

addEventListener("keydown", (event) => {
    mainGame.handleKeyDown(event);
    
});

addEventListener("keyup", (event) => {
    mainGame.handleKeyUp(event);
    
});
  
addEventListener("fullscreenchange", mainGame.handleFullscreenChange);

window.onload = function() {
    var reloading = sessionStorage.getItem("reloading");
    if (reloading) {
        sessionStorage.removeItem("reloading");
        document.getElementById("settingsWindow").style.display = "block";
    }
}

function startButtonOnclick() {
    loadingScreen.style.display = "none";
    mainGameScene.audio.chooseWindow.play();
    mainGameScene.audio.chooseWindow.volume = 0.5;
    }

function settingsButtonOnGameOverOnclick(){
    sessionStorage.setItem("reloading", "true");
    document.location.reload();
}

function takeHome() {
    location.reload(true);
    }

function showOptions() {
    document.getElementById("settingsWindowOptions").style.display = "block";

}

function hideSettingsWindow(){
    document.getElementById("settingsWindow").style.display = "none";

}

function showSettingsWindow() {
    document.getElementById("settingsWindow").style.display = "block";
    }

function showSettingsButton() {
    function show(){
        document.getElementById("settingsButton").style.display = "block";
        document.getElementById("settingsButton").style.zIndex = "10";
    }
    setTimeout(show,500)
    }

function hideSettingsButton() {
    function hide(){
        document.getElementById("settingsButton").style.display = "none";
        document.getElementById("settingsButton").style.zIndex = "auto";
    }
    setTimeout(hide,500)
}

function toggleMusic(){
    mainGame.toggleMusic();

}

function toggleSoundEffects(){
    mainGame.toggleSoundEffects();
}

function settingsFullScreen(){
    mainGame.toggleFullscreen();
}

function changeMusicVolume(){
    let musicValue = document.getElementById("musicRange").value;
    mainGameScene.audio.mainTheme.volume = musicValue/100;
    mainGameScene.audio.chooseWindow.volume = musicValue/100;
    if (musicValue==0){
        utils.toggleButtonById("musicButton", "musicButtonOff", {"onclick": "toggleMusic()"});
    } else {
        utils.toggleButtonById("musicButtonOff","musicButton", {"onclick": "toggleMusic()"});
    }
}

function changeSoundEffectsVolume(){
    let musicValue = document.getElementById("soundRange").value;
    for (let object of mainGameScene.objects){
        if (object.type == "prey"){
            object.sound.volume = musicValue/100;
        } else if (object.type == "predator"){
            object.sound.volume = musicValue/100;
            object.sound2.volume = musicValue/100;
        }
    }
    if (musicValue==0){
        utils.toggleButtonById("soundEffectsButton", "soundEffectsButtonOff",  {"onclick": "toggleSoundEffects()"});
    } else {
        utils.toggleButtonById("soundEffectsButtonOff","soundEffectsButton", {"onclick": "toggleSoundEffects()"});
    }
}

function controlsButton(){
    document.getElementById("settingsWindowControls").style.display = "block";
}

function goBackSettingsWindowOptions(){
    document.getElementById("settingsWindowOptions").style.display = "none";
}

function xSettingsWindowOptions(){
    document.getElementById("settingsWindowOptions").style.display = "none";
    document.getElementById("settingsWindow").style.display = "none";
}

function xSettingsWindow(){
    document.getElementById("settingsWindow").style.display = "none";
}

function goBackSettingsWindowControls() {
    document.getElementById("settingsWindowControls").style.display = "none";
}

function xSettingsWindowControls() {
    document.getElementById("settingsWindowOptions").style.display = "none";
    document.getElementById("settingsWindow").style.display = "none";
    document.getElementById("settingsWindowControls").style.display = "none";
}

document.getElementById("maincanvas").addEventListener("mousemove", (e) => {
    mainGame.handleMouseMove(e)
});

const catChooserScene = { 
    camera : {
        x : 1,
        y : 1,
        onCat: false,
    },
    objects : [
        utils.deepCopy({...cat}),
    ],
};


const choosingWindowGames = [
    game(
        utils.deepCopy({...catChooserScene, 
            walkState: {
                currentIndex: 0,
                path: [{direction: "R", destinationX: 1.2, destinationY: 0},
                    {direction: "D", destinationX: 1.2, destinationY: 0.45},
                    {direction: "L", destinationX: 0, destinationY: 0.45},
                    {direction: "D", destinationX: 0, destinationY: 1.1},
                    {direction: "R", destinationX: 1.2, destinationY: 1.1},
                    {direction: "U", destinationX: 1.2, destinationY: 0.6},
                    {direction: "L", destinationX: 0, destinationY: 0.6},
                    {direction: "U", destinationX: 0, destinationY: 0},
                ]},
        }),
        {
            backgroundColour: "azure",
            canvas: document.getElementById("chooseCatWhite"),
            unitsInWidth: 2,
            setup: function(spawnObject, chooseCat){
                chooseCat("white");
            }
        }
    ),
    game(
        utils.deepCopy({...catChooserScene, 
            walkState: {
                currentIndex: 0,
                path: [{direction: "D", destinationX: 0, destinationY: 1.1},
                    {direction: "R", destinationX: 0.5, destinationY: 1.1},
                    {direction: "U", destinationX: 0.5, destinationY: 0},
                    {direction: "R", destinationX: 1.2, destinationY: 0},
                    {direction: "D", destinationX: 1.2, destinationY: 1.1},
                    {direction: "L", destinationX: 0.7, destinationY: 1.1},
                    {direction: "U", destinationX: 0.7, destinationY: 0},
                    {direction: "L", destinationX: 0, destinationY: 0},
                ]}, 
        }),
        {
            backgroundColour: "azure",
            canvas: document.getElementById("chooseCatOrange"),
            unitsInWidth: 2,
            setup: function(spawnObject, chooseCat){
                chooseCat("orange");
            }
        }
    ),
    game(
        utils.deepCopy({...catChooserScene, 
            walkState: {
                currentIndex: 0,
                path: [
                    {direction: "D", destinationX: 0, destinationY: 0.45},
                    {direction: "R", destinationX: 1.2, destinationY: 0.45},
                    {direction: "D", destinationX: 1.2, destinationY: 1.1},
                    {direction: "L", destinationX: 0, destinationY: 1.1},
                    {direction: "U", destinationX: 0, destinationY: 0.6},
                    {direction: "R", destinationX: 1.2, destinationY: 0.6},
                    {direction: "U", destinationX: 1.2, destinationY: 0},
                    {direction: "L", destinationX: 0, destinationY: 0},
        
                ]},
        }),
        {
            backgroundColour: "azure",
            canvas: document.getElementById("chooseCatBrown"),
            unitsInWidth: 2,
            setup: function(spawnObject, chooseCat){
                chooseCat("brown");
            }
        }
    ),
    game(
        utils.deepCopy({...catChooserScene, 
            walkState: {
                currentIndex: 0,
                path: [{direction: "R", destinationX: 0.5, destinationY: 0},
                    {direction: "D", destinationX: 0.5, destinationY: 1.1},
                    {direction: "R", destinationX: 1.2, destinationY: 1.1},
                    {direction: "U", destinationX: 1.2, destinationY: 0},
                    {direction: "L", destinationX: 0.7, destinationY: 0},
                    {direction: "D", destinationX: 0.7, destinationY: 1.1},
                    {direction: "L", destinationX: 0, destinationY: 1.1},
                    {direction: "U", destinationX: 0, destinationY: 0},
        
                ]},
        }),
        {
            backgroundColour: "azure",
            canvas: document.getElementById("chooseCatBlack"),
            unitsInWidth: 2,
            setup: function(spawnObject, chooseCat){
                chooseCat("black");
            }
        }
    ),
];

function choosingWindowExit() {
    choosingWindow.style.display = "none";
    mainGameScene.audio.chooseWindow.pause();
    mainGameScene.audio.mainTheme.play();
    mainGameScene.audio.mainTheme.volume = 0.5;

};

const choosingWindow = document.getElementById("choosingWindow");
document.getElementById("chooseCatWhite").onclick = function() {
    mainGame.chooseCat("white");
    choosingWindowExit();
};

document.getElementById("chooseCatOrange").onclick = function() {
    mainGame.chooseCat("orange");
    choosingWindowExit();
};

document.getElementById("chooseCatBrown").onclick = function() {
    mainGame.chooseCat("brown");
    choosingWindowExit();
};

document.getElementById("chooseCatBlack").onclick = function() {
    mainGame.chooseCat("black");
    choosingWindowExit();
};