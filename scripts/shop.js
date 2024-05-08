class Shop {
    constructor(inventory, amount) {
        this.inventory = inventory;
        this.bank = amount;
        this.items = ['Double Trouble', 'Mirror', 'Gravity', 'Chaos', 'Straight Shot', 'Funnel', 'Fog of War', 'Future Sight', 'Reverse'];
        this.costs = [20, 50, 70, 5, 10, 90, 100, 40, 25];
    }

    updateBank() {
        document.getElementById('coins').innerHTML = "$" + this.bank;
    }

    buy(item, price) {
        if (this.bank >= price && this.inventory.slotAvailable()) {     // no going into debt and implemented item limit
            this.inventory.add(item);
            this.bank -= price;
            this.updateBank();
        } else if (this.bank < price) {
            console.log("Not enough coin!")
        } else if (!this.inventory.slotAvailable()) {
            console.log("Inventory is full!")
        } else {
            console.warn("error adding item to inventory")
        }
    }

    increaseSlots() {
        if (this.bank >= 1000 && this.inventory.newSlotAvailable()) {
            this.inventory.newSlot();
            this.bank -= 1000;
            this.updateBank();
        } else {
            console.log("Max inventory limit reached")
        }
    }

    gain(amount) {
        this.bank += amount;
        this.updateBank();
    }

    randomItemSelect(id) {
        var item = Math.floor(Math.random()*8);
        window.getElementById(id).innerHTML = this.items[item] <br> this.costs[item];
        return this.items[item], this.costs[item];
    }

}
