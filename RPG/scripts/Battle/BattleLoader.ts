namespace SideScrollerRPG {

    export class BattleLoader extends Phaser.State {
        statusText: Phaser.Text;

        healText: Phaser.Text;

        slimeBattleText: Phaser.Text;

        mapText: Phaser.Text;

        create() {
            this.game.returnState = 'BattleLoader';

            this.statusText = this.add.text(0, 0, "", { fill: "#ffffff", fontSize: "20px" });

            this.healText = this.add.text(0, 50, "Heal Player", { fill: "#ffffff" });
            this.healText.inputEnabled = true;
            this.healText.events.onInputDown.add(() => {
                this.game.playerStatus.currentHP = this.game.playerStatus.maxHP;
            });

            this.game.state.add('SlimeBattle', SlimeBattle, false);
            this.slimeBattleText = this.add.text(0, 200, "Slime Battle", { fill: "#FFFFFF" });
            this.slimeBattleText.inputEnabled = true;
            this.slimeBattleText.events.onInputDown.add(() => { this.game.state.start('SlimeBattle', true, false) });

            this.game.state.add('BowOrcBattle', BowOrcBattle, false);
            this.slimeBattleText = this.add.text(0, 250, "BowOrc Battle", { fill: "#FFFFFF" });
            this.slimeBattleText.inputEnabled = true;
            this.slimeBattleText.events.onInputDown.add(() => { this.game.state.start('BowOrcBattle', true, false) });

            this.game.state.add('BasicMap', BasicMap, false);
            this.mapText = this.add.text(0, 350, "BasicMap", { fill: "#FFFFFF" });
            this.mapText.inputEnabled = true;
            this.mapText.events.onInputDown.add(() => {
                this.game.playerReturnX = 300;
                this.game.playerReturnY = 300;
                this.game.state.start('BasicMap', true, false)
            });
        }

        update() {
            this.statusText.text = JSON.stringify(this.game.playerStatus);
        }
    }

}