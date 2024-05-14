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
            game.addModifier(this.slot1)
            this.slot1 = "_"
        } else if (slot == 2 && this.slot2 != "X") {
            game.addModifier(this.slot2)
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
