import Phaser from "phaser";
import { SceneKeys } from "../scenekeys";

export class BootLoader extends Phaser.Scene {

    loadBar: Phaser.GameObjects.Graphics | undefined;
    progressBar: Phaser.GameObjects.Graphics | undefined;

    constructor(){
        super({
            key: SceneKeys.BootLoader
        });
    }

    preload() {
        this.createBars();
        this.setLoadEvents();
        this.loadFonts();
        this.loadImages();
        this.loadAudios();
        this.loadSpritesheets();
        this.setRegistry();
    }

    createBars(){
        this.loadBar = this.add.graphics();
        this.loadBar.fillStyle(0xd40000, 1);
        this.loadBar.fillRect(
            this.cameras.main.width / 4 - 2,
            this.cameras.main.height / 2 - 18,
            this.cameras.main.width / 2 + 4,
            20
        );
        this.progressBar = this.add.graphics();
    }

    setLoadEvents(){
        this.load.on("progress",
            (value: number) => {
                this.progressBar?.clear();
                this.progressBar?.fillStyle(0x0088aa, 1);
                this.progressBar?.fillRect(
                    this.cameras.main.width / 4,
                    this.cameras.main.height / 2 - 16,
                    (this.cameras.main.width / 2) * value,
                    16
                )
            },
            this
        );

        this.load.on("complete", 
            () => this.scene.start(SceneKeys.Splash),
            this
        );
    };

    loadFonts(){
        this.load.bitmapFont(
            FontKeys.Wendy,
            "assets/fonts/wendy.png",
            "assets/fonts/wendy.xml"
        )
    };

    loadImages(){
        this.load.image(ImageKeys.Logo, "assets/images/logo.png");
        this.load.image(ImageKeys.PelloLogo, "assets/images/pello_logo.png");
        this.load.image(ImageKeys.Background, "assets/images/background.png");
        this.load.image(ImageKeys.Stage1, "assets/images/stage1.png");
        this.load.image(ImageKeys.Stage2, "assets/images/stage2.png");
        this.load.image(ImageKeys.Stage3, "assets/images/stage3.png");
        this.load.image(ImageKeys.Stage4, "assets/images/stage4.png");
    }

    loadAudios(){
        this.load.audio(AudioKeys.Shot, "assets/sounds/shot.mp3");
        this.load.audio(AudioKeys.FoeShot, "assets/sounds/foeshot.mp3");
        this.load.audio(AudioKeys.FoeDestroy, "assets/sounds/foedestroy.mp3");
        this.load.audio(AudioKeys.FoeExplosion, "assets/sounds/foexplosion.mp3");
        this.load.audio(AudioKeys.Explosion, "assets/sounds/explosion.mp3");
        this.load.audio(AudioKeys.StageClear1, "assets/sounds/stageclear1.mp3");
        this.load.audio(AudioKeys.StageClear2, "assets/sounds/stageclear2.mp3");
        this.load.audio(AudioKeys.Boss, "assets/sounds/boss.mp3");
        this.load.audio(AudioKeys.Splash, "assets/sounds/splash.mp3");
        this.load.audio(AudioKeys.Music1, "assets/sounds/music1.mp3");
        this.load.audio(AudioKeys.Music2, "assets/sounds/music2.mp3");
        this.load.audio(AudioKeys.Music3, "assets/sounds/music3.mp3");
    }

    loadSpritesheets(){
        this.load.spritesheet(SpritesheetKeys.Player1, "assets/images/player1.png", {
            frameWidth: 64,
            frameHeight: 64
        });
        this.load.spritesheet(SpritesheetKeys.Foe0, "assets/images/foe0.png", {
            frameWidth: 64,
            frameHeight: 64
        });
        this.load.spritesheet(SpritesheetKeys.Foe1, "assets/images/foe1.png", {
            frameWidth: 64,
            frameHeight: 64
        });
        this.load.spritesheet(SpritesheetKeys.Foe2, "assets/images/foe2.png", {
            frameWidth: 32,
            frameHeight: 32
        });
        this.load.spritesheet(SpritesheetKeys.GUINXU, "assets/images/guinxu.png", {
            frameWidth: 128,
            frameHeight: 144
        });
        this.load.spritesheet(SpritesheetKeys.Plenny0, "assets/images/plenny0.png", {
            frameWidth: 64,
            frameHeight: 64 
        });
    }

    setRegistry(){
        this.registry.set(RegistryKeys.ScorePlayer1, 0);
        this.registry.set(RegistryKeys.PowerPlayer1, "water");
        this.registry.set(RegistryKeys.LivesPlayer1, 0);

        this.registry.set(RegistryKeys.ScorePlayer2, 0);
        this.registry.set(RegistryKeys.PowerPlayer2, "water");
        this.registry.set(RegistryKeys.LivesPlayer2, 0);
    }

}


enum FontKeys {
    Wendy = "wendy"
}

enum AudioKeys {
    Shot = "shot",
    FoeShot = "foeshot",
    FoeDestroy = "foedestroy",
    FoeExplosion = "foeexplosion",
    Explosion = "explosion",
    StageClear1 = "stageclear1",
    StageClear2 = "stageclear2",
    Boss = "boss",
    Splash = "splash",
    Music1 = "music1",
    Music2 = "music2",
    Music3 = "music3"

}

enum ImageKeys {
    Logo = "logo",
    PelloLogo = "pello_logo",
    Background = "background",
    Stage1 = "stage1",
    Stage2 = "stage2",
    Stage3 = "stage3",
    Stage4 = "stage4"
}

enum SpritesheetKeys {
    Player1 = "player1",
    Foe0 = "foe0",
    Foe1 = "foe1",
    Foe2 = "foe2",
    GUINXU = "guinxu",
    Plenny0 = "plenny0"
};

enum RegistryKeys {
    ScorePlayer1 = "score_player_1",
    PowerPlayer1 = "power_player_1",
    LivesPlayer1 = "lives_player_1",

    ScorePlayer2 = "score_player_2",
    PowerPlayer2 = "power_player_2",
    LivesPlayer2 = "lives_player_2",
}

