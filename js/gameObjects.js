var spr=PP.spr,rm=PP.rm,obj=PP.obj,snd=PP.snd,al=PP.al,global=PP.global,Alarm=PP.Alarm,collision=PP.collision,draw=PP.draw,init=PP.init,key=PP.key,load=PP.load,loop=PP.loop,mouse=PP.mouse,physics=PP.physics,Sound=PP.Sound,SoundEffect=PP.SoundEffect,Sprite=PP.Sprite,view=PP.view,walkDown=PP.walkDown;

obj.gameObject = {
    parent: {
        initialize: function(t) {
            //position the objects
            t.x = Math.floor(Math.random()*640);
            t.y = 523;
            t.angle = 0;
            t.mask = t.sprite.mask;
        },

        tick: function(t) {
            //move object if it't not at the top border yet
            if(t.y - t.sprite.height > 10){
                t.y -= t.vspeed;
            }

            //when object is selected
            if (mouse.left.down && collision.point(t,mouse.x,mouse.y,false)) {
                obj.dragControl.select(t);
                global.score += t.vspeed;
                t.offsetX = mouse.x - t.x;
                t.offsetY = mouse.y - t.y;
            }

            //when object is deselected
            //TODO: should only deselect if the object is in selected state (drag control should worry about it though)
            if(!mouse.left.pressed){
                obj.dragControl.deselect(t);
            }
        },

        draw: function(t) {
            t.sprite.draw(t.x,t.y);
        }
    },

    //code specific for each implementation of game objects:
    mario: {
        vspeed: 3,
        sprite: spr.mario
    },

    star: {
        vspeed: 2,
        sprite: spr.star
    },

    bomb: {
        vspeed: 1,
        sprite: spr.bomb
    }
};

obj.count = 10;

// Set up the inheritence chain
obj.gameObject.mario.proto = obj.gameObject.parent;
obj.gameObject.star.proto = obj.gameObject.parent;
obj.gameObject.bomb.proto = obj.gameObject.parent;


obj.blobs = [];
obj.blobs[0] = obj.gameObject.mario;
obj.blobs[1] = obj.gameObject.mario;
obj.blobs[2] = obj.gameObject.mario;
obj.blobs[3] = obj.gameObject.bomb;
obj.blobs[4] = obj.gameObject.bomb;
obj.blobs[5] = obj.gameObject.bomb;
obj.blobs[6] = obj.gameObject.star;
obj.blobs[7] = obj.gameObject.star;
obj.blobs[8] = obj.gameObject.star;
obj.blobs[9] = obj.gameObject.star;
obj.blobs[10] = obj.gameObject.bomb;
