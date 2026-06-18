
class Game extends Phaser.Scene
{
    constructor ()
    {
        super('Game');
    }

    create()
{
    for(let x = 0; x < 20000; x += 32)
{
    for(let y = 0; y < 20000; y += 32)
    {
        this.add.rectangle(
            x,
            y,
            32,
            32,
            Phaser.Display.Color.GetColor(
                40 + Math.random() * 20,
                120 + Math.random() * 40,
                40
            )
        );
    }
    
}
    this.input.on('wheel', (pointer, gameObjects, deltaX, deltaY) =>
{
    let zoom = this.cameras.main.zoom;

    if (deltaY > 0)
    {
        zoom -= 0.1; // Zoom out
    }
    else
    {
        zoom += 0.1; // Zoom in
    }

    zoom = Phaser.Math.Clamp(zoom, 0.2, 3);

    this.cameras.main.setZoom(zoom);
});
this.cameras.main.setZoom(1);
    this.player = this.add.rectangle(200, 200, 40, 40, 0x00ff00);
    this.player.setDepth(1000);
    this.cursors = this.input.keyboard.createCursorKeys();
    this.cameras.main.setBounds(0, 0, 20000, 20000);
this.cameras.main.startFollow(this.player);
this.cameras.main.setZoom(1);
}
update()
{
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

const config = {
    type: Phaser.AUTO,
    width: 1024,
    height: 768,
    parent: 'game-container',
    backgroundColor: '#000000',
    scale: {
        mode: Phaser.Scale.FIT
    },
    scene: [Boot, Preloader, MainMenu, Game],
};

// Bind the game to a top-level identifier
const game = new Phaser.Game(config);
