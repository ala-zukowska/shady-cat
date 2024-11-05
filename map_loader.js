function mapLoader(gameScene){
    function load(mapName){
        let mapImage = document.getElementById(mapName);
        let mapWidth = mapImage.width;
        let mapHeight = mapImage.height;
        let mapCanvas = new OffscreenCanvas(mapWidth, mapHeight);
        let ctx = mapCanvas.getContext("2d");
        ctx.drawImage(mapImage, 0, 0);
        let imageData = ctx.getImageData(0,0,mapWidth,mapHeight);
        let hexPixels = [];
        for (let i=0; i<mapHeight*mapWidth; i++){
            let r = imageData.data[i*4].toString(16).padStart(2,"0");
            let g = imageData.data[i*4 + 1].toString(16).padStart(2,"0");
            let b = imageData.data[i*4 + 2].toString(16).padStart(2,"0");
            let hexPixel = r + g + b;
            hexPixels.push(hexPixel);
        }

        const getPixel = function (x, y){
            if (x<0 || x >= mapWidth || y < 0 || y >= mapHeight){
                return "ffffff";
            }
            let i = y * mapWidth + x;
            return hexPixels[i];

        }

        const getNeighbour = function (x,y){
            return {top: getPixel(x, y-1), bottom: getPixel(x, y+1), left: getPixel(x-1, y), right: getPixel(x+1, y),}
        }

        for (let x=0; x<mapWidth; x++) {
            for (let y=0; y<mapHeight; y++){
                let {top,bottom,left,right} = getNeighbour(x,y);
                let current = getPixel(x,y);
                createObject(x,y,current,top,bottom,left,right);
            }
        }


    }

    function createObject(x,y,current,top,bottom,left,right){
        switch (current){

            //MAP TILES:
            case "000000": //wall BOTTOM, black
                if (top != "000000" && bottom != "000000" 
                    && left != "ffff00" && right != "ffff00" 
                    && left != "ffffff" && right != "ffffff"){ //wallFront BOTTOM
                    gameScene.objects.push(utils.deepCopy({...wallFrontBOTTOM, x: x, y: y, tileI: utils.randInteger(1,4)}));
                }  
                break;            
            case "00ff00": //wall TOP, green
                if (top == "7f7f7f" && bottom == "7f7f7f"){ //bottom left corner TOP
                    gameScene.objects.push(utils.deepCopy({...roomDownLeftCornerTOP, x: x, y: y}));
                } else if (top == "0000ff" && bottom == "0000ff"){ //bottom right corner TOP
                    gameScene.objects.push(utils.deepCopy({...roomDownRightCornerTOP, x: x, y: y}));
                } else { //wallFront TOP
                    gameScene.objects.push(utils.deepCopy({...wallFrontTOP, x: x, y: y, tileI: utils.randInteger(1,4)}));
                }
                break;
            case "7f7f7f": //left wall, grey
                if (top == "00ff00" && bottom != "7f7f7f"){ //down left corner BOTTOM
                    gameScene.objects.push(utils.deepCopy({...roomDownLeftCornerBOTTOM, x: x, y: y}));
                } else { //wallLeft
                gameScene.objects.push(utils.deepCopy({...wallLeft, x: x, y: y}));
                }
                break
            case "0000ff": //right wall, blue
                if (top == "00ff00" && bottom != "0000ff"){//down right corner BOTTOM
                    gameScene.objects.push(utils.deepCopy({...roomDownRightCornerBOTTOM, x: x, y: y}));
                } else {
                    gameScene.objects.push(utils.deepCopy({...wallRight, x: x, y: y}));
                }
                    break;
            case "175600": //dark green, left up corner
                if (bottom == "175600"){ //top left corner TOP
                    gameScene.objects.push(utils.deepCopy({...roomUpLeftCornerTOP, x: x, y: y}));
                } else { //top left corner BOTTOM
                    gameScene.objects.push(utils.deepCopy({...roomUpLeftCornerBOTTOM, x: x, y: y}));
                }
                break
            case "00faff": //teal, right up corner
                if (bottom == "00faff"){ //top right corner TOP
                    gameScene.objects.push(utils.deepCopy({...roomUpRightCornerTOP, x: x, y: y}));
                } else { //top right corner BOTTOM
                    gameScene.objects.push(utils.deepCopy({...roomUpRightCornerBOTTOM, x: x, y: y}));
                }
                break
            case "ff00ff": //passage, pink
                if (top != "ff00ff" && bottom != "ff00ff"){ //door on the left and right wall
                    if (top == "7f7f7f"){
                        gameScene.objects.push(utils.deepCopy({...wallLeftDoorTOP, x: x, y: y}))
                    } else if (bottom == "7f7f7f"){
                        gameScene.objects.push(utils.deepCopy({...wallLeftDoorBOTTOM, x: x, y: y}))
                    } else if (top == "0000ff"){
                        gameScene.objects.push(utils.deepCopy({...wallRightDoorTOP, x: x, y: y}))
                    } else if (bottom == "0000ff"){
                        gameScene.objects.push(utils.deepCopy({...wallRightDoorBOTTOM, x: x, y: y}))
                    }
                } else if (right == "ffff00"){
                    top == "ff00ff" ? gameScene.objects.push(utils.deepCopy({...passageLeftBOTTOM, x: x, y: y,})) : gameScene.objects.push(utils.deepCopy({...passageLeftTOP, x: x, y: y,}));
                } else if (left == "ffff00"){
                    top == "ff00ff" ? gameScene.objects.push(utils.deepCopy({...passageRightBOTTOM, x: x, y: y,})) : gameScene.objects.push(utils.deepCopy({...passageRightTOP, x: x, y: y,}));
                }
                break;
            case "ffff00": //floor, yellow
                gameScene.objects.push(utils.deepCopy({...floor, x: x, y: y, tileI: utils.randInteger(7,11), tileJ: utils.randInteger(0,3)}));
                break; 
            case "ffffff": //void, white
                break;
            case "ff0000": //player, red
                gameScene.objects.push(utils.deepCopy({...floor, x: x, y: y}));
                gameScene.objects.push(utils.deepCopy({...cat, x: x, y: y}));
                break;
            case "ff9b00": //wolf, orange 
                gameScene.objects.push(utils.deepCopy({...floor, x: x, y: y}));
                gameScene.objects.push(utils.deepCopy({...wolf, x: x, y: y}));
                break;
            case "a349a4": //mouse, purple
                gameScene.objects.push(utils.deepCopy({...floor, x: x, y: y}));
                gameScene.objects.push(utils.deepCopy({...mouse, x: x, y: y}));
                break;
            case "c8bfe7": //rat, violet
                gameScene.objects.push(utils.deepCopy({...floor, x: x, y: y}));
                gameScene.objects.push(utils.deepCopy({...rat, x: x, y: y}));
                break;


            // FURNACE: dark red "4a0102" +1
            case "4a0102": //big furnace
                if (right != "4a0102" && left != "4a0102") {
                    gameScene.objects.push(utils.deepCopy({...floor, x: x, y: y, }));
                    gameScene.objects.push(utils.deepCopy({...bigFurnaceTILE1, x: x, y: y, })); 
                } else if (top != "4a0102"){
                    gameScene.objects.push(utils.deepCopy({...wallFrontTOP, x: x, y: y,}));
                    left == "4a0102" ? gameScene.objects.push(utils.deepCopy({...bigFurnaceTILE4, x: x, y: y})) : gameScene.objects.push(utils.deepCopy({...bigFurnaceTILE2, x: x, y: y}));
                } else if (top == "4a0102") {
                    let tileUp = gameScene.objects.filter(obj => obj.x == x && obj.y == y-1).find(obj => obj.image == "blacksmith");
                    if (tileUp != undefined){
                        switch(tileUp.tileCount){
                            case 1:
                                gameScene.objects.push(utils.deepCopy({...wallFrontTOP, x: x, y: y, }));
                                gameScene.objects.push(utils.deepCopy({...bigFurnaceTILE3, x: x, y: y})); 
                                break;
                            case 2:
                                gameScene.objects.push(utils.deepCopy({...wallFrontBOTTOM, x: x, y: y,}));
                                gameScene.objects.push(utils.deepCopy({...bigFurnaceTILE5, x: x, y: y})); 
                                break;
                            case 4:
                                gameScene.objects.push(utils.deepCopy({...wallFrontBOTTOM, x: x, y: y, }));
                                gameScene.objects.push(utils.deepCopy({...bigFurnaceTILE7, x: x, y: y}));
                                break;
                            case 3:
                                gameScene.objects.push(utils.deepCopy({...wallFrontBOTTOM, x: x, y: y, }));
                                gameScene.objects.push(utils.deepCopy({...bigFurnaceTILE6, x: x, y: y}));
                                break;
                            case 5:
                                gameScene.objects.push(utils.deepCopy({...floor, x: x, y: y}));
                                gameScene.objects.push(utils.deepCopy({...bigFurnaceTILE8, x: x, y: y}));
                                break;
                            case 6:
                                gameScene.objects.push(utils.deepCopy({...bigFurnaceTILE9, x: x, y: y}));
                                gameScene.objects.push(utils.deepCopy({...light, size: 3.5, flicker: 0.7, x: x+0.5+0.1, y: y+0.5, colour: {r: 255, g: 255, b: 200}}))
                                break;
                            case 7:
                                gameScene.objects.push(utils.deepCopy({...floor, x: x, y: y}));
                                gameScene.objects.push(utils.deepCopy({...bigFurnaceTILE10, x: x, y: y}));
                                break;
                            case 8:
                                gameScene.objects.push(utils.deepCopy({...floor, x: x, y: y}));
                                gameScene.objects.push(utils.deepCopy({...bigFurnaceTILE11, x: x, y: y}));
                                break;
                            case 9:
                                gameScene.objects.push(utils.deepCopy({...floor, x: x, y: y}));
                                gameScene.objects.push(utils.deepCopy({...bigFurnaceTILE12, x: x, y: y}));
                                break;
                            case 10:
                                gameScene.objects.push(utils.deepCopy({...floor, x: x, y: y}));
                                gameScene.objects.push(utils.deepCopy({...bigFurnaceTILE13, x: x, y: y}));
                                break;
                        }
                    }
                }
                break;
            case "5a0102": //big furnace version 2, 
                if (right != "5a0102" && left != "5a0102") {
                    gameScene.objects.push(utils.deepCopy({...floor, x: x, y: y}));
                    gameScene.objects.push(utils.deepCopy({...bigFurnaceVersion2TILE1, x: x, y: y})); 
                } else if (top != "5a0102"){
                    gameScene.objects.push(utils.deepCopy({...wallFrontTOP, x: x, y: y,}));
                    left == "5a0102" ? gameScene.objects.push(utils.deepCopy({...bigFurnaceVersion2TILE4, x: x, y: y})) : gameScene.objects.push(utils.deepCopy({...bigFurnaceVersion2TILE2, x: x, y: y}));
                } else if (top == "5a0102") {
                    let tileUp = gameScene.objects.filter(obj => obj.x == x && obj.y == y-1).find(obj => obj.image == "blacksmith");
                    if (tileUp != undefined){
                        switch(tileUp.tileCount){
                            case 1:
                                gameScene.objects.push(utils.deepCopy({...wallFrontTOP, x: x, y: y,}));
                                gameScene.objects.push(utils.deepCopy({...bigFurnaceVersion2TILE3, x: x, y: y})); 
                                break;
                            case 2:
                                gameScene.objects.push(utils.deepCopy({...wallFrontBOTTOM, x: x, y: y, }));
                                gameScene.objects.push(utils.deepCopy({...bigFurnaceVersion2TILE5, x: x, y: y})); 
                                break;
                            case 4:
                                gameScene.objects.push(utils.deepCopy({...wallFrontBOTTOM, x: x, y: y, }));
                                gameScene.objects.push(utils.deepCopy({...bigFurnaceVersion2TILE7, x: x, y: y}));
                                break;
                            case 3:
                                gameScene.objects.push(utils.deepCopy({...wallFrontBOTTOM, x: x, y: y, }));
                                gameScene.objects.push(utils.deepCopy({...bigFurnaceVersion2TILE6, x: x, y: y}));
                                break;
                            case 5:
                                gameScene.objects.push(utils.deepCopy({...floor, x: x, y: y}));
                                gameScene.objects.push(utils.deepCopy({...bigFurnaceVersion2TILE8, x: x, y: y}));
                                break;
                            case 6:
                                gameScene.objects.push(utils.deepCopy({...bigFurnaceVersion2TILE9, x: x, y: y}));
                                gameScene.objects.push(utils.deepCopy({...light, size: 3.5, flicker: 0.7, x: x+0.5+0.1, y: y+0.5, colour: {r: 255, g: 255, b: 200}}));
                                break;
                            case 7:
                                gameScene.objects.push(utils.deepCopy({...floor, x: x, y: y}));
                                gameScene.objects.push(utils.deepCopy({...bigFurnaceVersion2TILE10, x: x, y: y}));
                                break;
                            case 8:
                                gameScene.objects.push(utils.deepCopy({...floor, x: x, y: y}));
                                gameScene.objects.push(utils.deepCopy({...bigFurnaceVersion2TILE11, x: x, y: y}));
                                break;
                            case 9:
                                gameScene.objects.push(utils.deepCopy({...floor, x: x, y: y}));
                                gameScene.objects.push(utils.deepCopy({...bigFurnaceVersion2TILE12, x: x, y: y}));
                                break;
                            case 10:
                                gameScene.objects.push(utils.deepCopy({...floor, x: x, y: y}));
                                gameScene.objects.push(utils.deepCopy({...bigFurnaceVersion2TILE13, x: x, y: y}));
                                break;
                        }
                    }
                }
                break;
            case "6a0102": //small furnace
                if (top != "6a0102") {
                    gameScene.objects.push(utils.deepCopy({...wallFrontTOP, x: x, y: y,}));
                    left != "6a0102" ? gameScene.objects.push(utils.deepCopy({...smallFurnaceTILE1, x: x, y: y})) : gameScene.objects.push(utils.deepCopy({...smallFurnaceTILE2, x: x, y: y}));
                } else if (bottom == "6a0102" && top == "6a0102") {
                    gameScene.objects.push(utils.deepCopy({...wallFrontBOTTOM, x: x, y: y,}));
                    if (left != "6a0102"){
                        gameScene.objects.push(utils.deepCopy({...smallFurnaceTILE3, x: x, y: y}))
                        gameScene.objects.push(utils.deepCopy({...light, size: 2.5, flicker: 0.4, x: x+1+0.1, y: y+1+0.1, colour: {r: 255, g: 255, b: 200}}))
                    } else {
                        gameScene.objects.push(utils.deepCopy({...smallFurnaceTILE4, x: x, y: y}));
                    }
                } else if (bottom != "6a0102") {
                    gameScene.objects.push(utils.deepCopy({...floor, x: x, y: y}));
                    left != "6a0102" ? gameScene.objects.push(utils.deepCopy({...smallFurnaceTILE5, x: x, y: y})) : gameScene.objects.push(utils.deepCopy({...smallFurnaceTILE6, x: x, y: y}));
                }
                break;
            case "7a0102": //small furnace closed
                if (bottom == "7a0102" && top == "7a0102") {
                    gameScene.objects.push(utils.deepCopy({...wallFrontBOTTOM, x: x, y: y,  }));
                    gameScene.objects.push(utils.deepCopy({...smallFurnaceClosedTILE3, x: x, y: y}));
                    gameScene.objects.push(utils.deepCopy({...light, size: 2.5, flicker: 0.4, x: x, y: y+1+0.1, colour: {r: 255, g: 255, b: 200}}))
                } else if (top != "7a0102" ) {
                    if (right != "7a0102"){
                        gameScene.objects.push(utils.deepCopy({...wallFrontTOP, x: x, y: y}));
                        gameScene.objects.push(utils.deepCopy({...smallFurnaceClosedTILE1, x: x, y: y}))
                        
                    } else {
                        gameScene.objects.push(utils.deepCopy({...wallFrontBOTTOM, x: x, y: y,  }));
                        gameScene.objects.push(utils.deepCopy({...smallFurnaceClosedTILE2, x: x, y: y}));
                    }
                } else if (bottom != "7a0102") {
                    gameScene.objects.push(utils.deepCopy({...floor, x: x, y: y}));
                    left != "7a0102" ? gameScene.objects.push(utils.deepCopy({...smallFurnaceClosedTILE4, x: x, y: y})) : gameScene.objects.push(utils.deepCopy({...smallFurnaceClosedTILE5, x: x, y: y}));
                }
                break;


            //BLACKSMITH REST: dark orange "cd3900" +100; water blue "3299cc" +1000
            case "cd3900": //spinning circle
                gameScene.objects.push(utils.deepCopy({...floor, x: x, y: y}));
                gameScene.objects.push(utils.deepCopy({...circle, x: x, y: y}));
                gameScene.objects.push(utils.deepCopy({...light, size: 0.5, flicker: 0.4, x: x+15/48, y: y+19/48, colour: {r: 255, g: 255, b: 200}}))
                break;
            case "cd4000": //anvil animated
                gameScene.objects.push(utils.deepCopy({...floor, x: x, y: y}));
                gameScene.objects.push(utils.deepCopy({...anvilAnimated, x: x, y: y}));
                gameScene.objects.push(utils.deepCopy({...light, size: 0.5, flicker: 0.4, x: x+28/48, y: y+16/48, colour: {r: 255, g: 255, b: 200}}))
                break; 
            case "cd4100": //bellows
                if (left != "cd4100"){
                    gameScene.objects.push(utils.deepCopy({...floor, x: x, y: y}));
                    gameScene.objects.push(utils.deepCopy({...floor, x: x+1, y: y}));
                    gameScene.objects.push(utils.deepCopy({...bellowsTILE1, x: x, y: y}));
                    gameScene.objects.push(utils.deepCopy({...bellowsTILE2, x: x+1, y: y}));
                }
                break;
            case "cd4200": //shelf one tile
                gameScene.objects.push(utils.deepCopy({...wallFrontTOP, x: x, y: y, tileI: utils.randInteger(1,4)}));
                gameScene.objects.push(utils.deepCopy({...shelfSmall, x: x, y: y, tileI: utils.randInteger(0,3)}));
                break;
            case "cd4300": //shelf big
                if (left != "cd4300"){
                    gameScene.objects.push(utils.deepCopy({...wallFrontTOP, x: x, y: y, tileI: utils.randInteger(1,4)}));
                    gameScene.objects.push(utils.deepCopy({...wallFrontTOP, x: x+1, y: y, tileI: utils.randInteger(1,4)}));
                    gameScene.objects.push(utils.deepCopy({...shelfBig, x: x, y: y, tileI: 3}));
                    gameScene.objects.push(utils.deepCopy({...shelfBig, x: x+1, y: y, tileI: 4}));
                }
                break;
            case "cd4400": //shelf big 2 
                if (left != "cd4400"){
                    gameScene.objects.push(utils.deepCopy({...wallFrontTOP, x: x, y: y, tileI: utils.randInteger(1,4)}));
                    gameScene.objects.push(utils.deepCopy({...wallFrontTOP, x: x+1, y: y, tileI: utils.randInteger(1,4)}));
                    gameScene.objects.push(utils.deepCopy({...shelfBig2, x: x, y: y, tileI: 3}));
                    gameScene.objects.push(utils.deepCopy({...shelfBig2, x: x+1, y: y, tileI: 4}));
                }
                break;
            case "cd4500": //rack
                if (top != "cd4500" && right == "cd4500"){
                    let tileRandom = utils.randInteger(8,11);
                    tileRandom%2!=0 ? tileRandom+=1 : tileRandom;
                    gameScene.objects.push(utils.deepCopy({...rackTOP, x: x, y: y, tileI: tileRandom}));
                    gameScene.objects.push(utils.deepCopy({...rackTOP, x: x+1, y: y, tileI: tileRandom+1, collisionBox: {x1: -6/48, y1: 30/48, x2: 33/48, y2:65/48}}));
                    gameScene.objects.push(utils.deepCopy({...rackBOTTOM, x: x, y: y+1, tileI: tileRandom}));
                    gameScene.objects.push(utils.deepCopy({...rackBOTTOM, x: x+1, y: y+1, tileI: tileRandom+1,}));
                    gameScene.objects.push(utils.deepCopy({...floor, x: x, y: y,}));
                    gameScene.objects.push(utils.deepCopy({...floor, x: x+1, y: y,}));
                    gameScene.objects.push(utils.deepCopy({...floor, x: x, y: y+1,}));
                    gameScene.objects.push(utils.deepCopy({...floor, x: x+1, y: y+1,})); 
                }
                break;
            case "cd4600": //table machine
                if (top != "cd4600" && right == "cd4600"){
                    gameScene.objects.push(utils.deepCopy({...tableMachine, 
                        x: x, y: y, 
                        tileI: 0, 
                        collisionBox: {x1: 17/48, y1: 28/48, x2: 79/48, y2: 65/48}, 
                    }));
                    gameScene.objects.push(utils.deepCopy({...tableMachine, x: x+1, y: y, tileI: 1,}));
                    gameScene.objects.push(utils.deepCopy({...tableMachine, x: x, y: y+1, tileI: 0, tileJ: 14,}));
                    gameScene.objects.push(utils.deepCopy({...tableMachine, x: x+1, y: y+1, tileI: 1, tileJ: 14,}));
                    gameScene.objects.push(utils.deepCopy({...floor, x: x, y: y,}));
                    gameScene.objects.push(utils.deepCopy({...floor, x: x+1, y: y,}));
                    gameScene.objects.push(utils.deepCopy({...floor, x: x, y: y+1,}));
                    gameScene.objects.push(utils.deepCopy({...floor, x: x+1, y: y+1,}));   
                }
                break;
            case "cd4700": //table big
                if (top != "e89a6b" && right == "e89a6b"){
                    gameScene.objects.push(utils.deepCopy({...tableBig, 
                        x: x, y: y, 
                        tileI: 2, 
                        collisionBox: {x1: 13/48, y1: 32/48, x2: 86/48, y2: 67/48},
                        lineOfSightBox: { idle: {x1: 19/48, y1: 23/48, x2: 78/48, y2: 85/48}}, 
                    }));
                    gameScene.objects.push(utils.deepCopy({...tableBig, x: x+1, y: y, tileI: 3,}));
                    gameScene.objects.push(utils.deepCopy({...tableBig, x: x, y: y+1, tileI: 2, tileJ: 14,}));
                    gameScene.objects.push(utils.deepCopy({...tableBig, x: x+1, y: y+1, tileI: 3, tileJ: 14,}));
                    gameScene.objects.push(utils.deepCopy({...floor, x: x, y: y,}));
                    gameScene.objects.push(utils.deepCopy({...floor, x: x+1, y: y,}));
                    gameScene.objects.push(utils.deepCopy({...floor, x: x, y: y+1,}));
                    gameScene.objects.push(utils.deepCopy({...floor, x: x+1, y: y+1,}));   
                }
                break;
            case "cd4800": //rack left
                if (top != "cd4800" && right == "cd4800"){
                    gameScene.objects.push(utils.deepCopy({...rackSideLeft, 
                        x: x, y: y, 
                        tileI: 4, 
                        collisionBox: {x1: 17/48, y1: 33/48, x2:85/48, y2: 65/48}, 
                    }));
                    gameScene.objects.push(utils.deepCopy({...rackSideLeft, x: x+1, y: y, tileI: 5,}));
                    gameScene.objects.push(utils.deepCopy({...rackSideLeft, x: x, y: y+1, tileI: 4, tileJ: 14,}));
                    gameScene.objects.push(utils.deepCopy({...rackSideLeft, x: x+1, y: y+1, tileI: 5, tileJ: 14,}));
                    gameScene.objects.push(utils.deepCopy({...floor, x: x, y: y,}));
                    gameScene.objects.push(utils.deepCopy({...floor, x: x+1, y: y,}));
                    gameScene.objects.push(utils.deepCopy({...floor, x: x, y: y+1,}));
                    gameScene.objects.push(utils.deepCopy({...floor, x: x+1, y: y+1,}));   
                }
                break;
            case "cd4900": //rack right
                if (top != "cd4900" && right == "cd4900"){
                    gameScene.objects.push(utils.deepCopy({...rackSideRight, 
                        x: x, y: y, 
                        tileI: 6, 
                        collisionBox: {x1: 17/48, y1: 33/48, x2:85/48, y2: 65/48}, 
                    }));
                    gameScene.objects.push(utils.deepCopy({...rackSideRight, x: x+1, y: y, tileI: 7,}));
                    gameScene.objects.push(utils.deepCopy({...rackSideRight, x: x, y: y+1, tileI: 6, tileJ: 14,}));
                    gameScene.objects.push(utils.deepCopy({...rackSideRight, x: x+1, y: y+1, tileI: 7, tileJ: 14,}));
                    gameScene.objects.push(utils.deepCopy({...floor, x: x, y: y,}));
                    gameScene.objects.push(utils.deepCopy({...floor, x: x+1, y: y,}));
                    gameScene.objects.push(utils.deepCopy({...floor, x: x, y: y+1,}));
                    gameScene.objects.push(utils.deepCopy({...floor, x: x+1, y: y+1,}));   
                }
                break;
            case "3299cc": //bucket vertical 
                if (top != "3299cc"){
                    gameScene.objects.push(utils.deepCopy({...floor, x: x, y: y,}));
                    gameScene.objects.push(utils.deepCopy({...floor, x: x, y: y+1, }));
                    gameScene.objects.push(utils.deepCopy({...waterBucketVertical, x: x, y: y, tileJ: 13}));
                    gameScene.objects.push(utils.deepCopy({...waterBucketVertical, 
                        x: x, y: y+1, 
                        tileJ: 14,
                        collisionBox: {x1: 0, y1: 0, x2:0, y2: 0}, 
                        lineOfSightBox: { idle: {x1: 0, y1: 0, x2: 0, y2: 0}},

                    }));
                }
                break;
            case "4299cc": //bucket horizontal 
                if (left != "4299cc"){
                    gameScene.objects.push(utils.deepCopy({...floor, x: x, y: y,}));
                    gameScene.objects.push(utils.deepCopy({...floor, x: x+1, y: y, }));
                    gameScene.objects.push(utils.deepCopy({...waterBucketHorizontal, x: x, y: y, tileI: 13}));
                    gameScene.objects.push(utils.deepCopy({...waterBucketHorizontal, 
                        x: x+1, y: y, 
                        tileI: 14,
                        collisionBox: {x1: 0, y1: 0, x2:0, y2: 0}, 
                        lineOfSightBox: { idle: {x1: 0, y1: 0, x2: 0, y2: 0}},

                    }));
                }
                break;
            case "5299cc": //bucket small
                gameScene.objects.push(utils.deepCopy({...floor, x: x, y: y,}));
                gameScene.objects.push(utils.deepCopy({...waterBucketSmall, x: x, y: y}));
                break;
            case "cd5000": //coal big
                if (left != "cd5000"){
                    gameScene.objects.push(utils.deepCopy({...floor, x: x, y: y,}));
                    gameScene.objects.push(utils.deepCopy({...floor, x: x+1, y: y,}));
                    gameScene.objects.push(utils.deepCopy({...floor, x: x+2, y: y,}));
                    gameScene.objects.push(utils.deepCopy({...coalBig, 
                        x: x, y: y,
                        collisionBox: {x1: 35/48, y1: 14/48, x2: 103/48, y2: 33/48},
                    }));
                    gameScene.objects.push(utils.deepCopy({...coalBig, x: x+1, y: y, tileI: 1}));
                    gameScene.objects.push(utils.deepCopy({...coalBig, x: x+2, y: y, tileI: 2}));
                }
                break;
            case "cd5100": //coal medium
                if (left != "cd5100"){
                    let tileRandom = utils.randInteger(6,10);
                    tileRandom%2!=0 ? tileRandom+=1 : tileRandom;
                    gameScene.objects.push(utils.deepCopy({...floor, x: x, y: y,}));
                    gameScene.objects.push(utils.deepCopy({...floor, x: x+1, y: y,}));
                    gameScene.objects.push(utils.deepCopy({...coalMedium, x: x, y: y, tileI: tileRandom,}));
                    gameScene.objects.push(utils.deepCopy({...coalMedium, 
                        x: x+1, y: y,
                        tileI: tileRandom+1,
                        collisionBox: {x1: 0, y1: 0, x2: 0, y2: 0}, 
                    }));
                }
                break;
            case "cd5200": //coal small
                gameScene.objects.push(utils.deepCopy({...floor, x: x, y: y,}));
                gameScene.objects.push(utils.deepCopy({...coalSmall, x: x, y: y, tileI: utils.randInteger(3,5)}));
                break;
            case "cd5300": //stone big
                let tileRandom = utils.randInteger(0,2);
                let box = { idle: {x1: 0, y1: 11/48, x2: 47/48, y2: 44/48}}
                tileRandom==1 ? box = { idle: {x1: 0, y1: 17/48, x2: 47/48, y2: 44/48}} : box;
                gameScene.objects.push(utils.deepCopy({...floor, x: x, y: y,}));
                gameScene.objects.push(utils.deepCopy({...stoneBig, x: x, y: y, tileI: tileRandom, lineOfSightBox: box}));
                break;
            case "cd5400": //stone small
                gameScene.objects.push(utils.deepCopy({...floor, x: x, y: y,}));
                gameScene.objects.push(utils.deepCopy({...stoneSmall, x: x, y: y, tileI: utils.randInteger(4,6),}));
                break;
            case "cd5500": //stone small short
                gameScene.objects.push(utils.deepCopy({...floor, x: x, y: y,}));
                gameScene.objects.push(utils.deepCopy({...stoneSmallShort, x: x, y: y, tileI: utils.randInteger(2,4),}));
                break;
            case "cd5600": //anvil small
                gameScene.objects.push(utils.deepCopy({...floor, x: x, y: y,}));
                gameScene.objects.push(utils.deepCopy({...anvilSmall, x: x, y: y, tileI: utils.randInteger(7,13),}));
                break;
            case "cd5700": //anvil small on stone
                gameScene.objects.push(utils.deepCopy({...floor, x: x, y: y,}));
                gameScene.objects.push(utils.deepCopy({...anvilSmallStone, x: x, y: y, tileI: utils.randInteger(7,9),}));
                break;
            case "cd5800": //anvil big
                gameScene.objects.push(utils.deepCopy({...floor, x: x, y: y,}));
                gameScene.objects.push(utils.deepCopy({...anvilBig, x: x, y: y,}));
                break;
            case "cd5900": //anvil big on stone
                gameScene.objects.push(utils.deepCopy({...floor, x: x, y: y,}));
                gameScene.objects.push(utils.deepCopy({...anvilBigStone, x: x, y: y,}));
                break;
                
            //WOODSHOP: dark brown "402d20" +10
            case "402d20": //wood stand left
                if (left != "402d20"){
                    gameScene.objects.push(utils.deepCopy({...floor, x: x, y: y,}));
                    gameScene.objects.push(utils.deepCopy({...floor, x: x+1, y: y,}));
                    gameScene.objects.push(utils.deepCopy({...woodStandLeft, 
                        x: x, y: y,
                        collisionBox: {x1: 23/48, y1: 16/48, x2: 73/48, y2: 34/48},
                    }));
                    gameScene.objects.push(utils.deepCopy({...woodStandLeft, x: x+1, y: y, tileI: 8,}));
                }
                break;
            case "412d20": //wood stand right
                if (left != "412d20"){
                    gameScene.objects.push(utils.deepCopy({...floor, x: x, y: y,}));
                    gameScene.objects.push(utils.deepCopy({...floor, x: x+1, y: y,}));
                    gameScene.objects.push(utils.deepCopy({...woodStandRight, 
                        x: x, y: y,
                        collisionBox: {x1: 22/48, y1: 16/48, x2: 72/48, y2: 34/48},
                    }));
                    gameScene.objects.push(utils.deepCopy({...woodStandRight, x: x+1, y: y, tileI: 10,}));
                }
                break;
            case "422d20": //random wood on the floor
                let randomTile = utils.randInteger(0,7);
                let randomBox = {x1: 11/48, y1: 28/48, x2: 31/48, y2: 39/48};
                if (randomTile <= 3){
                    randomBox = {x1: 11/48, y1: 25/48, x2: 31/48, y2: 39/48};
                }
                gameScene.objects.push(utils.deepCopy({...floor, x: x, y: y,}));
                gameScene.objects.push(utils.deepCopy({...randomWoodOnTheFloor, 
                    x: x, y: y,
                    tileI: randomTile,
                    collisionBox: randomBox
                }));
                break;
            case "432d20": //wall decoration two tile
                if (left != "432d20"){
                    let randomJ = utils.randInteger(0,2);
                    let randomI = utils.randInteger(0,7);
                    randomI%2!=0 ? randomI-=1 : randomI;
                    gameScene.objects.push(utils.deepCopy({...wallFrontTOP, x: x, y: y,}));
                    gameScene.objects.push(utils.deepCopy({...wallFrontTOP, x: x+1, y: y,}));
                    gameScene.objects.push(utils.deepCopy({...woodshopWallDecoration, 
                        x: x, y: y, 
                        tileJ: randomJ,
                        tileI: randomI,

                    }));
                    gameScene.objects.push(utils.deepCopy({...woodshopWallDecoration, 
                        x: x+1, y: y, 
                        tileJ: randomJ,
                        tileI: randomI+1,
                    }));
                }
                break;
            case "442d20": //wall decoration one tile
                gameScene.objects.push(utils.deepCopy({...wallFrontTOP, x: x, y: y,}));
                gameScene.objects.push(utils.deepCopy({...woodshopWallDecorationSmall, 
                    x: x, y: y, 
                    tileI: utils.randInteger(8,10),
                }));
                break;
            case "452d20": //tool box
                gameScene.objects.push(utils.deepCopy({...floor, x: x, y: y,}));
                gameScene.objects.push(utils.deepCopy({...toolBox, x: x, y: y,}));
                break;
            case "462d20": //some wood thingy
                if (left != "462d20"){
                    let randomI = utils.randInteger(0,3);
                    randomI%2!=0 ? randomI-=1 : randomI;
                    gameScene.objects.push(utils.deepCopy({...floor, x: x, y: y,}));
                    gameScene.objects.push(utils.deepCopy({...floor, x: x+1, y: y,}));
                    gameScene.objects.push(utils.deepCopy({...someWoodThingy, 
                        x: x, y: y, 
                        tileI: randomI,
                        collisionBox: {x1: 29/48, y1: 20/48, x2: 76/48, y2: 39/48},
                    }));
                    gameScene.objects.push(utils.deepCopy({...someWoodThingy, x: x+1, y: y, tileI: randomI+1,}));
                }
                break;
            case "472d20": //horizontal table
                if (left != "472d20"){
                    let randomJ = utils.randInteger(3,5);
                    let randomI = utils.randInteger(0,5);
                    randomI%2!=0 ? randomI-=1 : randomI;
                    gameScene.objects.push(utils.deepCopy({...floor, x: x, y: y,}));
                    gameScene.objects.push(utils.deepCopy({...floor, x: x+1, y: y,}));
                    gameScene.objects.push(utils.deepCopy({...woodshopTableHorizontal, 
                        x: x, y: y, 
                        tileJ: randomJ,
                        tileI: randomI,
                        collisionBox: {x1: -4/48, y1: 6/48, x2: 100/48, y2: 34/48},

                    }));
                    gameScene.objects.push(utils.deepCopy({...woodshopTableHorizontal, 
                        x: x+1, y: y, 
                        tileJ: randomJ,
                        tileI: randomI+1,
                    }));
                }
                break;
            case "482d20": //vertical table 3 tiles
                if (top != "482d20"){
                    let randomI =  utils.randInteger(6,9);
                    gameScene.objects.push(utils.deepCopy({...floor, x: x, y: y,}));
                    gameScene.objects.push(utils.deepCopy({...floor, x: x, y: y+1,}));
                    gameScene.objects.push(utils.deepCopy({...floor, x: x, y: y+2,}));
                    gameScene.objects.push(utils.deepCopy({...woodshopTableVerticalBig, 
                        x: x, y: y, 
                        tileI: randomI,
                        collisionBox: {x1: 4/48, y1: 22/48, x2: 44/48, y2: 122/48},
                    }));
                    gameScene.objects.push(utils.deepCopy({...woodshopTableVerticalBig, x: x, y: y+1, tileI: randomI, tileJ: 3}));
                    gameScene.objects.push(utils.deepCopy({...woodshopTableVerticalBig, x: x, y: y+2, tileI: randomI, tileJ: 4}));
                }
                break;
            case "492d20": //vertical table 2 tiles
                if (top != "492d20"){
                    let randomI =  utils.randInteger(9,11);
                    gameScene.objects.push(utils.deepCopy({...floor, x: x, y: y,}));
                    gameScene.objects.push(utils.deepCopy({...floor, x: x, y: y+1,}));
                    gameScene.objects.push(utils.deepCopy({...woodshopTableVerticalSmall, 
                        x: x, y: y, 
                        tileI: randomI,
                        collisionBox: {x1: 3/48, y1: 23/48, x2: 51/48, y2: 84/48},
                    }));
                    gameScene.objects.push(utils.deepCopy({...woodshopTableVerticalSmall, x: x, y: y+1, tileI: randomI, tileJ: 3}));
                }
                break;
            
            //LIGHT: gold "e2b30c" +1
            case "e2b30c": //torch
                gameScene.objects.push(utils.deepCopy({...wallFrontTOP, x: x, y: y,}));
                gameScene.objects.push(utils.deepCopy({...torch, x: x, y: y,}));
                gameScene.objects.push(utils.deepCopy({...light, size: 2.5, flicker: 0.4, x: x+0.5, y: y+0.5, colour: {r: 255, g: 255, b: 200}}));
                gameScene.objects.push(utils.deepCopy({...light, size: 3.5, flicker: 0.4, x: x+0.5, y: y+2.5, colour: {r: 255, g: 255, b: 200}}));
                break;
            
            default:
                console.log("Invalid colour in map", current, "x:", x, "y:", y);
        }

    }

    return {load}; 
}