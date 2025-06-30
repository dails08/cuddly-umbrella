import Phaser from "phaser";
import { BootLoader } from "./scenes/BootLoader";
import { Splash } from "./scenes/Splash";

const config: Phaser.Types.Core.GameConfig = {
    width: 1000,
    height: 800,
    scale: {
        mode: Phaser.Scale.FIT,
        autoCenter: Phaser.Scale.CENTER_BOTH
    },
    autoRound: false,
    parent: "game-container",
    physics: {
        default: "arcade",
        arcade: {
            gravity: {
                y: 0,
                x: 0
            },
            debug: false
        }
    },
    scene: [BootLoader, Splash]
}

const game = new Phaser.Game(config);