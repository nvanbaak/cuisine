export default class Item extends Phaser.Physics.Arcade.Sprite {

    constructor(scene, x, y, itemType, inventory)
    {
        super(scene, x, y);
        scene.add.existing(this);
        this.setPosition(x, y);

        this.itemType = itemType;
        this.setTexture(itemType);

        this.inventory = inventory;
    }

    pickup () {

        switch (this.itemType) {
            
            case "apple":
                this.inventory.apple++;
                break;
            case "egg":
                this.inventory.egg++;
                break;
            case "fish":
                this.inventory.fish++;
                break;
            case "lemon":
                this.inventory.lemon++;
                break;
            case "lettuce":
                this.inventory.lettuce++;
                break;
            case "meat":
                this.inventory.meat++;
                break;
            case "plate":
                this.inventory.plate++;
                break;
            default:
                break;
        }

        this.destroy();
    }


}