(function () {
    var spr = PP.spr, rm = PP.rm, obj = PP.obj, snd = PP.snd, al = PP.al, global = PP.global, Alarm = PP.Alarm, collision = PP.collision, draw = PP.draw, init = PP.init, key = PP.key, load = PP.load, loop = PP.loop, mouse = PP.mouse, physics = PP.physics, Sound = PP.Sound, SoundEffect = PP.SoundEffect, Sprite = PP.Sprite, view = PP.view, walkDown = PP.walkDown;

    init('game', 640, 480);
    loop.rate = 30;
    obj.debugModeOn = isDebugModeOn(document.location.search);


    // This function will be invoked when all of the resources have finished downloading
    load(function () {

        obj.background = {
            depth: -1,
            draw: function (t) {
                spr.background.draw(0, 0);
            }
        };

        rm.play = function () {
            // Register the background and score objects
            loop.register(obj.background, 0, 0);
            loop.register(obj.score, 0, 0);
            loop.register(obj.dragControl);
            loop.register(obj.blobsKeeper);
            loop.register(obj.blobsKeeper.positions[0]);
            global.score = 0;
            var indexes = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9];

            // The alarm controls the timing of the creations of the balloons
            var gameCreator = new Alarm(function () {

                var index = Math.floor(Math.random() * (indexes.length));

                if (indexes.length > 0) {
                    if (obj.debugModeOn) {
                        console.log(index);
                    }
                    loop.beget(obj.blobsKeeper.blobs[indexes[index]]);
                    indexes.splice(index, 1);
                    if (obj.debugModeOn) {
                        console.log("count " + indexes.length);
                    }
                }

                // The alarm resets itself for half a second. Objects will spawn half a second apart.
                this.time = loop.rate * .5;
            });

            // Set the initial alarm time to 0 so it will trigger right away.
            gameCreator.time = 0;
        };

        rm.gameOver = function () {
            loop.register(obj.background, 0, 0);
            loop.register(obj.gameOver);
        };

        loop.active = true;
        loop.room = rm.play;
    });
}());