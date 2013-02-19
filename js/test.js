(function() {
    var spr=PP.spr,rm=PP.rm,obj=PP.obj,snd=PP.snd,al=PP.al,global=PP.global,Alarm=PP.Alarm,collision=PP.collision,draw=PP.draw,init=PP.init,key=PP.key,load=PP.load,loop=PP.loop,mouse=PP.mouse,physics=PP.physics,Sound=PP.Sound,SoundEffect=PP.SoundEffect,Sprite=PP.Sprite,view=PP.view,walkDown=PP.walkDown;

    init('game',640,480);
    loop.rate = 30;



    // This function will be invoked when all of the resources have finished downloading
    load(function() {
        obj.background = {
            depth: -1,
            draw: function(t) {
                spr.background.draw(0,0);
            }
        };

        obj.score = {
            initialize: function(t) {
                // Create the alarm to be used as a countdown
                t.countdown = new Alarm(function() {
                    // When the alarm reaches 0, switch to the rm.gameOver room.
                    loop.room = rm.gameOver;
                });

                // Alarms are decremented by 1 each loop. If we take the loops per second and multiply by some
                // number, we will be able to count down in seconds. Here, the countdown will take 30 seconds.
                t.countdown.time = loop.rate*30;
            },

            draw: function(t) {
                // The textHalign property sets the horizontal alignment of the draw.text function
                draw.textHalign = 'left';
                // The textValign property sets the vertical alignment of the draw.text function
                draw.textValign = 'bottom';
                // Change the drawing color (used for things like primitive shapes and text) to white, so the score text
                // will be visible against a brown background
                draw.color = 'white';
                // The draw.font property takes a css font string, to be used by the draw.text function
                draw.font = 'normal normal normal 20px Georgia';
                // Here, the score is drawn in the bottom left at position (0,480)
                draw.text(0,480,'Score: '+global.score);

                // If there are 5 seconds left, switch to red
                if (t.countdown.time <= loop.rate*5) {
                    draw.color = 'red';
                }

                // Draw the current time remaining.
                draw.text(0,450,Math.ceil(t.countdown.time/loop.rate)+' Seconds Left');
            }
        };

        rm.play = function() {
            // Register the background and score objects
            loop.register(obj.background,0,0);
            loop.register(obj.score,0,0);
            global.score = 0;

            // The balloonCreator alarm controls the timing of the creations of the balloons
            var gameCreator = new Alarm(function() {

                // The choose function will randomly choose one of the passed parameters and return it.
                // The loop.beget function is a combination of the Object.create and loop.register functions
                loop.beget(Math.choose(obj.gameObject.mario,obj.gameObject.star,obj.gameObject.bomb));

                // The alarm resets itself for half a second. Objects will spawn half a second apart.
                this.time = loop.rate*.5;
            });

            // Set the initial alarm time to 0 so it will trigger right away.
            gameCreator.time = 0;
        };

        rm.gameOver = function() {
           loop.register(obj.background,0,0);
           loop.register(obj.gameOver);
        };

        loop.active = true;
        loop.room = rm.play;
    });
}());