export default class Hotbar extends Phaser.Physics.Arcade.Sprite {

    slots = [];
    slotWidth = 32;

    constructor (scene, x, y)
    {
        super(scene, x, y);

        this.setPosition(x, y);

        this.leftSide = scene.add.sprite(x - 12, y, 'hotbar');
        this.leftSide.setTexture('hotbar', 0);
        this.rightSide = scene.add.sprite(x + 12, y, 'hotbar');
        this.rightSide.setTexture('hotbar', 2);
    }

    resize(numSlots)
    {
        // only let the hotbar expand for now
        if (numSlots <= this.slots.length)
        {
            return;
        }

        for (var i = this.slots.length; i < numSlots; i++)
        {
            this.slots.push(new HotbarSlot(this.scene, i));
        }

        let width = (this.slots.length + 1) * this.slotWidth;
        let furthestLeft = this.x - width / 2;
        this.leftSide.setPosition(furthestLeft, this.y);
        this.rightSide.setPosition(furthestLeft + (this.slots.length * this.slotWidth) + this.slotWidth, this.y);
        for (var i = 0; i < this.slots.length; i++)
        {
            this.slots[i].setPosition(furthestLeft + (i * this.slotWidth) + this.slotWidth, this.y);
        }
    }
}

class HotbarSlot extends Phaser.Physics.Arcade.Sprite {
    constructor (scene, hotbarIndex)
    {
        super(scene);
        scene.add.existing(this);
        this.hotbarIndex = hotbarIndex;
        this.setTexture('hotbar', 1);
    }
}