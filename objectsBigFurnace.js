const bigFurnaceTILE1 = {
    type: "prop",
    image: "blacksmith",
    tileCount: 1,
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
                { i: 1, j: 3 },
                { i: 4, j: 3 },
                { i: 7, j: 3 },
            ]
        }
    },
    currentAnimation: "idle",
    animationSpeed: 1.0,
    collisionBox: {x1: 0, y1: 0, x2: 0, y2: 0}, 
    lineOfSightBox: { idle: {x1: 0, y1: 47/48, x2: 1, y2: 1}},
    zOrder: 1,
};

const bigFurnaceTILE2 = {
    type: "prop",
    image: "blacksmith",
    tileWidth: 48,
    tileHeight: 48,
    tileCount: 2,
    tileI: 0,
    tileJ: 4,
    x: 0,
    y: 0,
    velocityX: 0,
    velocityY: 0,
    size: 1,
    collisionBox: {x1: 0, y1: 0, x2: 1, y2: 1}, 
    lineOfSightBox: { idle: {x1: 0, y1: 0, x2: 0, y2: 0}}, 
    zOrder: 1,
};

const bigFurnaceTILE3 = utils.deepCopy({...bigFurnaceTILE2,
    tileCount: 3,
    tileI: 1,
    lineOfSightBox: { idle: {x1: 0, y1: 0, x2: 1, y2: 1}}, 
});

const bigFurnaceTILE4 = utils.deepCopy({...bigFurnaceTILE2,
    tileCount: 4,
    tileI: 2,
});

const bigFurnaceTILE5 = utils.deepCopy({...bigFurnaceTILE2,
    tileCount: 5,
    tileI: 0,
    tileJ: 5,
});

const bigFurnaceTILE6 = utils.deepCopy({...bigFurnaceTILE2,
    tileCount: 6,
    tileI: 1,
    tileJ: 5,
});

const bigFurnaceTILE7 = utils.deepCopy({...bigFurnaceTILE2,
    tileCount: 7,
    tileI: 2,
    tileJ: 5,
});

const bigFurnaceTILE8 = utils.deepCopy({...bigFurnaceTILE2,
    tileCount: 8,
    tileI: 0,
    tileJ: 6,
    collisionBox: {x1: 2/48, y1: 0, x2: 1, y2: 1}, 
});

const bigFurnaceTILE9 = utils.deepCopy({...bigFurnaceTILE1,
    tileCount: 9,
    animations: {
        idle: {
            duration: 700, tiles: [
                { i: 1, j: 6 },
                { i: 4, j: 6 },
                { i: 7, j: 6 },
            ]
        }
    },
    collisionBox: {x1: 0, y1: 0, x2: 1, y2: 1}, 
    lineOfSightBox: { idle: {x1: 0, y1: 0, x2: 0, y2: 0}}, 
    zOrder: 0,
});

const bigFurnaceTILE10 = utils.deepCopy({...bigFurnaceTILE1,
    tileCount: 10,
    animations: {
        idle: {
            duration: 700, tiles: [
                { i: 2, j: 6 },
                { i: 5, j: 6 },
                { i: 8, j: 6 },
            ]
        }
    },
    collisionBox: {x1: 0, y1: 0, x2: 46/48, y2: 1}, 
    lineOfSightBox: { idle: {x1: 0, y1: 0, x2: 0, y2: 0}}, 
});

const bigFurnaceTILE11 = utils.deepCopy({...bigFurnaceTILE8,
    tileCount: 11,
    tileI: 0,
    tileJ: 7,
    collisionBox: {x1: 2/48, y1: 0, x2: 1, y2: 30/48},
});

const bigFurnaceTILE12 = utils.deepCopy({...bigFurnaceTILE9,
    tileCount: 12,
    animations: {
        idle: {
            duration: 700, tiles: [
                { i: 1, j: 7 },
                { i: 4, j: 7 },
                { i: 7, j: 7 },
            ]
        }
    },
    collisionBox: {x1: 0, y1: 0, x2: 1, y2: 33/48}, 
});

const bigFurnaceTILE13 = utils.deepCopy({...bigFurnaceTILE10,
    tileCount: 13,
    animations: {
        idle: {
            duration: 700, tiles: [
                { i: 2, j: 7 },
                { i: 5, j: 7 },
                { i: 8, j: 7 },
            ]
        }
    },
    collisionBox: {x1: 0, y1: 0, x2: 46/48, y2: 30/48},
});




//VERSION 2


const bigFurnaceVersion2TILE1 = {
    type: "prop",
    image: "blacksmith",
    tileCount: 1,
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
                { i: 10, j: 3 },
                { i: 13, j: 3 },
                { i: 16, j: 3 },
            ]
        }
    },
    currentAnimation: "idle",
    animationSpeed: 1.0,
    collisionBox: {x1: 0, y1: 0, x2: 0, y2: 0}, 
    lineOfSightBox: { idle: {x1: 0, y1: 47/48, x2: 1, y2: 1}},
    zOrder: 1,
};

const bigFurnaceVersion2TILE2 = {
    type: "prop",
    image: "blacksmith",
    tileWidth: 48,
    tileHeight: 48,
    tileCount: 2,
    tileI: 9,
    tileJ: 4,
    x: 0,
    y: 0,
    velocityX: 0,
    velocityY: 0,
    size: 1,
    collisionBox: {x1: 0, y1: 0, x2: 1, y2: 1}, 
    lineOfSightBox: { idle: {x1: 0, y1: 0, x2: 0, y2: 0}}, 
    zOrder: 1,
};

const bigFurnaceVersion2TILE3 = utils.deepCopy({...bigFurnaceVersion2TILE2,
    tileCount: 3,
    tileI: 10,
});

const bigFurnaceVersion2TILE4 = utils.deepCopy({...bigFurnaceVersion2TILE2,
    tileCount: 4,
    tileI: 11,
});

const bigFurnaceVersion2TILE5 = utils.deepCopy({...bigFurnaceVersion2TILE2,
    tileCount: 5,
    tileI: 9,
    tileJ: 5,
});

const bigFurnaceVersion2TILE6 = utils.deepCopy({...bigFurnaceVersion2TILE2,
    tileCount: 6,
    tileI: 10,
    tileJ: 5,
});

const bigFurnaceVersion2TILE7 = utils.deepCopy({...bigFurnaceVersion2TILE2,
    tileCount: 7,
    tileI: 11,
    tileJ: 5,
});

const bigFurnaceVersion2TILE8 = utils.deepCopy({...bigFurnaceVersion2TILE2,
    tileCount: 8,
    tileI: 9,
    tileJ: 6,
    collisionBox: {x1: 2/48, y1: 0, x2: 1, y2: 1}, 
});

const bigFurnaceVersion2TILE9 = utils.deepCopy({...bigFurnaceVersion2TILE1,
    tileCount: 9,
    animations: {
        idle: {
            duration: 700, tiles: [
                { i: 10, j: 6 },
                { i: 13, j: 6 },
                { i: 16, j: 6 },
            ]
        }
    },
    collisionBox: {x1: 0, y1: 0, x2: 1, y2: 1}, 
    lineOfSightBox: { idle: {x1: 0, y1: 0, x2: 0, y2: 0}}, 
    zOrder: 0,
});

const bigFurnaceVersion2TILE10 = utils.deepCopy({...bigFurnaceVersion2TILE2,
    tileCount: 10,
    tileI: 11,
    tileJ: 6,
    collisionBox: {x1: 0, y1: 0, x2: 46/48, y2: 1}, 
});

const bigFurnaceVersion2TILE11 = utils.deepCopy({...bigFurnaceVersion2TILE8,
    tileCount: 11,
    tileI: 9,
    tileJ: 7,
    collisionBox: {x1: 2/48, y1: 0, x2: 1, y2: 30/48},
});

const bigFurnaceVersion2TILE12 = utils.deepCopy({...bigFurnaceVersion2TILE9,
    tileCount: 12,
    animations: {
        idle: {
            duration: 700, tiles: [
                { i: 10, j: 7 },
                { i: 13, j: 7 },
                { i: 16, j: 7 },
            ]
        }
    },
    collisionBox: {x1: 0, y1: 0, x2: 1, y2: 33/48}, 
});

const bigFurnaceVersion2TILE13 = utils.deepCopy({...bigFurnaceVersion2TILE10,
    tileCount: 13,
    tileI: 11,
    tileJ: 7,
    collisionBox: {x1: 0, y1: 0, x2: 46/48, y2: 30/48},
});