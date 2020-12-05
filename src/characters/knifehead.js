import Enemy from "./enemy.js";

export default class KnifeheadEnemy extends Enemy {
    standingTime = 0;
    runningTime = 0;
    speed = 90;
    direction = 1;

    static collide(player, knifehead)
    {
        player.setVelocityY(-500);
        player.iframes = 30;
        knifehead.speed += 10;
    }

    constructor(scene, x, y)
    {
        super(scene, x, y)
        this.setTexture('knifehead');
        this.standingTime = Phaser.Math.Between(120, 180);
    }

    update ()
    {
        super.update();
        if (this.runningTime > 0)
        {
            this.setVelocityX(this.speed * this.direction);
            this.anims.play('knifehead-walk', true);
            this.runningTime -= 1;
            if (this.runningTime <= 0)
            {
                this.standingTime = Phaser.Math.Between(60, 120);
            }
        }
        else if (this.standingTime > 0)
        {
            this.setVelocityX(0);
            this.anims.play('knifehead-stand', true);
            this.standingTime -= 1;
            if (this.standingTime <= 0)
            {
                this.runningTime = Phaser.Math.Between(60, 120);
                if (this.x < this.scene.player.x)
                {
                    this.direction = 1;
                    this.setFlip(false, false);
                }
                else
                {
                    this.direction = -1;
                    this.setFlip(true, false);
                }
            }
        }
    }
}