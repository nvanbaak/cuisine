export default class Item extends Phaser.Physics.Arcade.Sprite {

    constructor(scene, x, y, itemType)
    {
        super(scene, x, y);
        scene.add.existing(this);
        this.setPosition(x, y);

        this.itemType = itemType;
        this.setTexture(itemType);
    }

    


}