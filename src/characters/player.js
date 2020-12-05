export default class Player extends Phaser.Physics.Arcade.Sprite {
    velocityX = 0;
    velocityY = 0;

    constructor (scene, x, y)
    {
        super(scene, x, y);
        scene.add.existing(this);
        this.setTexture('cuisine-man');
        this.setPosition(x, y);
    }

    update (cursors)
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
            this.velocityX = this.velocityX * 0.8;
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