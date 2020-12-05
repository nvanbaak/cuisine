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
let knifeheads;

var game = new Phaser.Game(config);

class Player extends Phaser.Physics.Arcade.Sprite {
    velocityX = 0;
    velocityY = 0;

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
            this.velocityX = this.velocityX < -160 ? this.velocityX : this.velocityX - 10;
            this.setVelocityX(this.velocityX);
            this.anims.play('walk', true);
            this.setFlip(true,false);

        }
        else if (cursors.right.isDown)
        {
            this.velocityX = this.velocityX > 160 ? this.velocityX : this.velocityX + 10;
            this.setVelocityX(this.velocityX);
            this.anims.play('walk', true);
            this.setFlip(false,false);
        }
        else if (this.body.touching.down)
        {
            this.velocityX = this.velocityX * 0.9;
            if (Math.abs(this.velocityX) < 10) this.velocityX = 0;
            this.setVelocityX(this.velocityX);
            this.anims.play('stand');
        }
    
        if (cursors.up.isDown && this.body.touching.down)
        {
            this.setVelocityY(-330);
        }
    }
}

class Enemy extends Phaser.Physics.Arcade.Sprite {
    velocityX = 0;
    velocityY = 0;

    constructor(scene, x, y)
    {
        super(scene, x, y);
        scene.add.existing(this);
        this.setPosition(x, y);
    }
}

class KnifeheadEnemy extends Enemy {
    constructor(scene, x, y)
    {
        super(scene, x, y)
        this.setTexture('knifehead');
    }

    update ()
    {
        this.anims.play('knifehead-walk', true);
    }
}

function preload () {
    this.load.image("platform","./assets/platform.png");
    this.load.image("sky","./assets/sky.png");
    this.load.spritesheet('cuisine-man', 'assets/cuisine-man.png', {frameWidth: 36, frameHeight: 48});
    this.load.spritesheet('knifehead', 'assets/knifehead.png', {frameWidth: 32, frameHeight: 48});
}

function create ()
{
    // add game background and ground
    this.add.image(0, 0, 'sky').setScale(3).setOrigin(0,0);

    platforms = this.physics.add.staticGroup();
    platforms.create(400, 950, 'platform').setScale(6).refreshBody();

    knifeheads = this.physics.add.group(config={classType: KnifeheadEnemy});

    // createCursorKeys sets up up, left, right, and down
    cursors = this.input.keyboard.createCursorKeys();
    
    // Add player character
    player = new Player(this, 800, 450);
    this.physics.add.existing(player);
    player.setCollideWorldBounds(true);

    var enemy = knifeheads.create(400, 400, 'knifehead');
    enemy.setCollideWorldBounds(true);

    // Set up collision
    this.physics.add.collider(player, platforms);
    this.physics.add.collider(knifeheads, platforms);
    this.physics.add.collider(knifeheads, player);

    this.anims.create({
        key: 'stand',
        frames: this.anims.generateFrameNumbers('cuisine-man', {frame: 0}),
        frameRate: 20
    });

    this.anims.create({
        key: 'walk',
        frames: this.anims.generateFrameNumbers('cuisine-man', {start: 0, end: 7}),
        frameRate: 20,
        repeat: -1
    });

    this.anims.create({
        key: 'knifehead-walk',
        frames: this.anims.generateFrameNumbers('knifehead', {start: 0, end: 3}),
        frameRate: 8,
        repeat: -1,
    });

    this.anims.create({
        key: 'knifehead-stand',
        frames: this.anims.generateFrameNumbers('knifehead', {frame: 4}),
        frameRate: 20,
    });
}

function update ()
{
    if (gameOver)
    {
        return;
    }

    player.update();
    Array.prototype.forEach(enemy => enemy.update(), knifeheads);
}
