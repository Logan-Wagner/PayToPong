class Shop {
    constructor(amount) {
        this.bank = amount;
    }

    add_inventory(item) {
    }

    updateBank() {
        document.getElementById('coins').innerHTML = "$" + this.bank;
    }

    buy(item, price) {
        if (this.bank >= price) {     // no going into debt
            this.add_inventory(item);
            this.bank -= price;
            this.updateBank();
        }
    }

    gain(amount) {
        this.bank += amount;
        this.updateBank();
    }

}

const shop = new Shop(100); // used to actually define the shop