import { Game } from "./game.js";
import { Resolution } from "./resolution.js";


export class Sprite {

    x;      // left
    y;      // top
    WIDTH;
    HEIGHT;

    img;    // HTML elem

    constructor(imgSrc, width, x, y) {
        this.img = document.createElement("img");
        document.getElementById("canvas-container").appendChild(this.img);

        this.img.src = imgSrc;
        this.img.onload = () => {
            const ratio = this.img.width / this.img.height;
            const w = Math.floor(width / Resolution.SCALE);
            const h = Math.floor(w / ratio);

            this.img.style.position = "absolute";
            this.img.style.width = w + "px";
            this.img.style.height = h + "px";

            this.img.style.pointerEvents = "none";       // ignore events, since they should go to canvas, not this img

            this.WIDTH = w;
            this.HEIGHT = h;

            this.moveTo(x, y);

        }
    }

    moveTo(x, y, centered=true) {
        
        this.x = x;
        this.y = y;

        if (centered) {
            this.x -= this.WIDTH/2;
            this.y -= this.HEIGHT/2;
        }

        this.img.style.left = Game.canvasX + Math.floor(this.x) + "px";
        this.img.style.top = Game.canvasY + Math.floor(this.y) + "px";
    }

    moveBy(dx, dy) {
        this.x += dx;
        this.y += dy;

        this.img.style.left = Game.canvasX + Math.floor(this.x) + "px";
        this.img.style.top = Game.canvasY + Math.floor(this.y) + "px";
    }

    moveToAnim(x, y, onFinish) {

        x -= this.WIDTH/2;      // final x,y should be for topleft, not center
        y -= this.HEIGHT/2;

        const distX = x - this.x;
        const distY = y - this.y;
       
        const dist = Math.hypot(distX, distY);

        const fps = 30;
        const speed = 500 / Resolution.SCALE;       // pixels/second
        const interval = 1000/fps;

        const dx = (distX / dist) * speed / fps;
        const dy = (distY / dist) * speed / fps;

        const moveRight = dx > 0;

        // -- uncomment to skip animation

        // this.moveTo(x, y, false);
        // onFinish();
        // return;

        const intervalId = setInterval(() => {

            if ((moveRight && this.x+dx >= x) || (!moveRight && this.x+dx <= x)) {
                this.moveTo(x, y, false);
                clearInterval(intervalId);
                onFinish();
            }
            else {
                this.moveBy(dx, dy);
            }
            
        }, interval);

    }

}