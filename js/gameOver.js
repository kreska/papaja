var spr=PP.spr,rm=PP.rm,obj=PP.obj,snd=PP.snd,al=PP.al,global=PP.global,Alarm=PP.Alarm,collision=PP.collision,draw=PP.draw,init=PP.init,key=PP.key,load=PP.load,loop=PP.loop,mouse=PP.mouse,physics=PP.physics,Sound=PP.Sound,SoundEffect=PP.SoundEffect,Sprite=PP.Sprite,view=PP.view,walkDown=PP.walkDown;

// The gameOver object controls the drawing of the final score and allows the user
// to press enter to start a new game.
obj.gameOver = {
    tick: function(t) {
        // If the enter key has been released, switch back to the play room
        if (key.enter.up) {
            loop.room = rm.play;
        }
    },

    // Here the game over texts are drawn
    draw: function(t) {
        draw.textHalign = 'center';
        draw.textValign = 'middle';
        draw.color = 'white';
        draw.font = 'normal normal normal 50px Georgia';
        draw.text(320,240,'Score: ' + global.score);
        draw.font = 'normal normal normal 20px Georgia';
        draw.textValign = 'alphabetic';
        draw.text(320,15,'Press enter to start a new game');
    }
};
