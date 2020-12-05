export default class Enemy extends Phaser.Physics.Arcade.Sprite {
    velocityX = 0;
    velocityY = 0;

    constructor(scene, x, y)
    {
        super(scene, x, y);
        scene.add.existing(this);
        this.setPosition(x, y);
    }
}