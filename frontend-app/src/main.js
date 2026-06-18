import Phaser from 'phaser';

class GameScene extends Phaser.Scene
{
    preload()
    {
        this.load.image(
            'player',
            'images/player.png'
        );
    }
    create()
    {
        const WORLDSIZE = 20000;
        this.cameras.main.setBounds(
    0,
    0,
    WORLDSIZE,
    WORLDSIZE
);
this.cameras.main.setZoom(0.05);
this.gameStarted = false;
const centerX = this.cameras.main.width / 2;
const centerY = this.cameras.main.height / 2;

this.menuBox = this.add.rectangle(
    centerX,
    centerY,
    800,    // width
    400,    // height
    0x000000
)
.setScrollFactor(0)
.setDepth(9998);
this.titleText = this.add.text(
    window.innerWidth / 2,
    window.innerHeight / 2 - 100,
    "CYBER ESCAPE ROOM",
    {
        fontSize: "48px",
        color: "#00ff00"
    }
).setScrollFactor(0).setOrigin(0.5);

this.infoText = this.add.text(
    window.innerWidth / 2,
    window.innerHeight / 2,
    "Initializing System...\nLoading Network...\nConnecting...\n\nPress SPACE to Begin",
    {
        fontSize: "24px",
        color: "#ffffff",
        align: "center"
    }
).setScrollFactor(0).setOrigin(0.5);
this.titleText.setDepth(99999);
this.infoText.setDepth(99999);
this.player = this.add.image(WORLDSIZE/2, WORLDSIZE/2,'player');
this.player.setScale(0.5);
this.player.setDepth(1000);
this.input.on('wheel', (pointer, gameObjects, deltaX, deltaY) =>
{
    const cam = this.cameras.main;

    let zoom = cam.zoom;

    zoom -= deltaY * 0.1;

    zoom = Phaser.Math.Clamp(zoom, 0.05, 4);

    cam.zoomTo(zoom, 150);
});

        this.cursors = this.input.keyboard.createCursorKeys();
        this.spaceKey = this.input.keyboard.addKey(
    Phaser.Input.Keyboard.KeyCodes.SPACE
);
        this.cameras.main.startFollow(this.player);

        for(let x = 0; x < WORLDSIZE; x += 64)
        {
            for(let y = 0; y < WORLDSIZE; y += 64)
            {
                this.add.rectangle(
                    x,
                    y,
                    64,
                    64,
                    Phaser.Display.Color.GetColor(
                        40 + Math.random() * 20,
                        120 + Math.random() * 40,
                        40
                    )
                );
            }
        }
        this.cameras.main.zoomTo(1.5,2000);

    }
    

    update()
    {
      if (!this.gameStarted)
{
    if (Phaser.Input.Keyboard.JustDown(this.spaceKey))
    {
        this.gameStarted = true;
        this.menuBox.destroy();
        this.titleText.destroy();
        this.infoText.destroy();

        this.cameras.main.zoomTo(1, 3000);
this.cameras.main.fadeIn(1000);
    }

    return;
}
    this.player.x = Phaser.Math.Clamp(
    this.player.x,
    20,
    19980
);

this.player.y = Phaser.Math.Clamp(
    this.player.y,
    20,
    19980
);
        const speed = 5;

        if(this.cursors.left.isDown)
            this.player.x -= speed;

        if(this.cursors.right.isDown)
            this.player.x += speed;

        if(this.cursors.up.isDown)
            this.player.y -= speed;

        if(this.cursors.down.isDown)
            this.player.y += speed;
    }
}

new Phaser.Game({
    type: Phaser.AUTO,
    width: window.innerWidth,
    height: window.innerHeight,
    scale: {
        mode: Phaser.Scale.RESIZE
    },
    scene: GameScene
});