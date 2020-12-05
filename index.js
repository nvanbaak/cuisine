var config = {
    type: Phaser.AUTO,
    width: 1600,
    height: 900,
    physics: {
        default: 'arcade',
        arcade: {
            gravity: { y: 500 },
            debug: false
        }
    },
    scene: {
        preload: preload,
        create: create,
        update: update
    }
};

let gameOver;
let platforms;
let cursors;
let player;

var game = new Phaser.Game(config);

class Player extends Phaser.Physics.Arcade.Sprite {
    constructor (scene, x, y)
    {
        super(scene, x, y);
        scene.add.existing(this);
        this.setTexture('cuisine-man');
        this.setPosition(x, y);
    }

    update ()
    {
        super.update();
        if (cursors.left.isDown)
        {
            this.setVelocityX(-160);
            // player.anims.play('left', true);
        }
        else if (cursors.right.isDown)
        {
            this.setVelocityX(160);
            // player.anims.play('right', true);
        }
        else
        {
            this.setVelocityX(0);
            // player.anims.play('turn');
        }
    
        if (cursors.up.isDown && this.body.touching.down)
        {
            this.setVelocityY(-330);
        }
    }
}

function preload () {
    this.load.image("platform","./assets/platform.png");
    this.load.image("sky","./assets/sky.png");
    this.load.image('cuisine-man', 'assets/cuisine-man.png');
}

function create ()
{
    // add game background and ground
    this.add.image(0, 0, 'sky').setScale(3).setOrigin(0,0);

    platforms = this.physics.add.staticGroup();
    platforms.create(400, 950, 'platform').setScale(6).refreshBody();

    // createCursorKeys sets up up, left, right, and down
    cursors = this.input.keyboard.createCursorKeys();
    
    // Add player character
    player = new Player(this, 800, 450);
    this.physics.add.existing(player);
    player.setCollideWorldBounds(true);

    // Set up collision
    this.physics.add.collider(player, platforms);

}

function update ()
{
    if (gameOver)
    {
        return;
    }

    player.update();
}
