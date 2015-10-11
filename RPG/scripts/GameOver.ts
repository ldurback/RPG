namespace SideScrollerRPG {
 
    export class GameOver extends Phaser.State {
        preload() {
        }

        create() {
            var gameOverText: Phaser.Text = this.game.add.text(this.game.world.centerX, this.game.world.centerY, "Game Over", { fill: "#FFFFFF" });
            gameOverText.anchor.setTo(0.5);
        }
    }
 
}