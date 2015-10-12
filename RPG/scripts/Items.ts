namespace SideScrollerRPG.Items {
    export abstract class Item {
        game: Game;
        static useInBattle: boolean;
        static useInMenu: boolean;

        constructor(game: Game) {
            this.game = game;
        }

        abstract battleUse(target: BattleEntity);
        abstract menuUse();
    }

    export class Potion extends Item {
        static useInBattle = true;
        static useInMenu = true;

        battleUse(target: BattleEntity) {
            target.stats.currentHP += (target.stats.maxHP / 5);
            if (target.stats.currentHP > target.stats.maxHP)
                target.stats.currentHP = target.stats.maxHP;
        }

        menuUse() {
            var playerStats: Status = this.game.playerStatus;

            playerStats.currentHP += (playerStats.maxHP / 5);
            if (playerStats.currentHP > playerStats.maxHP)
                playerStats.currentHP = playerStats.maxHP;
        }
    }

    export class BlankItem extends Item {
        static useInBattle = false;
        static useInMenu = false;

        battleUse(target: BattleEntity) { }
        menuUse() { }
    }

    export var itemDictionary: { [index: string]: any };

    itemDictionary = [];
    itemDictionary["Potion"] = Potion;
    itemDictionary["BlankItem"] = BlankItem;
}