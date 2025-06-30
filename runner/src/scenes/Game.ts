import "phaser";
import Player  from "../helpers/Player";
import Generator from "../helpers/Generator";
import { Obstacle, Coin } from "../helpers/Generator";

export class Game extends Phaser.Scene {

    player!: Player;
    score: number;
    scoreText!: Phaser.GameObjects.BitmapText;

    name!: string;
    num!: number;

    width!: number;
    height!: number;
    center_width!: number;
    center_height!: number;

    obstacles!: Phaser.GameObjects.Group;
    coins!: Phaser.GameObjects.Group;

    generator!: Generator;

    SPACE!: Phaser.Input.Keyboard.Key;

    updateScoreEvent: Phaser.Time.TimerEvent | undefined;

    audios: Map<string, Phaser.Sound.BaseSound>;
    theme: Phaser.Sound.BaseSound | undefined;

    jumpTween: Phaser.Tweens.Tween | undefined;

    constructor(){
        super({
            key: "game"
        });
        // this.player = undefined;
        this.score = 0;

        this.audios = new Map<string, Phaser.Sound.BaseSound>();
        // this.scoreText = "";
    }

    init(name: string, num: number) {
        this.name = name;
        this.num = num;
    }

    preload() {
        this.registry.set("score", "0");
        const audioPrefix = "/assets/sounds/";
        const audioFileTuples = [
            ["coin", "coin.mp3"],
            ["jump", "jump.mp3"],
            ["dead", "dead.mp3"],
            ["theme", "theme.mp3"],
        ];
        for (let tuple of audioFileTuples){
            this.load.audio(tuple[0], audioPrefix + tuple[1]);

        }

        this.load.spritesheet("coin", "./assets/images/coin.png",{
            frameWidth: 32,
            frameHeight: 32,
        });

        this.load.bitmapFont(
            "arcade",
            "assets/fonts/arcade.png",
            "assets/fonts/arcade.xml",
        );

        this.score = 0; // is this needed?
    }

    create(){
        this.width = this.sys.game.config.width as number;
        this.height = this.sys.game.config.height as number;
        this.center_width = this.width / 2;
        this.center_height = this.height / 2;

        this.cameras.main.setBackgroundColor(0x87ceeb);

        this.obstacles = this.add.group();
        this.coins = this.add.group();

        this.generator = new Generator(this);


        if (this.input.keyboard){
            this.SPACE = this.input.keyboard.addKey(
                Phaser.Input.Keyboard.KeyCodes.SPACE
            );    
        } else {
            Error("No keyboard!");
        }

        this.player = new Player(this, this.center_width - 100, this.height - 200);

        this.scoreText = this.add.bitmapText(
            this.center_width,
            10,
            "arcade",
            this.score.toString(),
            20
        );



        this.physics.add.collider(
            this.player,
            this.obstacles,
            // @ts-ignore: this lets us keep sensible types in the collide function
            this.hitObstacle,
            () => {
                return true
            },
            this
        );

        this.physics.add.overlap(
            this.player,
            this.coins,
            // @ts-ignore: this lets us keep sensible types in the collide function
            this.hitCoin,
            () => {
                return true
            },
            this
        );

        this.loadAudios();
        this.playMusic();

        this.input.on("pointerdown", (pointer: any, currentlyOver: any) => this.jump(), this);

        this.updateScoreEvent = this.time.addEvent({
            delay: 100,
            callback: () => this.updateScore(),
            callbackScope: this,
            loop: true
        })
    }

    update() {
        if (Phaser.Input.Keyboard.JustDown(this.SPACE)) {
            this.jump();
        } else if (this.player.body.blocked.down) {
            this.jumpTween?.stop();
            this.player.rotation = 0;
        }
    }
    // hitObstacle(obj1_player: any, obj2_obstacle: any) {
    hitObstacle(player: Player, object: Obstacle) {
        // const player = obj1_player as Player;
        // const object = obj2_obstacle as Obstacle;
        this.updateScoreEvent?.destroy();
        this.finishScene();
    };

    hitCoin(player: Player, coin: Coin){
        // const player = obj1_player as Player;
        // const coin = obj2_coin as Coin;
        this.playAudio("coin");
        this.updateScore(1000);
        coin.destroy();
    }

    loadAudios() {
        this.audios?.set("jump", this.sound.add("jump"));
        this.audios?.set("coin", this.sound.add("coin"));
        this.audios?.set("dead", this.sound.add("dead"));
        console.log(this.audios);
    }

    playAudio(key: string){
        // console.log("Playing " + key);
        // if (this.audios){
        //     console.log("Found audios");
        //     if (this.audios.get(key)){
        //         console.log("Found " + key);
        //         this.audios.get(key)?.play();
        //     }
        // }
        this.audios?.get(key)?.play();
    }

    playMusic() {
        this.theme = this.sound.add("theme");
        this.theme.stop();
        this.theme.play({
            mute: false,
            volume: 1,
            rate: 1,
            detune: 0,
            seek: 0,
            loop: true,
            delay: 0
        })
    };

    jump(){
        console.log("jumping");
        if (!this.player?.body.blocked.up){
            this.player?.body.setVelocityY(-300);

            this.playAudio("jump");
            this.jumpTween = this.tweens.add({
                targets: this.player,
                duration: 1000,
                angle: {
                    from: 0,
                    to: 360
                },
                repeat: -1
            })
        }
    }

    finishScene() {
        this.theme?.stop();
        this.registry.set("score", "" + this.score);
        this.scene.start("gameover");
    };

    updateScore(points:number = 1) {
        this.score += points;
        this.scoreText.setText(this.score.toString());
    }

}