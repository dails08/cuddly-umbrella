import Phaser from "phaser";
import { GameScene } from "./scenes/GameScene";
import { Game } from "./scenes/Game";
import { GameOver } from "./scenes/GameOver";

const config: Phaser.Types.Core.GameConfig = {
    width: 600,
    height: 300,
    scale: {
        mode: Phaser.Scale.FIT,
        autoCenter: Phaser.Scale.CENTER_BOTH,
    },
    autoRound: false,
    parent: "game-container",
    physics: {
        default: "arcade",
        arcade: {
            gravity: { 
                y: 350, 
                x: 0 
            },
            debug: true
        }
    },
    scene: [Game, GameOver]
}

const game = new Phaser.Game(config);