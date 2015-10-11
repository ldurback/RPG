namespace SideScrollerRPG {
    export interface WeaponStatus {

    }

    export class Weapon extends Phaser.Sprite {
        wielder: BattlePlayer;
        stats: WeaponStatus;

        constructor(game: Phaser.Game, wielder: BattlePlayer) {
            super(game, 0, 0);

            this.wielder = wielder;

            game.physics.arcade.enable(this);
            this.body.setSize(32, 48);
            this.body.enable = false;
            this.body.immovable = true;
            this.body.allowGravity = false;

            game.add.existing(this);
        }

        activateLeft() {
            this.anchor.setTo(1, 0);
            this.body.enable = true;
        }

        activateRight() {
            this.anchor.setTo(0, 0);
            this.body.enable = true;
        }

        deactivate() {
            this.body.enable = false;
        }

        update() {
            this.x = this.wielder.x;
            this.y = this.wielder.y;
        }
    }
}