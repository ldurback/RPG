namespace Phaser {
    export interface Game {
        playerStatus: SideScrollerRPG.Status;
        returnState: string;
        playerReturnX: number;
        playerReturnY: number;
    }
}


namespace SideScrollerRPG {
    export class Game extends Phaser.Game {

        // playerStatus: Status;

        constructor() {
            super(640, 480, Phaser.AUTO, 'content', null);

            this.playerStatus = {
                currentHP: 10,
                maxHP: 10,
                strength: 2,
                defense: 2
            };

            this.state.add('Boot', Boot, true);
        }

    }

} 