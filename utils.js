
const utils = {
    rand: function(min,max){
        return Math.random() * (max-min) + min;
        },
    
    randInteger: function(min,max){
        return (Math.random() * (max-min) + min) | 0;
        },
    
    colour: function(r,g,b){
        return `rgb(${r},${g},${b})`;
    },

    removeFromArray: function (arr, element){
        let index = arr.indexOf(element);
        if (index >= 0) {
            arr.splice(index,1);
        }
    },

    sqrDistance: function (a,b){
        let x = a.x - b.x;
        let y = a.y - b.y;
        return x*x + y*y
    
    },

    clamp: function(value,min,max){
        return Math.max((Math.min(max,value)),min);
    },

    deepCopy: function(object){
        return JSON.parse(JSON.stringify(object));
    },

    isObjectInBoundries: function(object,x1,y1,x2,y2){
        let x = object.x;
        let y = object.y;
        if (x<= x2 && x >= x1 && y<= y2 && y>=y1){
            return true;
        } else {
            return false;
        }
    },

    toggleButtonById: function(id1,id2,todo={}){
        let node = document.getElementById(id1);
        if (node.parentNode) {
            node.parentNode.removeChild(node);
        }
        let newButton = document.createElement("button");
        newButton.setAttribute("id", id2)
        newButton.setAttribute("class", "roundButton")
        for (let key in todo){
            newButton.setAttribute(key, todo[key])
        }
        
        document.getElementById("wrapper").appendChild(newButton)
    },
}

