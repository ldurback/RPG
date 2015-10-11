namespace SideScrollerRPG {

    export class Player extends Phaser.Sprite {

        stats: Status;

        cursors: Phaser.CursorKeys;
        facing: string;
        idle: boolean;
        attacking: boolean;

        equippedWeapon: Weapon;

        constructor(game: Phaser.Game, x: number, y: number) {
            super(game, x, y, 'character', 26);

            this.stats = this.game.playerStatus;

            this.equippedWeapon = new Weapon(game, this);

            this.attacking = false;
            this.idle = true;

            this.anchor.setTo(0.5, 0);

            game.physics.arcade.enable(this);

            this.body.collideWorldBounds = true;
            this.body.setSize(32, 48, 0, 14);

            this.animations.add('left', [117, 118, 119, 120, 121, 122, 123, 124, 125], 10, true);
            this.animations.add('right', [143, 144, 145, 146, 147, 148, 149, 150, 151], 10, true);
            this.animations.add('attackLeft', [169, 170, 171, 172, 173, 174], 10, false);
            this.animations.add('attackRight', [195, 196, 197, 198, 199, 200], 10, false);

            game.add.existing(this);

            this.cursors = game.input.keyboard.createCursorKeys();
        }

        update() {
            //  Do this AFTER the collide check, or we won't have blocked/touching set
            var standing = this.body.blocked.down || this.body.touching.down;

            this.body.velocity.x = 0;

            if (this.game.input.keyboard.isDown(Phaser.Keyboard.SPACEBAR) && !this.attacking) {
                this.attacking = true;
                this.idle = true;
                if (this.facing == 'left') {
                    this.equippedWeapon.activateLeft();
                    this.play('attackLeft').onComplete.addOnce(() => {
                        this.attacking = false;
                        this.equippedWeapon.deactivate();
                    });
                }
                else {
                    this.equippedWeapon.activateRight();
                    this.play('attackRight').onComplete.addOnce(() => {
                        this.attacking = false;
                        this.equippedWeapon.deactivate();
                    });
                }
            }

            if (!this.attacking) {

                if (this.cursors.left.isDown) {
                    this.body.velocity.x = -200;

                    if (this.facing !== 'left' || this.idle) {
                        this.play('left');
                        this.facing = 'left';
                        this.idle = false;
                    }
                }
                else if (this.cursors.right.isDown) {
                    this.body.velocity.x = 200;

                    if (this.facing !== 'right' || this.idle) {
                        this.play('right');
                        this.facing = 'right';
                        this.idle = false;
                    }
                }
                else {
                    this.animations.stop();

                    if (this.facing === 'left') {
                        this.frame = 117;
                    }
                    else {
                        this.frame = 143;
                    }

                    this.idle = true;
                }

                if (standing && this.cursors.up.isDown) {
                    this.body.velocity.y = -500;
                }
            }

            if (this.stats.currentHP <= 0) {
                this.kill();
            }
        }

    }

}