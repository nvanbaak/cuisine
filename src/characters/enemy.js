export default class Enemy extends Phaser.Physics.Arcade.Sprite {
    velocityX = 0;
    velocityY = 0;
    iframes = 0;
    health = 0;

    constructor(scene, x, y)
    {
        super(scene, x, y);
        scene.add.existing(this);
        this.setPosition(x, y);
    }

    static checkIframes(enemy, other)
    {
        return enemy.iframes <= 0;
    }

    static hitPlayer(player, enemy)
    {
        enemy.hitPlayer(player);
    }

    getHit(plate)
    {
        this.iframes = 30;
        this.health -= plate.damage;
        plate.destroy();
        if (this.health <= 0)
        {
            let index = this.scene.updateArray.indexOf(this);
            this.scene.updateArray.splice(index, 1);
            this.destroy();
        }
    }

    hitPlayer(player)
    {
    }

    update ()
    {
        super.update();

        if (this.iframes > 0)
        {
            this.setTint(0xff0000);
            this.iframes -= 1;
        }
        else
        {
            this.setTint(0xffffff);
        }
    }
}