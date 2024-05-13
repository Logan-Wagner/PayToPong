class Popup {
    constructor(coin=0, sec=0, shop=undefined) {
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

    openUntimed(id) {
        document.getElementById("overlay").style.display = 'block';
        document.getElementById(id).style.display = 'block';
    }

    closeUntimed(id) {
        document.getElementById("overlay").style.display = 'none';
        document.getElementById(id).style.display = 'none';
    }
    
}