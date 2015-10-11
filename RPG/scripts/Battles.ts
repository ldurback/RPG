namespace SideScrollerRPG {

    abstract class Battle extends Phaser.State {
        preloadBar: Phaser.Sprite;

        player: Player;
        platforms: Phaser.Group;
        enemies: Phaser.Group;

        hpGauge: Phaser.Text;

        preload() {
 
            //  Set-up our preloader sprite
            this.preloadBar = this.add.sprite(200, 250, 'preloadBar');
            this.load.setPreloadSprite(this.preloadBar);

            this.loadAssets();
        }

        abstract loadAssets();

        create() {
            this.preloadBar.kill();
            this.createScene();

            this.hpGauge = this.add.text(0, 0, "HP: ", {});
        }

        abstract createScene();

        update() {
            this.physics.arcade.collide(this.player, this.platforms);
            this.physics.arcade.collide(this.enemies, this.platforms);

            this.physics.arcade.collide(this.player, this.enemies, (player: Player, enemy: Slime) => {
                player.stats.currentHP -= enemy.stats.strength / player.stats.defense;
            });

            this.physics.arcade.collide(this.player.equippedWeapon, this.enemies, (playerWeapon: Weapon, enemy: Enemy) => {
                enemy.stats.currentHP -= playerWeapon.wielder.stats.strength / enemy.stats.defense;
            });

            this.hpGauge.text = "HP: " + this.player.stats.currentHP + "/" + this.player.stats.maxHP;

            if (!this.player.alive || (this.enemies.getFirstAlive() == null)) {
                this.game.state.start('BattleLoader');
            }
        }
    }

    export class SlimeBattle extends Battle {
        loadAssets() { 
            //  Load our actual games assets
            this.load.spritesheet('character', 'assets/images/character.png', 64, 64);
            this.load.image('slime', 'assets/images/slime.png');
            this.load.image('platform', 'assets/images/platform.png');
            this.load.image('background', 'assets/images/background.png');
        }

        createScene() {
            this.add.sprite(0, 0, 'background');

            this.platforms = this.add.physicsGroup(Phaser.Physics.ARCADE);

            this.platforms.create(200, 280, 'platform');
            this.platforms.create(300, 412, 'platform');

            this.platforms.setAll('body.allowGravity', false);
            this.platforms.setAll('body.immovable', true);

            this.player = new Player(this.game, 130, 480);

            this.enemies = this.add.physicsGroup(Phaser.Physics.ARCADE);
            this.enemies.add(new Slime(this.game, 400, 300));

            this.game.physics.arcade.gravity.y = 800;
        }
    }
} 