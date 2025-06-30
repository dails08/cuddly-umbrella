import Phaser from "phaser";
import { Game } from "../scenes/Game";
export default class Generator{

    scene: Game;
    pinos: number;

    constructor(scene: Game) {
        this.scene = scene;
        this.scene.time.delayedCall(
            2000,
            () => {
                this.init()
            },
            undefined,
            this
        );
        this.pinos = 0;
    }

    init() {
        this.generateCloud();
        this.generateObstacle();
        this.generateCoin();
    }

    generateCloud() {
        new Cloud(this.scene, 800, undefined);
        this.scene.time.delayedCall(
            Phaser.Math.Between(2000, 3000),
            () => this.generateCloud(),
            undefined,
            this
        )
    }

    generateObstacle() {
        this.scene.obstacles.add(
            new Obstacle(
                this.scene,
                800,
                this.scene.height - Phaser.Math.Between(32, 128)
            )
        );
        this.scene.time.delayedCall(
            Phaser.Math.Between(1500, 2500),
            () => this.generateObstacle(),
            undefined,
            this
        )
    }

    generateCoin() {
        this.scene.coins.add(
            new Coin(
                this.scene,
                800,
                this.scene.height - Phaser.Math.Between(32, 128)
            )
        );
        this.scene.time.delayedCall(
            Phaser.Math.Between(500, 1500),
            () => this.generateCoin(),
            undefined,
            this
        )
    }

    
}

class Cloud extends Phaser.GameObjects.Rectangle {
    constructor(scene: Phaser.Scene, x: number, y: number | undefined){
        let finalY: number;
        if (y){
            finalY = y;
        } else {
            finalY = Phaser.Math.Between(0,100);
        };
        super(scene, x, finalY, 98, 32, 0xffffff);
        scene.add.existing(this);

        const alpha = 1 / Phaser.Math.Between(1,2);
        this.setScale(alpha);
        this.init();
    };

    init() {
        this.scene.tweens.add({
            targets: this,
            x: {
                from: 800,
                to: -100
            },
            duration: 2000 / this.scale,
            onComplete: () => {
                this.destroy();
            }
        })
    }
}

export class Obstacle extends Phaser.GameObjects.Rectangle{

    body!: Phaser.Physics.Arcade.Body;

    constructor(scene: Phaser.Scene, x: number, y: number) {
        super(scene, x, y, 32, 32, 0xff0000);

        scene.add.existing(this);
        scene.physics.add.existing(this);
        // this.body = this.body as Phaser.Physics.Arcade.Body;
        this.body.setAllowGravity(false);
        const alpha = 1 / Phaser.Math.Between(1,3);

        this.init();
    }

    init() {
        this.scene.tweens.add({
            targets: this,
            x: {
                from: 820,
                to: -100
            },
            duration: 2000,
            onComplete: () => {
                this.destroy();
            }
        })
    }
}

export class Coin extends Phaser.GameObjects.Sprite {

    body!: Phaser.Physics.Arcade.Body;

    constructor(scene: Phaser.Scene, x: number, y: number) {
        super(scene, x, y, "coin");
        scene.add.existing(this);
        scene.physics.add.existing(this);
        this.body.setAllowGravity(false);
        const alpha = 1 / Phaser.Math.Between(1, 3);

        this.init();
    }

    init() {
        this.scene.tweens.add({
            targets: this,
            x: {
                from: 820,
                to: -100
            },
            duration: 2000,
            onComplete: () => {
                this.destroy();
            }
        });

        const coinAnimation = this.scene.anims.create({
            key: "coin",
            frames: this.scene.anims.generateFrameNumbers("coin", {
                start: 0,
                end: 7
            }),
            frameRate: 8
        });

        this.play({
            key: "coin",
            repeat: -1
        })
    }
}