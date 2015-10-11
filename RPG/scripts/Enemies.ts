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
            //  Do this AFTER the collide check, or we won't have blocked/touching set
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

}