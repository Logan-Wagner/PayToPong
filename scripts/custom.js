
class Customization {
    constructor(ballInit, paddleInit, backgroundInit) {
        this.ballInit = ballInit;
        this.paddleInit = paddleInit;
        this.backgroundInit = backgroundInit;

        // Customization listeners
        this.ballColorPicker;
        this.paddleColorPicker;
        this.backgroundColorPicker;

        //window.addEventListener("load", this.startup, false);
    }

    updateBall(event) {
        var ball = document.querySelector("#current-ball-color");
        if (ball) {
            ball.style.color = event.target.value;
        }
    }

    updatePaddle(event) {
        var paddle = document.querySelector("#current-paddle-color");
        if (paddle) {
            paddle.style.color = event.target.value;
        }
    }

    updateBackground(event) {
        var background = document.querySelector("#current-background-color");
        if (background) {
            background.style.color = event.target.value;
        }
    }

    startup() {
        this.ballColorPicker = document.querySelector("#ball-color");
        this.paddleColorPicker = document.querySelector("#paddle-color");
        this.backgroundColorPicker = document.querySelector("#back-color");

        this.ballColorPicker.value = this.ballInit;
        this.paddleColorPicker.value = this.paddleInit; 
        this.backgroundColorPicker.value = this.backgroundInit;

        this.ballColorPicker.addEventListener("change", updateBall, false);
        this.paddleColorPicker.addEventListener("change", updatePaddle, false);
        this.backgroundColorPicker.addEventListener("change", updateBackground, false);
        
        this.ballColorPicker.select();
        this.paddleColorPicker.select();
        this.backgroundColorPicker.select();
    }
}