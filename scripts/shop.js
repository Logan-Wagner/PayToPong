bank = 100

function buy(item, price) {
    add_inventory(item);
    bank -= price;
    document.getElementById('coins').innerHTML = "$" + bank
}

function gain(amount) {
    bank += amount;
    document.getElementById('coins').innerHTML = "$" + bank
}

function add_inventory(item) {

}
