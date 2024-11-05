const floor = {
    type: "prop",
    image: "tileset2",
    tileWidth: 48,
    tileHeight: 48,
    tileI: 7,
    tileJ: 0,
    x: 0,
    y: 0,
    velocityX: 0,
    velocityY: 0,
    size: 1,
    collisionBox: null,
    lineOfSightBox: null,
    zOrder: 0,
};

const floorVoid = utils.deepCopy({...floor, 
    tileI: 12,
    tileJ: 6, 
});

const wallFrontTOP = utils.deepCopy({...floor, 
    tileI: 1,
    tileJ: 0, 
    collisionBox: {x1: -4/48, y1: 0, x2: 54/48, y2: 1}, //{x1: 0, y1: 0, x2: 1, y2: 46/64}
    lineOfSightBox: { idle: {x1: 0, y1: 0, x2: 1, y2: 1}},
    zOrder: 1
});

const wallFrontBOTTOM = utils.deepCopy({...wallFrontTOP, 
    tileI: 1,
    tileJ: 1, 
});

const wallLeft = utils.deepCopy({...floor,
    tileI: 0,
    tileJ: 3, 
    collisionBox: {x1: -4/48, y1: 0, x2: 19/48, y2: 1},
    lineOfSightBox: { idle: {x1: 0, y1: 0, x2: 13/48, y2: 1}},
});

const wallLeftDoorTOP = utils.deepCopy({...wallLeft,
    tileI: 10,
    tileJ: 12, 
    collisionBox: {x1: -4/48, y1: 0, x2: 19/48, y2: 17/48},
    lineOfSightBox: { idle: {x1: 0, y1: 0, x2: 13/48, y2: 17/48}},
});

const wallLeftDoorBOTTOM = utils.deepCopy({...wallLeft,
    tileI: 10,
    tileJ: 13, 
    collisionBox: {x1: -4/48, y1: 30/48, x2: 19/48, y2: 1},
    lineOfSightBox: { idle: {x1: 0, y1: 30/48, x2: 13/48, y2: 1}},
});

const wallRight = utils.deepCopy({...floor,
    tileI: 5, 
    tileJ: 3, 
    collisionBox: {x1: 29/48, y1: 0, x2: 54/48, y2: 1},
    lineOfSightBox: { idle: {x1: 35/48, y1: 0, x2: 1, y2: 1}},
    
});

const wallRightDoorTOP = utils.deepCopy({...wallRight,
    tileI: 12, 
    tileJ: 12, 
    collisionBox: {x1: 29/48, y1: 0, x2: 54/48, y2: 17/48},
    lineOfSightBox: { idle: {x1: 35/48, y1: 0, x2: 1, y2: 17/48}},
    
});

const wallRightDoorBOTTOM = utils.deepCopy({...wallRight,
    tileI: 12, 
    tileJ: 13, 
    collisionBox: {x1: 29/48, y1: 31/48, x2: 54/48, y2: 1},
    lineOfSightBox: { idle: {x1: 35/48, y1: 31/48, x2: 1, y2: 1}},
    
});

const roomDownLeftCornerTOP = utils.deepCopy({...wallFrontTOP,
    tileI: 0,
    tileJ: 8, 
});

const roomDownLeftCornerBOTTOM = utils.deepCopy({...wallFrontTOP,
    tileI: 0,
    tileJ: 9, 
});

const roomDownRightCornerTOP = utils.deepCopy({...wallFrontTOP,
    tileI: 5,
    tileJ: 8, 
});

const roomDownRightCornerBOTTOM = utils.deepCopy({...wallFrontTOP,
    tileI: 5,
    tileJ: 9, 
});

const roomUpLeftCornerTOP = utils.deepCopy({...wallFrontTOP,
    tileI: 0,
    tileJ: 0, 
});

const roomUpLeftCornerBOTTOM = utils.deepCopy({...wallFrontTOP,
    tileI: 0,
    tileJ: 1, 
});

const roomUpRightCornerTOP = utils.deepCopy({...wallFrontTOP,
    tileI: 5,
    tileJ: 0,
});

const roomUpRightCornerBOTTOM = utils.deepCopy({...wallFrontTOP,
    tileI: 5,
    tileJ: 1,
});

const passageLeftTOP = utils.deepCopy({...wallFrontTOP,
    tileI: 7,
    tileJ: 8,
});

const passageLeftBOTTOM = utils.deepCopy({...wallFrontTOP,
    tileI: 7,
    tileJ: 9,
});

const passageRightTOP = utils.deepCopy({...wallFrontTOP,
    tileI: 8,
    tileJ: 8,
});

const passageRightBOTTOM = utils.deepCopy({...wallFrontTOP,
    tileI: 8,
    tileJ: 9,
});