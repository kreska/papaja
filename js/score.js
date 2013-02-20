var spr=PP.spr,rm=PP.rm,obj=PP.obj,snd=PP.snd,al=PP.al,global=PP.global,Alarm=PP.Alarm,collision=PP.collision,draw=PP.draw,init=PP.init,key=PP.key,load=PP.load,loop=PP.loop,mouse=PP.mouse,physics=PP.physics,Sound=PP.Sound,SoundEffect=PP.SoundEffect,Sprite=PP.Sprite,view=PP.view,walkDown=PP.walkDown;

obj.score = {
    tick: function(t){

        obj.debugModeOn = document.controlForm.debugMode.checked;

        if(obj.count <= 0){
            loop.room = rm.gameOver;
        }
    },

    draw: function(t) {
        draw.textHalign = 'left';
        draw.textValign = 'bottom';
        draw.color = 'white';
        draw.font = 'normal normal normal 20px Georgia';
        draw.text(0,480,'Score: '+global.score);
    }
};