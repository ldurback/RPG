namespace SideScrollerRPG {

    abstract class Battle extends Phaser.State {
        preloadBar: Phaser.Sprite;

        player: BattlePlayer;
        platforms: Phaser.Group;
        enemies: Phaser.Group;
        enemyBullets: Phaser.Group;

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

            this.physics.arcade.overlap(this.player, this.enemies, (player: BattlePlayer, enemy: Enemy) => {
                if (!player.invincible && !enemy.invincible) {
                    player.stats.currentHP -= enemy.stats.strength / player.stats.defense;
                    player.invincible = true;

                    var invincibleTimer: Phaser.Timer = this.game.time.create(true);
                    invincibleTimer.add(1000, () => {
                        player.invincible = false;
                    });
                    invincibleTimer.start();
                }
            });

            this.physics.arcade.overlap(this.player, this.enemyBullets, (player: BattlePlayer, bullet: Enemy) => {
                if (!player.invincible) {
                    player.stats.currentHP -= bullet.stats.strength / player.stats.defense;
                    player.invincible = true;

                    var invincibleTimer: Phaser.Timer = this.game.time.create(true);
                    invincibleTimer.add(1000, () => {
                        player.invincible = false;
                    });
                    invincibleTimer.start();
                }
            });

            this.physics.arcade.overlap(this.player.equippedWeapon, this.enemies, (playerWeapon: Weapon, enemy: Enemy) => {
                if (!enemy.invincible) {
                    enemy.stats.currentHP -= playerWeapon.wielder.stats.strength / enemy.stats.defense;

                    enemy.invincible = true;

                    var invincibleTimer: Phaser.Timer = this.game.time.create(true);
                    invincibleTimer.add(1000, () => {
                        enemy.invincible = false;
                    });
                    invincibleTimer.start();
                }
            });

            this.physics.arcade.collide(this.player, this.enemies);

            this.hpGauge.text = "HP: " + this.player.stats.currentHP + "/" + this.player.stats.maxHP;

            if (!this.player.alive) {
                this.game.state.start('GameOver');
            }

            if (this.enemies.getFirstAlive() == null) {
                this.game.state.start(this.game.returnState, true, false);
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

            this.player = new BattlePlayer(this.game, 130, 480);

            this.enemies = this.add.physicsGroup(Phaser.Physics.ARCADE);
            this.enemies.add(new Slime(this.game, 400, 380));
            this.enemies.add(new Slime(this.game, 250, 242));

            this.game.physics.arcade.gravity.y = 800;
        }
    }

    export class BowOrcBattle extends Battle {
        loadAssets() { 
            //  Load our actual games assets
            this.load.spritesheet('character', 'assets/images/character.png', 64, 64);
            this.load.spritesheet('bow-orc', 'assets/images/bow-orc.png', 64, 64);
            this.load.image('bullet', 'assets/images/bullet.png');
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

            this.player = new BattlePlayer(this.game, 130, 480);

            this.enemyBullets = this.add.physicsGroup(Phaser.Physics.ARCADE);

            this.enemies = this.add.physicsGroup(Phaser.Physics.ARCADE);
            this.enemies.add(new BowOrc(this.game, 400, 300, this.enemyBullets, this.player));
            this.enemies.add(new BowOrc(this.game, 250, 200, this.enemyBullets, this.player));

            this.game.physics.arcade.gravity.y = 800;
        }
    }
} 