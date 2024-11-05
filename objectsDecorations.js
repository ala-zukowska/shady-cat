const torch = {
    type: "prop",
    image: "lightSource",
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
                { i: 1, j: 0 },
                { i: 2, j: 0 },
                { i: 3, j: 0 },
            ]
        }
    },
    currentAnimation: "idle",
    animationSpeed: 1.0,
    collisionBox: {x1: 0, y1: 0, x2: 1, y2: 1}, 
    lineOfSightBox: {
        idle: {x1: 0, y1: -1/48, x2: 1, y2: 0}, 
    },
    zOrder: 1,
};