namespace SideScrollerRPG {
    abstract class Map extends Phaser.State {
        player: MapPlayer;

        preloadBar: Phaser.Sprite;

        preload() {
 
            //  Set-up our preloader sprite
            this.preloadBar = this.add.sprite(200, 250, 'preloadBar');
            this.load.setPreloadSprite(this.preloadBar);

            this.loadAssets();
        }

        abstract loadAssets();

        create() {
            this.game.returnState = this.name();
            this.preloadBar.kill();
            this.game.physics.arcade.gravity.y = 0;
            this.createScene();
        }

        abstract createScene();

        update() {
            // send to status screen on pressing escape
            if (this.game.input.keyboard.isDown(Phaser.Keyboard.ESC)) {
                this.game.playerReturnX = this.player.x;
                this.game.playerReturnY = this.player.y;
                this.game.state.start('StatusScreen', true, false);
            }

            this.mapSpecificUpdate();
        }

        abstract mapSpecificUpdate();

        name(): string {
            var funcNameRegex = /function (.{1,})\(/;
            var results = (funcNameRegex).exec((this).constructor.toString());
            return (results && results.length > 1) ? results[1] : "";
        }
    }

    export class BasicMap extends Map {
        battleTimer: Phaser.Timer;

        loadAssets() {
            this.load.spritesheet('character', 'assets/images/character.png', 64, 64);
        }

        createScene() {
            this.player = new MapPlayer(this.game, this.game.playerReturnX, this.game.playerReturnY);

            this.battleTimer = this.game.time.create(true);
            this.battleTimer.add(Math.random() * 9000 + 1000, () => {
                this.game.playerReturnX = this.player.x;
                this.game.playerReturnY = this.player.y;
                this.game.state.start('SlimeBattle', true, false);
            });
            this.battleTimer.start();
        }

        mapSpecificUpdate() {
            if (this.player.body.velocity.x != 0 || this.player.body.velocity.y != 0) {
                this.battleTimer.resume();
            }
            else {
                this.battleTimer.pause();
            }
        }
    }
}