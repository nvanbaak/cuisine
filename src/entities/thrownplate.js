export default class ThrownPlate extends Phaser.Physics.Arcade.Sprite {

    constructor(scene, x, y, angle)
    {
        super(scene, x, y);
        scene.add.existing(this);
        this.setPosition(x, y);

        this.angle = angle;

        this.setRotation(angle);
        this.setTexture('thrownplate');
    }

    fire() {

        console.log(`Angle: ${this.angle}`);
        console.log(`cos(angle): ${Math.cos(this.angle)}`);
        console.log(`x velocity: ${Math.cos(this.angle) * 300}`);

        // this.setVelocityX(Math.cos(this.angle));
        // this.setVelocityY(Math.sin(this.angle));
    }

    update() {
        this.setGravity(1,1);
    }

}