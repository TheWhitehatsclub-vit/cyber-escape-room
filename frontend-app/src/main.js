import Phaser from 'phaser';

class GameScene extends Phaser.Scene
{
    preload()
{
    this.load.spritesheet(
        'player',
        'images/agent_sheet.png',
        {
            frameWidth: 250,
            frameHeight: 341

        }
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
    this.scale.on('resize', (gameSize) => {
    const width = gameSize.width;
    const height = gameSize.height;
    this.cameras.main.setSize(width, height);
});
this.add.tileSprite(400, 568, 800, 32, 'player');
this.cameras.main.setZoom(0.05);
this.gameStarted = false;
const centerX = this.cameras.main.width / 2;
const centerY = this.cameras.main.height / 2;
this.menuBox = this.add.rectangle(
    centerX,
    centerY,
    800,    
    400, 
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
this.player = this.add.sprite(WORLDSIZE/2, WORLDSIZE/2,'player');
this.player.setScale(0.2);
this.player.setDepth(1000);
this.anims.create({
    key: 'walk-down',
    frames: this.anims.generateFrameNumbers('player', {
        start: 0,
        end: 5
    }),
    frameRate: 8,
    repeat: -1
});

this.anims.create({
    key: 'walk-side',
    frames: this.anims.generateFrameNumbers('player', {
        start: 6,
        end: 11
    }),
    frameRate: 8,
    repeat: -1
});

this.anims.create({
    key: 'walk-up',
    frames: this.anims.generateFrameNumbers('player', {
        start: 12,
        end: 17
    }),
    frameRate: 8,
    repeat: -1
});
this.input.on('wheel', (pointer, gameObjects, deltaX, deltaY) =>
{
    const cam = this.cameras.main;
    let zoom = cam.zoom;
    zoom -= deltaY * 0.1;
    const minZoomX = cam.width / WORLDSIZE;
    const minZoomY = cam.height / WORLDSIZE;
    const minZoom = Math.max(minZoomX, minZoomY);

    zoom = Phaser.Math.Clamp(zoom, minZoom, 4);

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

        let moving = false;

if (this.cursors.left.isDown)
{
    this.player.x -= speed;
    this.player.anims.play('walk-side', true);
    this.player.setFlipX(true);
    moving = true;
}

else if (this.cursors.right.isDown)
{
    this.player.x += speed;
    this.player.anims.play('walk-side', true);
    this.player.setFlipX(false);
    moving = true;
}

else if (this.cursors.up.isDown)
{
    this.player.y -= speed;
    this.player.anims.play('walk-up', true);
    this.player.setFlipX(false);
    moving = true;
}

else if (this.cursors.down.isDown)
{
    this.player.y += speed;
    this.player.anims.play('walk-down', true);
    this.player.setFlipX(false);
    moving = true;
}

if (!moving)
{
    this.player.anims.stop();
}
    }
}

new Phaser.Game({
    type: Phaser.AUTO,
    width: window.innerWidth,
    height: window.innerHeight,
    scale: {
        mode: Phaser.Scale.RESIZE,
        autoCenter: Phaser.Scale.CENTER_BOTH,
    },
    scene: GameScene
});