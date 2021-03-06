import Player from "./src/characters/player.js";
import Enemy from "./src/characters/enemy.js";
import KnifeheadEnemy from "./src/characters/knifehead.js";
import ThrownPlate from "./src/entities/thrownplate.js";
import Item from "./src/entities/item.js";
import Hotbar from "./src/hotbar.js";

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

let platforms;
let cursors;
let player;
let items;
let knifeheads;
let thrownPlates;
let updateArray = [];
let fireReady = 0;
let inventory = {
    apple: 0,
    egg: 0,
    fish: 0,
    lemon: 0,
    lettuce: 0,
    meat: 0,
    plate: 0
}
const itemTypes = ["apple","egg","fish","lemon","lettuce","meat","plate"]

var game = new Phaser.Game(config);

const mouse = game.input.mousePointer;

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
    this.load.image("thrownplate","assets/plate-thrown.png");
    this.load.spritesheet('cuisine-man', 'assets/cuisine-man.png', {frameWidth: 36, frameHeight: 48});
    this.load.spritesheet('knifehead', 'assets/knifehead.png', {frameWidth: 32, frameHeight: 48});
    this.load.spritesheet('hotbar', 'assets/hotbar.png', {frameWidth: 32, frameHeight: 64});
}

function create () {
    this.updateArray = updateArray;

    // add game background and ground
    this.add.image(0, 0, 'sky').setScale(3).setOrigin(0,0);

    platforms = this.physics.add.staticGroup();
    platforms.create(400, 750, 'platform').setScale(6).refreshBody();

    knifeheads = this.physics.add.group(config={classType: KnifeheadEnemy});
    thrownPlates = this.physics.add.group(config={classType: ThrownPlate});
    items = this.physics.add.group(config = {classType: Item});

    // createCursorKeys sets up up, left, right, and down
    cursors = this.input.keyboard.createCursorKeys();
    
    // Add firing behavior
    addEventListener("click", (event) => {

        if (fireReady === 0) {
            fireReady = 7;
            player.anims.play('throw');
            
            let throwTime = setInterval(() => {
                fireReady--;

                if (fireReady === 3) {
                    throwPlate();
                }

                if (fireReady <= 0) {
                    clearInterval(throwTime);
                }
            }, 30);
        }

    });


    // Add player character
    player = new Player(this, 800, 600);
    this.physics.add.existing(player);
    player.setCollideWorldBounds(true);
    this.player = player;

    // Add hotbar
    this.hotbar = new Hotbar(this, 800, 868);
    this.hotbar.resize(2);

    // Add three enemies
    var enemy = knifeheads.create(100, 400);
    enemy.setCollideWorldBounds(true);
    updateArray.push(enemy);

    enemy = knifeheads.create(150, 400);
    enemy.setCollideWorldBounds(true);
    updateArray.push(enemy);

    enemy = knifeheads.create(200, 400);
    enemy.setCollideWorldBounds(true);
    updateArray.push(enemy);

    // Set up collision
    this.physics.add.collider(player, platforms);
    this.physics.add.collider(knifeheads, platforms);
    this.physics.add.overlap(player, knifeheads, Enemy.hitPlayer, Player.checkIframes);
    this.physics.add.overlap(knifeheads, thrownPlates, ThrownPlate.hitEnemy, Enemy.checkIframes);
    this.physics.add.collider(items, platforms);
    this.physics.add.overlap(player, items, (player, items) => {
        items.pickup()
    });


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
        key: "throw",
        frames: this.anims.generateFrameNumbers('cuisine-man', {start: 8, end: 15}),
        frameRate: 30,
    })

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

    this.anims.create({
        key: 'knifehead-hurt',
        frames: [ { key: 'knifehead', frame: 5 } ],
        frameRate: 20,
    });

    this.anims.create({
        key: 'hotbar-left',
        frames: [ { key: 'hotbar', frame: 0 } ],
        frameRate: 60,
    })

    this.anims.create({
        key: 'hotbar-middle',
        frames: [ { key: 'hotbar', frame: 1 } ],
        frameRate: 60,
    })

    this.anims.create({
        key: 'hotbar-right',
        frames: [ { key: 'hotbar', frame: 2 } ],
        frameRate: 60,
    })
}

function update ()
{
    // Game over
    if ( player.isAlive() ) { return; }

    // Update all entities
    player.update(cursors, fireReady === 0);
    updateArray.forEach(entity => entity.update());

    // Spawn items at random
    if (Math.random() < 0.01) {

        // Get random item category

        items.create(
            Phaser.Math.Between(0,1568), // anywhere in the X range
            0,                           // top of the screen
            itemTypes[Phaser.Math.Between(0, itemTypes.length-1)], // item category
            inventory // pointer to inventory object
        )
    }
}

function throwPlate() {

    // Calculate angle from player
    let deltaY = mouse.y - player.y;
    let deltaX = mouse.x - player.x;
    
    let fireAngle = Math.atan2(deltaY , deltaX);
    
    let plate = thrownPlates.create(player.x, player.y, fireAngle);
    
    if (deltaX < 0) {
        plate.setFlip(false,true)
    }

    plate.body.setAllowGravity(false);
    plate.setVelocityX(Math.cos(fireAngle) * 500);
    plate.setVelocityY(Math.sin(fireAngle) * 500);
}