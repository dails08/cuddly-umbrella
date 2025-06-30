import Phaser from "phaser";
import { SceneKeys } from "../scenekeys";


export class MainGame extends Phaser.Scene{
    constructor(){
        super({
            key: SceneKeys.MainGame
        });
        
    }
}