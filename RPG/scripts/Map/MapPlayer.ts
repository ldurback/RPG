namespace SideScrollerRPG {

    export class MapPlayer extends Phaser.Sprite {
        cursors: Phaser.CursorKeys;
        facing: string;
        idle: boolean;
        constructor(game: Phaser.Game, x: number, y: number) {
            super(game, x, y, 'character', 104);

            this.idle = true;

            this.anchor.setTo(0.5, 0);

            game.physics.arcade.enable(this);

            this.body.collideWorldBounds = true;
            this.body.setSize(32, 48, 0, 14);

            this.animations.add('up', [104, 105, 106, 107, 108, 109, 110, 111, 112], 10, true);
            this.animations.add('left', [117, 118, 119, 120, 121, 122, 123, 124, 125], 10, true);
            this.animations.add('down', [130, 131, 132, 133, 134, 135, 136, 137, 138], 10, true);
            this.animations.add('right', [143, 144, 145, 146, 147, 148, 149, 150, 151], 10, true);

            game.add.existing(this);

            this.cursors = game.input.keyboard.createCursorKeys();
        }

        update() {
            //  Do this AFTER the collide check, or we won't have blocked/touching set
            var standing = this.body.blocked.down || this.body.touching.down;

            this.body.velocity.x = 0;
            this.body.velocity.y = 0;

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
            else if (this.cursors.up.isDown) {
                this.body.velocity.y = -200;

                if (this.facing !== 'up' || this.idle) {
                    this.play('up');
                    this.facing = 'up';
                    this.idle = false;
                }
            }
            else if (this.cursors.down.isDown) {
                this.body.velocity.y = 200;

                if (this.facing !== 'down' || this.idle) {
                    this.play('down');
                    this.facing = 'down';
                    this.idle = false;
                }
            }
            else {
                this.animations.stop();

                if (this.facing === 'left') {
                    this.frame = 117;
                }
                else if (this.facing === 'right') {
                    this.frame = 143;
                }
                else if (this.facing === 'up') {
                    this.frame = 104;
                }
                else if (this.facing === 'down') {
                    this.frame = 130;
                }

                this.idle = true;
            }
        }

    }

}