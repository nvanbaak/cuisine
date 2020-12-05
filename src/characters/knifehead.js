import Enemy from "./enemy.js";

export default class KnifeheadEnemy extends Enemy {
    standingTime = 0;
    runningTime = 0;
    speed = 90;
    attackSpeedBonus = 0;
    hurtSpeedBonus = 0;
    direction = 1;

    constructor(scene, x, y)
    {
        super(scene, x, y)
        this.setTexture('knifehead');
        this.standingTime = Phaser.Math.Between(120, 180);
        this.health = 100;
    }

    hitPlayer(player)
    {
        super.hitPlayer(player);
        player.setVelocityY(-500);
        player.iframes = 30;
        this.attackSpeedBonus = Math.min(this.attackSpeedBonus + 30, 180);
    }

    getHit(plate)
    {
        super.getHit(plate);
        this.hurtSpeedBonus = Math.min(this.hurtSpeedBonus + 30, 90);
    }

    update ()
    {
        super.update();
        if (this.iframes <= 0)
        {
            if (this.runningTime > 0)
            {
                this.setVelocityX((this.speed + this.attackSpeedBonus + this.hurtSpeedBonus) * this.direction);
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
        else
        {
            this.setVelocityX(0);
            this.anims.play('knifehead-hurt', true);
        }
    }
}