import Player from "./src/characters/player.js";
import KnifeheadEnemy from "./src/characters/knifehead.js";

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
        update: update,
    }
};

let gameOver;
let platforms;
let cursors;
let player;
let knifeheads;
let updateArray = [];

var game = new Phaser.Game(config);

function preload () {
    this.load.image("platform","./assets/platform.png");
    this.load.image("sky","./assets/sky.png");
    this.load.image("apple","assets/apple.png");
    this.load.image("egg","assets/egg.png");
    this.load.image("fish","assets/fish.png");
    this.load.image("lemon","assets/lemon.png");
    this.load.image("lettuce","assets/lettuce.png");
    this.load.image("meat","assets/meat.png");
    this.load.image("plate","assets/plate.png");
    this.load.spritesheet('cuisine-man', 'assets/cuisine-man.png', {frameWidth: 36, frameHeight: 48});
    this.load.spritesheet('knifehead', 'assets/knifehead.png', {frameWidth: 32, frameHeight: 48});
}

function create () {
    // add game background and ground
    this.add.image(0, 0, 'sky').setScale(3).setOrigin(0,0);

    platforms = this.physics.add.staticGroup();
    platforms.create(400, 950, 'platform').setScale(6).refreshBody();

    knifeheads = this.physics.add.group(config={classType: KnifeheadEnemy});

    // createCursorKeys sets up up, left, right, and down
    cursors = this.input.keyboard.createCursorKeys();
    
    // Add player character
    player = new Player(this, 800, 800);
    this.physics.add.existing(player);
    player.setCollideWorldBounds(true);
    this.player = player;

    var enemy = knifeheads.create(400, 400, 'knifehead');
    enemy.setCollideWorldBounds(true);
    updateArray.push(enemy);

    // Set up collision
    this.physics.add.collider(player, platforms);
    this.physics.add.collider(knifeheads, platforms);
    this.physics.add.overlap(player, knifeheads, KnifeheadEnemy.collide, Player.checkIframes);

    // Define animations
    this.anims.create({
        key: 'stand',
        frames: [ { key: 'cuisine-man', frame: 0 } ],
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
        frames: [ { key: 'knifehead', frame: 4 } ],
        frameRate: 20,
    });

}

function update ()
{
    if (gameOver) { return; }

    player.update(cursors);
    updateArray.forEach(enemy => enemy.update(), knifeheads);
}
