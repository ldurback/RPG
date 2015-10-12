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

            this.game.items.forEach((itemTypeAndAmount: [string, number], index: number, array: [string, number][]) => {
                var itemName: string = itemTypeAndAmount[0];
                var itemAmount: number = itemTypeAndAmount[1];
                var itemType: any = Items.itemDictionary[itemName];
                if (itemType.useInMenu) {
                    var itemText: Phaser.Text = this.add.text(0, 50 + 50 * index, itemTypeAndAmount[0] + ": " + itemTypeAndAmount[1], { fill: "#ffffff" });

                    itemText.inputEnabled = true;
                    itemText.events.onInputDown.add(() => {
                        if (this.game.items[index][1] > 0) {
                            (new itemType(this.game)).menuUse();
                            this.game.items[index][1]--;

                            itemText.text = this.game.items[index][0] + ": " + this.game.items[index][1];

                            if (this.game.items[index][1] <= 0) {
                                itemText.fill = "#999999";
                            }
                        }
                    });
                }
                else {
                    var itemText: Phaser.Text = this.add.text(0, 50 + 50 * index, itemTypeAndAmount[0] + ": " + itemTypeAndAmount[1], { fill: "#999999" });
                }
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