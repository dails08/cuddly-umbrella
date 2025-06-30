import Phaser from "phaser";

export class GameOver extends Phaser.Scene {

    width: number | undefined;
    height: number | undefined;
    center_width: number | undefined;
    center_height: number | undefined;


    constructor() {
        super({
            key: "gameover"
        });
    }

    create() {
        this.width = this.sys.game.config.width as number;
        this.height = this.sys.game.config.height as number;

        this.center_width = this.width / 2;
        this.center_height = this.height / 2;

        this.cameras.main.setBackgroundColor(0x87ceeb);

        this.add.bitmapText(
            this.center_width,
            50,
            "arcade",
            this.registry.get("score"),
            25
        ).setOrigin(0.5);

        this.add.bitmapText(
            this.center_width,
            this.center_height,
            "arcade",
            "GAME OVER",
            45
        ).setOrigin(0.5);

        this.add.bitmapText(
            this.center_width,
            250,
            "arcade", 
            "Press space to restart",
            15
        ).setOrigin(0.5);

        this.input.keyboard?.on("keydown-SPACE", this.startGame, this);
        this.input.on("pointerdown", (pointer: Phaser.Input.Pointer, currentlyOver: Phaser.GameObjects.GameObject) => this.startGame(), this);

    }

    startGame() {
        this.scene.start("game");
    }
}