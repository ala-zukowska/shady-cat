const smallFurnaceTILE1 = {
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
            duration: 500, tiles: [
                { i: 0, j: 0 },
                { i: 2, j: 0 },
                { i: 4, j: 0 },
            ]
        }
    },
    currentAnimation: "idle",
    animationSpeed: 1.0,
    collisionBox: {x1: 0, y1: 0, x2: 1, y2: 1}, 
    lineOfSightBox: {
        idle: {x1: 0, y1: 0, x2: 0, y2: 0}, 
    },
    zOrder: 1,
};

const smallFurnaceTILE2 = utils.deepCopy({...smallFurnaceTILE1,
    animations: {
        idle: {
            duration: 500, tiles: [
                { i: 1, j: 0 },
                { i: 3, j: 0 },
                { i: 5, j: 0 },
            ]
        }
    },
});

const smallFurnaceTILE3 = utils.deepCopy({...smallFurnaceTILE1,
    animations: {
        idle: {
            duration: 500, tiles: [
                { i: 0, j: 1 },
                { i: 2, j: 1 },
                { i: 4, j: 1 },
            ]
        }
    },
    collisionBox: {x1: 13/48, y1: 0, x2: 1, y2: 1}, 
});

const smallFurnaceTILE4 = utils.deepCopy({...smallFurnaceTILE1,
    animations: {
        idle: {
            duration: 500, tiles: [
                { i: 1, j: 1 },
                { i: 3, j: 1 },
                { i: 5, j: 1 },
            ]
        }
    },
    collisionBox: {x1: 0, y1: 0, x2: 40/48, y2: 1}, 
});

const smallFurnaceTILE5 = utils.deepCopy({...smallFurnaceTILE1,
    animations: {
        idle: {
            duration: 500, tiles: [
                { i: 0, j: 2 },
                { i: 2, j: 2 },
                { i: 4, j: 2 },
            ]
        }
    },
    collisionBox: {x1: 13/48, y1: 0, x2: 1, y2: 36/48}, 
});

const smallFurnaceTILE6 = utils.deepCopy({...smallFurnaceTILE1,
    animations: {
        idle: {
            duration: 500, tiles: [
                { i: 1, j: 2 },
                { i: 3, j: 2 },
                { i: 5, j: 2 },
            ]
        }
    },
    collisionBox: {x1: 0, y1: 0, x2: 40/48, y2: 36/48}, 
});



//small furnace closed
const smallFurnaceClosedTILE1 = utils.deepCopy({...smallFurnaceTILE1,
    animations: {
        idle: {
            duration: 1300, tiles: [
                { i: 7, j: 0 },
                { i: 9, j: 0 },
                { i: 11, j: 0 },
                { i: 13, j: 0 },
                { i: 15, j: 0 },
                { i: 17, j: 0 },
            ]
        }
    },
});

const smallFurnaceClosedTILE2 = utils.deepCopy({...smallFurnaceTILE1,
    animations: {
        idle: {
            duration: 1300, tiles: [
                { i: 6, j: 1 },
                { i: 8, j: 1 },
                { i: 10, j: 1 },
                { i: 12, j: 1 },
                { i: 14, j: 1 },
                { i: 16, j: 1 },
            ]
        }
    },
    collisionBox: {x1: 14/48, y1: 0, x2: 1, y2: 1}, 
});

const smallFurnaceClosedTILE3 = utils.deepCopy({...smallFurnaceTILE1,
    animations: {
        idle: {
            duration: 1300, tiles: [
                { i: 7, j: 1 },
                { i: 9, j: 1 },
                { i: 11, j: 1 },
                { i: 13, j: 1 },
                { i: 15, j: 1 },
                { i: 17, j: 1 },
            ]
        }
    },
    collisionBox: {x1: 0, y1: 0, x2: 41/48, y2: 1}, 
});

const smallFurnaceClosedTILE4 = utils.deepCopy({...smallFurnaceTILE1,
    animations: {
        idle: {
            duration: 1300, tiles: [
                { i: 6, j: 2 },
                { i: 8, j: 2 },
                { i: 10, j: 2 },
                { i: 12, j: 2 },
                { i: 14, j: 2 },
                { i: 16, j: 2 },
            ]
        }
    },
    collisionBox: {x1: 14/48, y1: 0, x2: 1, y2: 24/48}, 
});

const smallFurnaceClosedTILE5 = utils.deepCopy({...smallFurnaceTILE1,
    animations: {
        idle: {
            duration: 1300, tiles: [
                { i: 7, j: 2 },
                { i: 9, j: 2 },
                { i: 11, j: 2 },
                { i: 13, j: 2 },
                { i: 15, j: 2 },
                { i: 17, j: 2 },
            ]
        }
    },
    collisionBox: {x1: 0, y1: 0, x2: 41/48, y2: 24/48}, 
});