var spr=PP.spr,rm=PP.rm,obj=PP.obj,snd=PP.snd,al=PP.al,global=PP.global,Alarm=PP.Alarm,collision=PP.collision,draw=PP.draw,init=PP.init,key=PP.key,load=PP.load,loop=PP.loop,mouse=PP.mouse,physics=PP.physics,Sound=PP.Sound,SoundEffect=PP.SoundEffect,Sprite=PP.Sprite,view=PP.view,walkDown=PP.walkDown;

obj.count = 10;

obj.gameObject = {
    parent: {
        // The t parameter passed to this function will hold the same value as "this" will inside a function
        initialize: function(t) {
            //position the objects
            t.x = Math.floor(Math.random()*640);
            t.y = 523;
            t.angle = 0;
            t.mask = t.sprite.mask;
        },

        //on every "tick" do
        tick: function(t) {
            t.y -= t.vspeed;
            // The collision.point function determines if a point lies within a mask.
            if (mouse.left.down && collision.point(t,mouse.x,mouse.y,false)) {
                global.score += t.vspeed;
                //disappear t:
                loop.remove(t);
                obj.count--;
            }

            // If the object moves so far up that it is outside of the view, remove it
            if (t.y < -40) {
                loop.remove(t);
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
        sprite: spr.bomb,
        clicked: false,

        tick: function(t) {
            t.y -= t.vspeed;
            // The collision.point function determines if a point lies within a mask.
            if (mouse.left.down && collision.point(t,mouse.x,mouse.y,false)) {
                global.score += t.vspeed;
                t.x = mouse.x;
                t.y = mouse.y;
                t.clicked=true;
            }

            if(t.clicked && mouse.left.pressed){
                t.x = mouse.x + t.sprite.width/2;
                t.y = mouse.y + t.sprite.height/2;
            }else{
                t.clicked=false;
            }
        },

        draw: function(t) {
            t.sprite.draw(t.x,t.y);
        }
    }
};

// Set up the inheritence chain
obj.gameObject.mario.proto = obj.gameObject.parent;
obj.gameObject.star.proto = obj.gameObject.parent;
obj.gameObject.bomb.proto = obj.gameObject.parent;

