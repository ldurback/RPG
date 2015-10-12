namespace Phaser {
    export interface Game {
        playerStatus: SideScrollerRPG.Status;
        returnState: string;
        playerReturnX: number;
        playerReturnY: number;

        items: Array<[string, number]>;
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

            this.items = [];
            this.items.push(['Potion', 2]);
            this.items.push(['BlankItem', 5]);

            this.state.add('Boot', Boot, true);
        }

    }

} 