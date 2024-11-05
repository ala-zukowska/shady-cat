const circle = {
    type: "prop",
    image: "blacksmith",
    tileWidth: 48,
    tileHeight: 48,
    x: 0,
    y: 0,
    velocityX: 0,
    velocityY: 0,
    size: 1,
    animations: {
        idle: {
            duration: 700, tiles: [
                { i: 0, j: 11 },
                { i: 1, j: 11 },
                { i: 2, j: 11 },
                { i: 3, j: 11 },
            ]
        }
    },
    currentAnimation: "idle",
    animationSpeed: 1.0,
    collisionBox: {x1: 2/48, y1: 22/48, x2: 46/48, y2: 32/48}, 
    lineOfSightBox: {
        idle: {x1: 0, y1: 0, x2: 0, y2: 0}, 
    },
    zOrder: 1,
};

const anvilAnimated = {
    type: "prop",
    image: "blacksmith",
    tileWidth: 48,
    tileHeight: 48,
    x: 0,
    y: 0,
    velocityX: 0,
    velocityY: 0,
    size: 1,
    animations: {
        idle: {
            duration: 2300, tiles: [
                { i: 9, j: 11 },
                { i: 10, j: 11 },
                { i: 11, j: 11 },
                { i: 12, j: 11 },
                { i: 13, j: 11 },
                { i: 14, j: 11 },
                { i: 15, j: 11 },
                { i: 16, j: 11 },
                { i: 17, j: 11 },
                { i: 18, j: 11 },
                { i: 19, j: 11 },
                { i: 20, j: 11 },
                { i: 17, j: 13 },
                { i: 18, j: 13 },
                { i: 19, j: 13 },
                { i: 20, j: 13 },
            ]
        }
    },
    currentAnimation: "idle",
    animationSpeed: 1.0,
    collisionBox: {x1: 4/48, y1: 28/48, x2: 46/48, y2: 41/48}, 
    lineOfSightBox: {
        idle: {x1: 0, y1: 0, x2: 0, y2: 0}, 
    },
    zOrder: 1,
};

const bellowsTILE1 = {
    type: "prop",
    image: "blacksmith",
    tileWidth: 48,
    tileHeight: 48,
    x: 0,
    y: 0,
    velocityX: 0,
    velocityY: 0,
    size: 1,
    animations: {
        idle: {
            duration: 800, tiles: [
                { i: 6, j: 9 },
                { i: 8, j: 9 },
                { i: 10, j: 9 },
                { i: 12, j: 9 },
            ]
        }
    },
    currentAnimation: "idle",
    animationSpeed: 1.0,
    collisionBox: {x1: 36/48, y1: 29/48, x2: 54/48, y2: 38/48}, 
    lineOfSightBox: {
        idle: {x1: 0, y1: 0, x2: 0, y2: 0}, 
    },
    zOrder: 1,
};

const bellowsTILE2 = {
    type: "prop",
    image: "blacksmith",
    tileWidth: 48,
    tileHeight: 48,
    x: 0,
    y: 0,
    velocityX: 0,
    velocityY: 0,
    size: 1,
    animations: {
        idle: {
            duration: 800, tiles: [
                { i: 7, j: 9 },
                { i: 9, j: 9 },
                { i: 11, j: 9 },
                { i: 13, j: 9 },
            ]
        }
    },
    currentAnimation: "idle",
    animationSpeed: 1.0,
    collisionBox: {x1: 0, y1: 29/48, x2: 45/48, y2: 38/48}, 
    lineOfSightBox: {
        idle: {x1: 0, y1: 0, x2: 0, y2: 0}, 
    },
    zOrder: 1,
};

const shelfSmall = {
    type: "prop",
    image: "blacksmith",
    tileWidth: 48,
    tileHeight: 48,
    tileI: 0, //0-2
    tileJ: 12,
    x: 0,
    y: 0,
    velocityX: 0,
    velocityY: 0,
    size: 1,
    collisionBox: {x1: 0, y1: 0, x2: 1, y2: 1}, 
    lineOfSightBox: { idle: {x1: 0, y1: 0, x2: 0, y2: 0}}, 
    zOrder: 1,
};

const shelfBig = {
    type: "prop",
    image: "blacksmith",
    tileWidth: 48,
    tileHeight: 48,
    tileI: 3, //4
    tileJ: 12,
    x: 0,
    y: 0,
    velocityX: 0,
    velocityY: 0,
    size: 1,
    collisionBox: {x1: 0, y1: 0, x2: 1, y2: 1}, 
    lineOfSightBox: { idle: {x1: 0, y1: 0, x2: 0, y2: 0}}, 
    zOrder: 1,
};

const shelfBig2 = {
    type: "prop",
    image: "blacksmith",
    tileWidth: 48,
    tileHeight: 48,
    tileI: 5, //6
    tileJ: 12,
    x: 0,
    y: 0,
    velocityX: 0,
    velocityY: 0,
    size: 1,
    collisionBox: {x1: 0, y1: 0, x2: 1, y2: 1}, 
    lineOfSightBox: { idle: {x1: 0, y1: 0, x2: 0, y2: 0}}, 
    zOrder: 1,
};

const rackTOP = {
    type: "prop",
    image: "blacksmith",
    tileWidth: 48,
    tileHeight: 48,
    tileI: 8, //8-9, 10-11
    tileJ: 13,
    x: 0,
    y: 0,
    velocityX: 0,
    velocityY: 0,
    size: 1,
    collisionBox: {x1: 0, y1: 0, x2: 0, y2:0},// collisionBox:   {x1: 15/48, y1: 30/48, x2: 52/48, y2:65/48},
    lineOfSightBox: { idle: {x1: 0, y1: 0, x2: 0, y2: 0}}, 
    zOrder: 1,
};

const rackBOTTOM = {
    type: "prop",
    image: "blacksmith",
    tileWidth: 48,
    tileHeight: 48,
    tileI: 8, //8-9, 10-11
    tileJ: 14,
    x: 0,
    y: 0,
    velocityX: 0,
    velocityY: 0,
    size: 1,
    collisionBox: {x1: 0, y1: 0, x2: 0, y2:0}, 
    lineOfSightBox: { idle: {x1: 0, y1: 0, x2: 0, y2: 0}}, 
    zOrder: 1,
};

const tableMachine = {
    type: "prop",
    image: "blacksmith",
    tileWidth: 48,
    tileHeight: 48,
    tileI: 0, //0-1
    tileJ: 13, //13-14
    x: 0,
    y: 0,
    velocityX: 0,
    velocityY: 0,
    size: 1,
    collisionBox: {x1: 0, y1: 0, x2: 0, y2: 0}, //collisionBox: {x1: 17/48, y1: 28/48, x2: 79/48, y2: 65/48},
    lineOfSightBox: { idle: {x1: 0, y1: 0, x2: 0, y2: 0}}, // lineOfSightBox: { idle: {x1: 17/48, y1: 25/48, x2: 79/48, y2: 55/48}},
    zOrder: 1,
};

const tableBig = {
    type: "prop",
    image: "blacksmith",
    tileWidth: 48,
    tileHeight: 48,
    tileI: 2, //2-3
    tileJ: 13, //13-14
    x: 0,
    y: 0,
    velocityX: 0,
    velocityY: 0,
    size: 1,
    collisionBox: {x1: 0, y1: 0, x2: 0, y2: 0}, //  collisionBox: {x1: 13/48, y1: 32/48, x2: 86/48, y2: 67/48},
    lineOfSightBox: { idle: {x1: 0, y1: 0, x2: 0, y2: 0}}, //lineOfSightBox: { idle: {x1: 19/48, y1: 23/48, x2: 78/48, y2: 85/48}},
    zOrder: 1,
};


const rackSideLeft = {
    type: "prop",
    image: "blacksmith",
    tileWidth: 48,
    tileHeight: 48,
    tileI: 4, //4-5
    tileJ: 13, //13-14
    x: 0,
    y: 0,
    velocityX: 0,
    velocityY: 0,
    size: 1,
    collisionBox: {x1: 0, y1: 0, x2:0, y2: 0}, //collisionBox: {x1: 17/48, y1: 33/48, x2:85/48, y2: 65/48}, 
    lineOfSightBox: { idle: {x1: 0, y1: 0, x2: 0, y2: 0}},
    zOrder: 1,
};

const rackSideRight = {
    type: "prop",
    image: "blacksmith",
    tileWidth: 48,
    tileHeight: 48,
    tileI: 6, //6-7
    tileJ: 13, //13-14
    x: 0,
    y: 0,
    velocityX: 0,
    velocityY: 0,
    size: 1,
    collisionBox: {x1: 0, y1: 0, x2: 0, y2: 0}, // collisionBox: {x1: 17/48, y1: 33/48, x2:85/48, y2: 65/48}, 
    lineOfSightBox: { idle: {x1: 0, y1: 0, x2: 0, y2: 0}},
    zOrder: 1,
};

const waterBucketVertical = {
    type: "prop",
    image: "blacksmith",
    tileWidth: 48,
    tileHeight: 48,
    tileI: 12,
    tileJ: 13, //13-14
    x: 0,
    y: 0,
    velocityX: 0,
    velocityY: 0,
    size: 1,
    collisionBox: {x1: 6/48, y1: 27/48, x2: 43/48, y2: 67/48}, 
    lineOfSightBox: { idle: {x1: 10/48, y1: 15/48, x2: 38/48, y2: 79/48}},
    zOrder: 1,
};

const waterBucketHorizontal = {
    type: "prop",
    image: "blacksmith",
    tileWidth: 48,
    tileHeight: 48,
    tileI: 13, //13-14
    tileJ: 14,
    x: 0,
    y: 0,
    velocityX: 0,
    velocityY: 0,
    size: 1,
    collisionBox: {x1: 12/48, y1: 15/48, x2: 84/48, y2: 32/48}, 
    lineOfSightBox: { idle: {x1: 16/48, y1: 9/48, x2: 78/48, y2: 41/48}},
    zOrder: 1,
};

const waterBucketSmall = {
    type: "prop",
    image: "blacksmith",
    tileWidth: 48,
    tileHeight: 48,
    tileI: 13, 
    tileJ: 13,
    x: 0,
    y: 0,
    velocityX: 0,
    velocityY: 0,
    size: 1,
    collisionBox: {x1: 4/48, y1: 16/48, x2: 46/48, y2: 31/48}, 
    lineOfSightBox: { idle: {x1: 8/48, y1: 11/48, x2: 39/48, y2: 43/48}},
    zOrder: 1,
};

const coalBig = {
    type: "prop",
    image: "blacksmith",
    tileWidth: 48,
    tileHeight: 48,
    tileI: 0, //0-2
    tileJ: 15,
    x: 0,
    y: 0,
    velocityX: 0,
    velocityY: 0,
    size: 1,
    collisionBox: {x1: 0, y1: 0, x2: 0, y2: 0}, //collisionBox: {x1: 35/48, y1: 14/48, x2: 103/48, y2: 33/48},
    lineOfSightBox: { idle: {x1: 0, y1: 0, x2: 0, y2: 0}},
    zOrder: 1,
};

const coalSmall = {
    type: "prop",
    image: "blacksmith",
    tileWidth: 48,
    tileHeight: 48,
    tileI: 3, //3-4 
    tileJ: 15,
    x: 0,
    y: 0,
    velocityX: 0,
    velocityY: 0,
    size: 1,
    collisionBox: {x1: 7/48, y1: 20/48, x2: 43/48, y2: 34/48}, 
    lineOfSightBox: { idle: {x1: 0, y1: 0, x2: 0, y2: 0}},
    zOrder: 1,
};

const coalMedium = {
    type: "prop",
    image: "blacksmith",
    tileWidth: 48,
    tileHeight: 48,
    tileI: 6, //6-7, 8-9
    tileJ: 15,
    x: 0,
    y: 0,
    velocityX: 0,
    velocityY: 0,
    size: 1,
    collisionBox: {x1: 23/48, y1: 17/48, x2: 76/48, y2: 39/48}, //collisionBox: {x1: 0, y1: 0, x2: 0, y2: 0}, 
    lineOfSightBox: { idle: {x1: 0, y1: 0, x2: 0, y2: 0}},
    zOrder: 1,
};

const stoneBig = {
    type: "prop",
    image: "blacksmith",
    tileWidth: 48,
    tileHeight: 48,
    tileI: 0, //0-1
    tileJ: 10,
    x: 0,
    y: 0,
    velocityX: 0,
    velocityY: 0,
    size: 1,
    collisionBox: {x1: -6/48, y1: 21/48, x2: 54/48, y2: 33/48}, 
    lineOfSightBox: { idle: {x1: 0, y1: 11/48, x2: 47/48, y2: 44/48}}, //lineOfSightBox: { idle: {x1: 0, y1: 17/48, x2: 47/48, y2: 44/48}},
    zOrder: 1,
};

const stoneSmall = {
    type: "prop",
    image: "blacksmith",
    tileWidth: 48,
    tileHeight: 48,
    tileI: 4, //4-5
    tileJ: 10,
    x: 0,
    y: 0,
    velocityX: 0,
    velocityY: 0,
    size: 1,
    collisionBox: {x1: 2/48, y1: 21/48, x2: 44/48, y2: 33/48}, 
    lineOfSightBox: { idle: {x1: 8/48, y1: 13/48, x2: 40/48, y2: 44/48}}, 
    zOrder: 1,
};

const stoneSmallShort = {
    type: "prop",
    image: "blacksmith",
    tileWidth: 48,
    tileHeight: 48,
    tileI: 2, //2-3
    tileJ: 10,
    x: 0,
    y: 0,
    velocityX: 0,
    velocityY: 0,
    size: 1,
    collisionBox: {x1: 2/48, y1: 24/48, x2: 44/48, y2: 36/48}, 
    lineOfSightBox: { idle: {x1: 8/48, y1: 19/48, x2: 40/48, y2: 44/48}},
    zOrder: 1,
};

const anvilSmall = {
    type: "prop",
    image: "blacksmith",
    tileWidth: 48,
    tileHeight: 48,
    tileI: 7, //7-12
    tileJ: 10,
    x: 0,
    y: 0,
    velocityX: 0,
    velocityY: 0,
    size: 1,
    collisionBox: {x1: 10/48, y1: 27/48, x2: 42/48, y2: 31/48}, 
    lineOfSightBox: { idle: {x1: 10/48, y1: 17/48, x2: 42/48, y2: 38/48}},
    zOrder: 1,
};

const anvilSmallStone = {
    type: "prop",
    image: "blacksmith",
    tileWidth: 48,
    tileHeight: 48,
    tileI: 7, //7-8
    tileJ: 11,
    x: 0,
    y: 0,
    velocityX: 0,
    velocityY: 0,
    size: 1,
    collisionBox: {x1: 2/48, y1: 22/48, x2: 46/48, y2: 36/48}, 
    lineOfSightBox: { idle: {x1: 8/48, y1: 9/48, x2: 40/48, y2: 42/48}},
    zOrder: 1,
};

const anvilBig = {
    type: "prop",
    image: "blacksmith",
    tileWidth: 48,
    tileHeight: 48,
    tileI: 6,
    tileJ: 10,
    x: 0,
    y: 0,
    velocityX: 0,
    velocityY: 0,
    size: 1,
    collisionBox: {x1: 7/48, y1: 25/48, x2: 34/48, y2: 29/48}, 
    lineOfSightBox: { idle: {x1: 2/48, y1: 12/48, x2: 47/48, y2: 38/48}},
    zOrder: 1,
};

const anvilBigStone = {
    type: "prop",
    image: "blacksmith",
    tileWidth: 48,
    tileHeight: 48,
    tileI: 6,
    tileJ: 11,
    x: 0,
    y: 0,
    velocityX: 0,
    velocityY: 0,
    size: 1,
    collisionBox: {x1: -6/48, y1: 27/48, x2: 54/48, y2: 39/48}, 
    lineOfSightBox: { idle: {x1: 0, y1: 5/48, x2: 47/48, y2: 40/48}},
    zOrder: 1,
};