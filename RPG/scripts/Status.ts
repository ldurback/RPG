namespace SideScrollerRPG {
    export interface Status {
        maxHP: number;
        currentHP: number;
        strength: number;
        defense: number;
    }

    export class StatusScreen extends Phaser.State {
        statusText: Phaser.Text;

        healText: Phaser.Text;

        create() {
            this.statusText = this.add.text(0, 0, "", { fill: "#ffffff", fontSize: "20px" });

            this.healText = this.add.text(0, 50, "Heal Player", { fill: "#ffffff" });
            this.healText.inputEnabled = true;
            this.healText.events.onInputDown.add(() => {
                this.game.playerStatus.currentHP = this.game.playerStatus.maxHP;
            });
        }

        update() {
            this.statusText.text = JSON.stringify(this.game.playerStatus);

            if (this.game.input.keyboard.isDown(Phaser.Keyboard.ESC)) {
                this.game.state.start(this.game.returnState, true, false);
            }
        }
    }
}