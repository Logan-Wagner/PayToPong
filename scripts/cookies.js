function setCookie(cname, cvalue, exdays, path) {
    const d = new Date();
    d.setTime(d.getTime() + (exdays * 24 * 60 * 60 * 1000));
    let expires = "expires="+d.toUTCString();
    document.cookie = cname + "=" + cvalue + ";" + expires + "; path="+path;
}
  
function getCookie(cname) {
    let name = cname + "=";
    let ca = document.cookie.split(';');
    
    for(let i = 0; i < ca.length; i++) {
      let c = ca[i];

      while (c.charAt(0) == ' ') {
        c = c.substring(1);
      }

      if (c.indexOf(name) == 0) {
        return c.substring(name.length, c.length);
      }

    }

    return "";
}

var inv;
var shop;
var custom;

var bank  = getCookie("bank");
var slot1 = getCookie("slot1");
var slot2 = getCookie("slot2");
var slot3 = getCookie("slot3");
var slot4 = getCookie("slot4");
var slot5 = getCookie("slot5");

var ballColor = getCookie("ballColor");
var paddleColor = getCookie("paddleColor");
var backgroundColor = getCookie("backgroundColor");

if (bank != "" && slot1 != "" && slot2 != "" && slot3 != "" && slot4 != "" && slot5 != "" /*&& ballColor != "" && paddleColor != "" && backgroundColor != ""*/) {
    // copied over inventory and shop
    inv = new Inventory(slot1, slot2, slot3, slot4, slot5); // a simple class that stores power-ups
    shop = new Shop(inv, parseInt(bank)); // used to actually define the shop
    custom = new Customization(ballColor, paddleColor, backgroundColor);
    console.log("loaded from storage");

} else {
    // new local instances of inventory, shop, and custom colors
    setCookie("bank",  200, 7, "./shop.html")
    setCookie("slot1", "_", 7, "./shop.html");
    setCookie("slot2", "_", 7, "./shop.html");
    setCookie("slot3", "_", 7, "./shop.html");
    setCookie("slot4", "X", 7, "./shop.html");
    setCookie("slot5", "X", 7, "./shop.html");
    setCookie("ballColor", "ffffff", 7, "./custom.html");
    setCookie("paddleColor", "ffffff", 7, "./custom.html");
    setCookie("backgroundColor", "black", 7, "./custom.html");

    inv = new Inventory("_","_","_","X","X"); // a simple class that stores power-ups
    shop = new Shop(inv, 200); // used to actually define the shop
    custom = new Customization("#ffffff", "#ffffff", "black");
    console.log("Default setup method");
}

window.onload = function() {
  shop.updateBank();
  inv.updateSlot(1);
  inv.updateSlot(2);
  inv.updateSlot(3);
  inv.updateSlot(4);
  inv.updateSlot(5);
};

window.onbeforeunload = function() {
  setCookie("bank",  shop.bank, 7, "./shop.html");
  setCookie("slot1", inv.slot1, 7, "./shop.html");
  setCookie("slot2", inv.slot2, 7, "./shop.html");
  setCookie("slot3", inv.slot3, 7, "./shop.html");
  setCookie("slot4", inv.slot4, 7, "./shop.html");
  setCookie("slot5", inv.slot5, 7, "./shop.html");
};

window.onclose = function() {
  setCookie("bank",  shop.bank, 7, "./shop.html");
  setCookie("slot1", inv.slot1, 7, "./shop.html");
  setCookie("slot2", inv.slot2, 7, "./shop.html");
  setCookie("slot3", inv.slot3, 7, "./shop.html");
  setCookie("slot4", inv.slot4, 7, "./shop.html");
  setCookie("slot5", inv.slot5, 7, "./shop.html");
};

window.onabort = function() {
  setCookie("bank",  shop.bank, 7, "./shop.html");
  setCookie("slot1", inv.slot1, 7, "./shop.html");
  setCookie("slot2", inv.slot2, 7, "./shop.html");
  setCookie("slot3", inv.slot3, 7, "./shop.html");
  setCookie("slot4", inv.slot4, 7, "./shop.html");
  setCookie("slot5", inv.slot5, 7, "./shop.html");
};