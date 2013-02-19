var spr=PP.spr,rm=PP.rm,obj=PP.obj,snd=PP.snd,al=PP.al,global=PP.global,Alarm=PP.Alarm,collision=PP.collision,draw=PP.draw,init=PP.init,key=PP.key,load=PP.load,loop=PP.loop,mouse=PP.mouse,physics=PP.physics,Sound=PP.Sound,SoundEffect=PP.SoundEffect,Sprite=PP.Sprite,view=PP.view,walkDown=PP.walkDown;

spr.gameObjects = {};
spr.gameObjects.mario = new Sprite('img/mario.png',1,26,40);
spr.gameObjects.star = new Sprite('img/star.png',1,57,57);
spr.gameObjects.bomb = new Sprite('img/bomg.png',1,79,79);

spr.background = new Sprite('img/background.png',1,0,0);