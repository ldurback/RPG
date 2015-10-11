namespace SideScrollerRPG {

    export class BattleLoader extends Phaser.State {
        statusText: Phaser.Text;

        healText: Phaser.Text;

        slimeBattleText: Phaser.Text;

        create() {
            this.game.state.add('SlimeBattle', SlimeBattle, false);

            this.statusText = this.add.text(0, 0, "", { fill: "#ffffff", fontSize: "20px" });

            this.healText = this.add.text(0, 50, "Heal Player", { fill: "#ffffff" });
            this.healText.inputEnabled = true;
            this.healText.events.onInputDown.add(() => {
                this.game.playerStatus.currentHP = this.game.playerStatus.maxHP;
            });

            this.slimeBattleText = this.add.text(0, 200, "Slime Battle", { fill: "#FFFFFF" });
            this.slimeBattleText.inputEnabled = true;
            this.slimeBattleText.events.onInputDown.add(() => { this.game.state.start('SlimeBattle', true, false) });
        }

        update() {
            this.statusText.text = JSON.stringify(this.game.playerStatus);
        }
    }

}