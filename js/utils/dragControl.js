var spr=PP.spr,rm=PP.rm,obj=PP.obj,snd=PP.snd,al=PP.al,global=PP.global,Alarm=PP.Alarm,collision=PP.collision,draw=PP.draw,init=PP.init,key=PP.key,load=PP.load,loop=PP.loop,mouse=PP.mouse,physics=PP.physics,Sound=PP.Sound,SoundEffect=PP.SoundEffect,Sprite=PP.Sprite,view=PP.view,walkDown=PP.walkDown;

/**
 * Drag control knows which games objects are selected and allows dragging of the latest selected object
 * It expects game objects to call selected and deselect methods to enable and disable dragging
 * It expects offsetX and offsetY properites to be set
 *
 * @type {{initialize: Function, select: Function, deselect: Function, isSelected: Function, tick: Function}}
 */

obj.dragControl = {

    initialize : function(t){
        t.objects = []
    },

    select : function(gameObject){
        this.objects.push(gameObject);
    },

    deselect : function(gameObject){
        gameObject.selected = false;
        this.objects.pop(gameObject);
    },

    tick : function(t){
        if(t.objects.length > 0 && mouse.left.pressed){
            var selectedObject = t.objects[t.objects.length -1];
            selectedObject.selected = true;
            selectedObject.x = mouse.x - selectedObject.offsetX;
            selectedObject.y = mouse.y - selectedObject.offsetY;

        }
    }
};

