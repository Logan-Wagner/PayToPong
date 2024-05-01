class Inventory {
    constructor(slot1 = "empty", slot2 = "empty", slot3 = "empty", slot4 = "empty", slot5 = "empty") {
        this.slot1 = slot1;
        this.slot2 = slot2;
        this.slot3 = slot3;
        this.slot4 = slot4;
        this.slot5 = slot5;
    }

    // adds item in order of emptied slots
    add(item) {
        if (this.slot1 == "empty") {
            this.slot1 = item;
            this.updateSlot(1);
        } else if (this.slot2 == "empty") {
            this.slot2 = item;
            this.updateSlot(2);
        } else if (this.slot3 == "empty") {
            this.slot3 = item;
            this.updateSlot(3);
        } else if (this.slot4 == "empty") {
            this.slot4 = item;
            this.updateSlot(4);
        } else {
            this.slot5 = item;
            this.updateSlot(5);
        }
    }

    // Remove item from inventory
    use(slot) {
        if (slot == 1) {
            this.slot1 = "empty";
        } else if (slot == 2) {
            this.slot2 = "empty";
        } else if (slot == 3) {
            this.slot3 = "empty";
        } else if (slot == 4) {
            this.slot4 = "empty";
        } else if (slot == 5) {
            this.slot5 = "empty";
        }

        this.updateSlot(slot);
    }

    slotAvailable() {
        if (this.slot1 == "empty" | this.slot2 == "empty" | this.slot3 == "empty" | this.slot4 == "empty" | this.slot5 == "empty") {
            return true;
        } else {
            return false;
        }
    }

    updateSlot(num) {
        if (num == 1) {
            //console.log("slot 1 is " + this.slot1)
            document.getElementById('slot1').innerHTML = this.slot1;
        } else if (num == 2) {
            //console.log("slot 2 is " + this.slot2)
            document.getElementById('slot2').innerHTML = this.slot2;
        } else if (num == 3) {
            //console.log("slot 3 is " + this.slot3)
            document.getElementById('slot3').innerHTML = this.slot3;
        } else if (num == 4) {
            //console.log("slot 4 is " + this.slot4)
            document.getElementById('slot4').innerHTML = this.slot4;
        } else if (num == 5) {
            //console.log("slot 5 is " + this.slot5)
            document.getElementById('slot5').innerHTML = this.slot5;
        } else {
            console.warn("invalid num")
        }
    }


}

class Shop {
    constructor(inventory, amount) {
        this.inventory = inventory;
        this.bank = amount;
    }

    updateBank() {
        document.getElementById('coins').innerHTML = "$" + this.bank;
    }

    buy(item, price) {
        if (this.bank >= price && this.inventory.slotAvailable()) {     // no going into debt and implemented item limit
            this.inventory.add(item);
            this.bank -= price;
            this.updateBank();
        }
    }

    gain(amount) {
        this.bank += amount;
        this.updateBank();
    }

}

const inv = new Inventory(); // a simple class that stores power-ups
const shop = new Shop(inv, 100); // used to actually define the shop