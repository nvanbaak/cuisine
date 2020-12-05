import Enemy from "./enemy.js";

export default class KnifeheadEnemy extends Enemy {
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