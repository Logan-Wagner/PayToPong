class Inventory {
    constructor(slot1 = "_", slot2 = "_", slot3 = "_", slot4 = "_", slot5 = "_") {
        this.slot1 = slot1;
        this.slot2 = slot2;
        this.slot3 = slot3;
        this.slot4 = slot4;
        this.slot5 = slot5;
    }

    // adds item in order of emptied slots
    add(item) {
        if (this.slot1 == "_") {
            this.slot1 = item;
            this.updateSlot(1);
        } else if (this.slot2 == "_") {
            this.slot2 = item;
            this.updateSlot(2);
        } else if (this.slot3 == "_") {
            this.slot3 = item;
            this.updateSlot(3);
        } else if (this.slot4 == "_") {
            this.slot4 = item;
            this.updateSlot(4);
        } else if (this.slot5 == "_"){
            this.slot5 = item;
            this.updateSlot(5);
        }
    }

    // Remove item from inventory (excluding locked slots)
    use(slot) {
        if (slot == 1 && this.slot1 != "X") {
            this.slot1 = "_";
        } else if (slot == 2 && this.slot2 != "X") {
            this.slot2 = "_";
        } else if (slot == 3 && this.slot3 != "X") {
            this.slot3 = "_";
        } else if (slot == 4 && this.slot4 != "X") {
            this.slot4 = "_";
        } else if (slot == 5 && this.slot5 != "X") {
            this.slot5 = "_";
        }

        this.updateSlot(slot);
    }

    slotAvailable() {
        if (this.slot1 == "_" | this.slot2 == "_" | this.slot3 == "_" | this.slot4 == "_" | this.slot5 == "_") {
            return true;
        } else {
            return false;
        }
    }

    updateSlot(num) {
        // Put whatever is in the back-end to the front-end
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

    newSlot() {
        if (this.slot1 == "X") {
            this.slot1 = "_";
            this.updateSlot(1);
        } else if (this.slot2 == "X") {
            this.slot2 = "_";
            this.updateSlot(2);
        } else if (this.slot3 == "X") {
            this.slot3 = "_";
            this.updateSlot(3);
        } else if (this.slot4 == "X") {
            this.slot4 = "_";
            this.updateSlot(4);
        } else if (this.slot5 == "X"){
            this.slot5 = "_";
            this.updateSlot(5);
        } else {
            console.log("max inventory limit reached")
        }
    }

    newSlotAvailable() {
        if (this.slot1 == "X" | this.slot2 == "X" | this.slot3 == "X" | this.slot4 == "X" | this.slot5 == "X") {
            return true;
        } else {
            return false;
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

}

class Popup {
    constructor(coin, sec, shop) {
        this.coin = coin;
        this.secInit = sec;
        this.sec = sec;
        this.shop = shop;
        this.timer;
        this.timeComplete = false; // checks to see if total waiting time has went through
    }

    // based off answer by Mikhail: https://stackoverflow.com/questions/31559469/how-to-create-a-simple-javascript-timer
    // Nadir's answer helped clarify this: https://stackoverflow.com/questions/17883692/how-to-set-time-delay-in-javascript
    updateTime(){
        this.timer = setInterval(() => {
            document.getElementById("coin"+this.coin+"Time").innerHTML='00:'+this.sec;
            console.log(this.sec);

            if (this.sec <= 0) {
                clearInterval(this.timer);
                this.timeComplete = true;
                document.getElementById("coin"+this.coin+"Time").innerHTML='Done! Exit to collect prize';
            }

            this.sec--;
            
            }, 1000)
    }


    // This code, along with accompanying HTML and CSS, mainly adapted from https://www.loginradius.com/blog/engineering/simple-popup-tutorial/

    // Close Popup Event
    close() {
        clearInterval(this.timer); // stop any potential timer that is running
        this.sec = this.secInit;
        document.getElementById("coin"+this.coin+"Time").innerHTML='00:'+this.secInit; // reset counter back to original time
        document.getElementById("overlay").style.display = 'none';
        document.getElementById("coin"+this.coin).style.display = 'none';
        if (this.timeComplete) {
            this.shop.gain(this.coin);
            this.timeComplete = false;
        }
    }

    // Open Popup Event
    open() {
        this.updateTime();
        document.getElementById("overlay").style.display = 'block';
        document.getElementById("coin"+this.coin).style.display = 'block';
    }
}




