const cat = {
    type: "player",
    image: "catSprite",
    tileWidth: 32,
    tileHeight: 32,
    x: 0,
    y: 0,
    velocityX: 0,
    velocityY: 0,
    velocityScale: 1.0,
    walkToggleX: false,
    walkToggleY: false,
    size: 0.8,
    animations: {
        walkRight: {
            duration: 500, tiles: [
                { i: 0, j: 0 },
                { i: 1, j: 0 },
                { i: 2, j: 0 },
            ]
        },
        walkLeft: {
            duration: 500, tiles: [
                { i: 0, j: 3 },
                { i: 1, j: 3 },
                { i: 2, j: 3 },
            ]
        },
        walkUp: {
            duration: 500, tiles: [
                { i: 0, j: 1 },
                { i: 1, j: 1 },
                { i: 2, j: 1 },
            ]
        },
        walkDown: {
            duration: 500, tiles: [
                { i: 0, j: 2 },
                { i: 1, j: 2 },
                { i: 2, j: 2 },
            ]
        },
        idle: {
            duration: 1000, tiles: [
                { i: 0, j: 4 },
                { i: 1, j: 4 },
                { i: 2, j: 4 },
                { i: 3, j: 4 },
            ]
        }
    },
    currentAnimation: "idle",
    animationSpeed: 1.0,
    collisionBox: {x1: 10/32, y1: 14/32, x2: 24/32, y2: 27/32}, 
    lineOfSightBox: {
        idle: {x1: 10/32, y1: 9/32, x2: 23/32, y2: 28/32}, 
        walkUp: {x1: 10/32, y1: 4/32, x2: 23/32, y2: 27/32}, 
        walkDown: {x1: 10/32, y1: 9/32, x2: 23/32, y2: 28/32}, 
        walkRight: {x1: 8/32, y1: 8/32, x2: 28/32, y2: 27/32},
        walkLeft: {x1: 4/32, y1: 8/32, x2: 24/32, y2: 27/32},
    },
    zOrder: 1,
};

const mouse = {
    type: "prey",
    image: "mouseSprite",
    scoreValue: 1,
    tileWidth: 32,
    tileHeight: 32,
    x: 0,
    y: 0,
    velocityX: 0,
    velocityY: 0,
    velocityScale: 3.0,
    size: 0.4,
    animations: {
        walkRight: {
            duration: 500, tiles: [
                { i: 0, j: 1 },
                { i: 1, j: 1 },
                { i: 2, j: 1 },
            ]
        },
        walkLeft: {
            duration: 500, tiles: [
                { i: 0, j: 3 },
                { i: 1, j: 3 },
                { i: 2, j: 3 },
            ]
        },
        walkUp: {
            duration: 500, tiles: [
                { i: 0, j: 0 },
                { i: 1, j: 0 },
                { i: 2, j: 0 },
            ]
        },
        walkDown: {
            duration: 500, tiles: [
                { i: 0, j: 2 },
                { i: 1, j: 2 },
                { i: 2, j: 2 },
            ]
        },
        idle: {
            duration: 2000, tiles: [
                { i: 0, j: 2 },
                { i: 2, j: 2 },

            ]
        }
    },
    currentAnimation: "idle",
    animationSpeed: 3.0,
    collisionBox: {x1: 10/32, y1: 16/32, x2: 21/32, y2: 24/32},
    lineOfSightBox: {
        idle: {x1: 11/32, y1: 14/32, x2: 21/32, y2: 30/32}, 
        walkUp: {x1: 11/32, y1: 8/32, x2: 21/32, y2: 25/32}, 
        walkDown: {x1: 11/32, y1: 14/32, x2: 21/32, y2: 30/32}, 
        walkRight: {x1: 10/32, y1: 15/32, x2: 27/32, y2: 24/32},
        walkLeft: {x1: 5/32, y1: 15/32, x2: 22/32, y2: 24/32},
    },
    isColliding: false,
    zOrder: 1,
};

const rat = utils.deepCopy({...mouse, 
    image: "ratSprite", 
    scoreValue: 2,
    size: 0.6, 
    velocityScale: 4.0, 
    animationSpeed: 4.0,
    collisionBox: {x1: 10/32, y1: 13/32, x2: 22/32, y2: 22/32},
    lineOfSightBox: {
        idle: {x1: 11/32, y1: 13/32, x2: 21/32, y2: 31/32}, 
        walkUp: {x1: 11/32, y1: 4/32, x2: 21/32, y2: 25/32}, 
        walkDown: {x1: 11/32, y1: 13/32, x2: 21/32, y2: 31/32}, 
        walkRight: {x1: 7/32, y1: 11/32, x2: 29/32, y2: 21/32},
        walkLeft: {x1: 3/32, y1: 11/32, x2: 25/32, y2: 21/32},
    },
});

const wolf = {
    type: "predator",
    image: "wolfSprite",
    tileWidth: 64,
    tileHeight: 64,
    x: 0,
    y: 0,
    velocityX: 0,
    velocityY: 0,
    velocityScale: 3.0,
    size: 1.2,
    animations: {
        walkRight: {
            duration: 1000, tiles: [
                { i: 0, j: 2 },
                { i: 1, j: 2 },
                { i: 2, j: 2 },
                { i: 3, j: 2 },
                { i: 4, j: 2 },
            ]
        },
        walkLeft: {
            duration: 1000, tiles: [
                { i: 0, j: 3 },
                { i: 1, j: 3 },
                { i: 2, j: 3 },
                { i: 3, j: 3 },
                { i: 4, j: 3 },
            ]
        },
        walkUp: {
            duration: 1000, tiles: [
                { i: 0, j: 1 },
                { i: 1, j: 1 },
                { i: 2, j: 1 },
                { i: 3, j: 1 },
            ]
        },
        walkDown: {
            duration: 1000, tiles: [
                { i: 0, j: 0 },
                { i: 1, j: 0 },
                { i: 2, j: 0 },
                { i: 3, j: 0 },
            ]
        },
        idle: {
            duration: 4000, tiles: [
                { i: 0, j: 4 },
                { i: 1, j: 4 },
                { i: 2, j: 4 },
                { i: 3, j: 4 },
                { i: 3, j: 4 },
                { i: 3, j: 4 },
                { i: 3, j: 4 },
            ]
        },
    },
    currentAnimation: "idle",
    animationSpeed: 3.0,
    collisionBox: {x1: 18/64, y1: 19/64, x2: 47/64, y2: 45/64},
    lineOfSightBox: {
        idle: {x1: 21/64, y1: 20/64, x2: 44/64, y2: 54/64}, 
        walkUp: {x1: 21/64, y1: 14/64, x2: 44/64, y2: 51/64}, 
        walkDown: {x1: 21/64, y1: 12/64, x2: 44/64, y2: 54/64}, 
        walkRight: {x1: 13/64, y1: 20/64, x2: 57/64, y2: 40/64},
        walkLeft: {x1: 6/64, y1: 20/64, x2: 50/64, y2: 40/64},
    },
    zOrder: 1,
};

const light = {
    type: "light",
    x: 5,
    y: 5,
    velocityX: 0,
    velocityY: 0,
    size: 1,
    zOrder: 2,
    colour: {r: 255, g: 255, b: 255},
    flicker: 0.4,
    noiseParameters: [
        {value: 0, range: 1}, {value: 0, range: 1}, 
        {value: 0, range: 5},
    ],
};