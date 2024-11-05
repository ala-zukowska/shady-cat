const woodshopWallDecoration = {
    type: "prop",
    image: "woodshop",
    tileWidth: 48,
    tileHeight: 48,
    tileI: 0, //0,2,4,6
    tileJ: 0, //0-1
    x: 0,
    y: 0,
    velocityX: 0,
    velocityY: 0,
    size: 1,
    collisionBox: {x1: 0, y1: 0, x2: 1, y2: 1}, 
    lineOfSightBox: { idle: {x1: 0, y1: 0, x2: 0, y2: 0}}, 
    zOrder: 1,
};

const woodshopWallDecorationSmall = {
    type: "prop",
    image: "woodshop",
    tileWidth: 48,
    tileHeight: 48,
    tileI: 8, //8-9
    tileJ: 0,
    x: 0,
    y: 0,
    velocityX: 0,
    velocityY: 0,
    size: 1,
    collisionBox: {x1: 0, y1: 0, x2: 1, y2: 1}, 
    lineOfSightBox: { idle: {x1: 0, y1: 0, x2: 0, y2: 0}}, 
    zOrder: 1,
};

const randomWoodOnTheFloor = {
    type: "prop",
    image: "woodshop",
    tileWidth: 48,
    tileHeight: 48,
    tileI: 0, //0-6
    tileJ: 5,
    x: 0,
    y: 0,
    velocityX: 0,
    velocityY: 0,
    size: 1,
    collisionBox: {x1: 11/48, y1: 28/48, x2: 31/48, y2: 39/48}, // collisionBox: {x1: 11/48, y1: 25/48, x2: 31/48, y2: 39/48}, 
    lineOfSightBox: { idle: {x1: 0, y1: 0, x2: 0, y2: 0}}, 
    zOrder: 1,
};

const woodStandLeft = {
    type: "prop",
    image: "woodshop",
    tileWidth: 48,
    tileHeight: 48,
    tileI: 7, //7-8
    tileJ: 5,
    x: 0,
    y: 0,
    velocityX: 0,
    velocityY: 0,
    size: 1,
    collisionBox: {x1: 0, y1: 0, x2: 0, y2: 0}, // collisionBox: {x1: 23/48, y1: 16/48, x2: 73/48, y2: 34/48},
    lineOfSightBox: { idle: {x1: 0, y1: 0, x2: 0, y2: 0}}, 
    zOrder: 1,
};

const woodStandRight = {
    type: "prop",
    image: "woodshop",
    tileWidth: 48,
    tileHeight: 48,
    tileI: 9, //9-10
    tileJ: 5,
    x: 0,
    y: 0,
    velocityX: 0,
    velocityY: 0,
    size: 1,
    collisionBox: {x1: 0, y1: 0, x2: 0, y2: 0}, // collisionBox: {x1: 22/48, y1: 16/48, x2: 72/48, y2: 34/48},
    lineOfSightBox: { idle: {x1: 0, y1: 0, x2: 0, y2: 0}}, 
    zOrder: 1,
};

const toolBox = {
    type: "prop",
    image: "woodshop",
    tileWidth: 48,
    tileHeight: 48,
    tileI: 0,
    tileJ: 6,
    x: 0,
    y: 0,
    velocityX: 0,
    velocityY: 0,
    size: 1,
    collisionBox: {x1: 6/48, y1: 27/48, x2: 38/48, y2: 41/48},
    lineOfSightBox: { idle: {x1: 0, y1: 0, x2: 0, y2: 0}}, 
    zOrder: 1,
};

const someWoodThingy = {
    type: "prop",
    image: "woodshop",
    tileWidth: 48,
    tileHeight: 48,
    tileI: 0, //0-1, 2-3
    tileJ: 2,
    x: 0,
    y: 0,
    velocityX: 0,
    velocityY: 0,
    size: 1,
    collisionBox: {x1: 0, y1: 0, x2: 0, y2: 0}, //collisionBox: {x1: 29/48, y1: 20/48, x2: 76/48, y2: 39/48},
    lineOfSightBox: { idle: {x1: 0, y1: 0, x2: 0, y2: 0}}, 
    zOrder: 1,
};

const woodshopTableHorizontal = {
    type: "prop",
    image: "woodshop",
    tileWidth: 48,
    tileHeight: 48,
    tileI: 0, //0,2,4
    tileJ: 3, //3-4
    x: 0,
    y: 0,
    velocityX: 0,
    velocityY: 0,
    size: 1,
    collisionBox: {x1: 0, y1: 0, x2: 0, y2: 0}, //collisionBox: {x1: -4/48, y1: 6/48, x2: 100/48, y2: 34/48},
    lineOfSightBox: { idle: {x1: 0, y1: 0, x2: 0, y2: 0}}, 
    zOrder: 1,
};

const woodshopTableVerticalBig = {
    type: "prop",
    image: "woodshop",
    tileWidth: 48,
    tileHeight: 48,
    tileI: 6, //6,7,8
    tileJ: 2, //2-4
    x: 0,
    y: 0,
    velocityX: 0,
    velocityY: 0,
    size: 1,
    collisionBox: {x1: 0, y1: 0, x2: 0, y2: 0}, //collisionBox: {x1: 4/48, y1: 22/48, x2: 44/48, y2: 122/48},
    lineOfSightBox: { idle: {x1: 0, y1: 0, x2: 0, y2: 0}}, 
    zOrder: 1,
};

const woodshopTableVerticalSmall = {
    type: "prop",
    image: "woodshop",
    tileWidth: 48,
    tileHeight: 48,
    tileI: 9, //9,10
    tileJ: 2, //2-3
    x: 0,
    y: 0,
    velocityX: 0,
    velocityY: 0,
    size: 1,
    collisionBox: {x1: 0, y1: 0, x2: 0, y2: 0}, //collisionBox: {x1: 3/48, y1: 23/48, x2: 51/48, y2: 84/48},
    lineOfSightBox: { idle: {x1: 0, y1: 0, x2: 0, y2: 0}}, 
    zOrder: 1,
};