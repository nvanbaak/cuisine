export default class ThrownPlate extends Phaser.Physics.Arcade.Sprite {
    damage = 10;

    constructor(scene, x, y, angle)
    {
        super(scene, x, y);
        scene.add.existing(this);
        this.setPosition(x, y);

        this.angle = angle;

        this.setRotation(angle);
        this.setTexture('thrownplate');
    }

    static hitEnemy (enemy, plate)
    {
        enemy.getHit(plate);
    }
}