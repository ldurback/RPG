namespace SideScrollerRPG {

    export abstract class Enemy extends Phaser.Sprite {
        stats: Status;
        invincible: boolean;

        constructor(game: Phaser.Game, x: number, y: number, key?: string | Phaser.RenderTexture | Phaser.BitmapData | PIXI.Texture, frame?: string | number) {
            super(game, x, y, key, frame);

            game.add.existing(this);

            this.invincible = false;
        }

        update() {
            if (this.invincible) {
                this.renderable = !this.renderable;
            }
            else {
                this.renderable = true;
            }

            if (this.stats.currentHP <= 0) {
                this.kill();
            }

            this.doMotion();
        }

        abstract doMotion();
    }

    export class Slime extends Enemy {
        facing: string;

        constructor(game: Phaser.Game, x: number, y: number) {
            super(game, x, y, 'slime', 0);

            this.stats = {
                maxHP: 4,
                currentHP: 4,
                strength: 1,
                defense: 1
            };

            this.anchor.setTo(0.5, 0);

            game.physics.arcade.enable(this);

            this.body.collideWorldBounds = true;
            this.body.setSize(40, 22);

            this.facing = 'left';
        }

        doMotion() {
            var standing = this.body.blocked.down || this.body.touching.down;

            if (!standing) {
                if (this.facing == 'left') {
                    this.facing = 'right';
                }
                else {
                    this.facing = 'left';
                }
            }

            if (this.facing == 'left') {
                this.body.velocity.x = -200;
                this.scale.x = 1;
            }
            if (this.facing == 'right') {
                this.body.velocity.x = 200;
                this.scale.x = -1;
            }
        }

    }

    export class Bullet extends Enemy {
        constructor(game: Phaser.Game, x: number, y: number, xVelocity: number, yVelocity: number) {
            super(game, x, y, 'bullet');

            this.stats = {
                maxHP: 4,
                currentHP: 4,
                strength: 1,
                defense: 1
            };

            this.anchor.setTo(0.5, 0.5);
            game.physics.arcade.enable(this);
            this.body.setSize(8, 8);

            this.body.allowGravity = false;

            this.body.velocity.x = xVelocity;
            this.body.velocity.y = yVelocity;

            this.outOfBoundsKill = true;
        }

        doMotion() { }
    }

    export class BowOrc extends Enemy {
        facing: string;
        bulletGroup: Phaser.Group;
        player: BattlePlayer;

        shooting: boolean;

        constructor(game: Phaser.Game, x: number, y: number, bulletGroup: Phaser.Group, player: BattlePlayer) {
            super(game, x, y, 'bow-orc', 208);

            this.animations.add('shootLeft', [221, 221, 222, 223, 224, 225, 226, 227, 228, 229, 230, 231, 232, 233], 10, false);
            this.animations.add('shootRight', [247, 247, 248, 249, 250, 251, 252, 253, 254, 255, 256, 257, 258, 259], 10, false);

            this.bulletGroup = bulletGroup;
            this.player = player;

            this.shooting = false;

            this.stats = {
                maxHP: 4,
                currentHP: 4,
                strength: 1,
                defense: 1
            };

            this.anchor.setTo(0.5, 0);

            game.physics.arcade.enable(this);

            this.body.collideWorldBounds = true;
            this.body.setSize(32, 48, 0, 12);

            this.facing = 'left';
        }

        doMotion() {
            this.body.velocity.x = 0;

            if (this.x >= this.player.x) {
                this.facing = 'left';
            }
            else {
                this.facing = 'right';
            }

            // if not shooting and not stunned, shoot!
            if (!this.shooting && !this.invincible) {
                if (this.facing == 'left') {
                    this.shooting = true;
                    this.play('shootLeft').onComplete.addOnce(() => {
                        this.bulletGroup.add(new Bullet(this.game, this.x, this.y + this.height / 2, -200, 0));
                        this.shooting = false;
                    });
                }

                if (this.facing == 'right') {
                    this.shooting = true;
                    this.play('shootRight').onComplete.addOnce(() => {
                        this.bulletGroup.add(new Bullet(this.game, this.x, this.y + this.height / 2, 200, 0));
                        this.shooting = false;
                    });
                }
            }
        }
    }
}