var spr=PP.spr,rm=PP.rm,obj=PP.obj,snd=PP.snd,al=PP.al,global=PP.global,Alarm=PP.Alarm,collision=PP.collision,draw=PP.draw,init=PP.init,key=PP.key,load=PP.load,loop=PP.loop,mouse=PP.mouse,physics=PP.physics,Sound=PP.Sound,SoundEffect=PP.SoundEffect,Sprite=PP.Sprite,view=PP.view,walkDown=PP.walkDown;

obj.gameObject = {
    parent: {

        mask : [],

        initialize: function(t) {
            //position the objects
            t.x = Math.floor(Math.random()*640);
            t.y = 523;
            t.angle = 0;
            t.mask = t.sprite.mask;
        },

        tick: function(t) {
            //move object if it't not at the top border yet
            if(t.y - t.sprite.height > 10 && !t.stop){
                t.y -= t.vspeed;
            }else {
                t.stop = true;
            }

            //when object is selected
            if (mouse.left.down && collision.point(t,mouse.x,mouse.y,false)) {
                obj.dragControl.select(t);
                global.score += t.vspeed;
                t.offsetX = mouse.x - t.x;
                t.offsetY = mouse.y - t.y;
            }

            //when object is deselected
            if(!mouse.left.pressed){
                obj.dragControl.deselect(t);
            }
        },

        draw: function(t) {
            if(t.selected){
                //draw selection rectangle around the selected element
                draw.rectangle(t.x-2 - t.sprite.width, t.y- t.sprite.height - 2, t.sprite.width + 4, t.sprite.height + 4, false, 'red');
            }
            t.sprite.draw(t.x,t.y);
            draw.textHalign = 'left';
            draw.textValign = 'bottom';
            draw.color = 'white';
            draw.font = 'normal normal normal 15px Curier';
            draw.text(t.x - t.sprite.width, t.y + 20, 'id: ' + t.id);
        }
    },

    //code specific for each implementation of game objects:
    mario: {
        vspeed: 3,
        sprite: spr.mario,
    },

    star: {
        vspeed: 2,
        sprite: spr.star,
    },

    bomb: {
        vspeed: 1,
        sprite: spr.bomb,
    }
};

function GameObject(id, proto){
    this.id = id;
    this.proto = proto;
    this.mask = proto.mask;
}

obj.count = 10;

// Set up the inheritence chain
obj.gameObject.mario.proto = obj.gameObject.parent;
obj.gameObject.star.proto = obj.gameObject.parent;
obj.gameObject.bomb.proto = obj.gameObject.parent;

obj.position = {
    initialize : function(t){
        t.mask = t.expectedBlob.sprite.mask;
        t.color = 'white';
    },

    draw : function(t) {
        draw.rectangle(t.x, t.y, t.expectedBlob.sprite.width, t.expectedBlob.sprite.height, false, t.color);
    },

    tick : function(t){
        for(var i =0 ; i < obj.blobsKeeper.blobs.length; i++){
            if(collision.objects(t, obj.blobsKeeper.blobs[i])){
                t.color = 'blue';
            }
        }
    }
};


function Position(x, y, expectedBlob, proto){
    this.x = x;
    this.y = y;
    this.expectedBlob = expectedBlob;
    this.proto = proto;
}


obj.blobsKeeper = {

    blobs : [],
    positions : [],

    initialize : function(t){
        t.blobs[0] = new GameObject(0, obj.gameObject.mario);
        t.blobs[1] = new GameObject(1, obj.gameObject.mario);
        t.blobs[2] = new GameObject(2, obj.gameObject.mario);
        t.blobs[3] = new GameObject(3, obj.gameObject.bomb);
        t.blobs[4] = new GameObject(4, obj.gameObject.bomb);
        t.blobs[5] = new GameObject(5, obj.gameObject.bomb);
        t.blobs[6] = new GameObject(6, obj.gameObject.star);
        t.blobs[7] = new GameObject(7, obj.gameObject.star);
        t.blobs[8] = new GameObject(8, obj.gameObject.star);
        t.blobs[9] = new GameObject(9, obj.gameObject.star);

        t.positions[0] = new Position(200, 150, t.blobs[4], obj.position);
    }

};


