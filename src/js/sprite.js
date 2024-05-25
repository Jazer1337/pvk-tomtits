import { Game } from "./game.js";
import { Resolution } from "./resolution.js";


export class Sprite {

    x;      // left
    y;      // top
    WIDTH;
    HEIGHT;

    img;    // HTML elem

    intervalId;     // for moveToAnim

    ORIG_IMG_SRC;     // used to reset
    ORIG_X;
    ORIG_Y;
    ORIG_VISIBLE;

    isLoaded = false;       // used to move generated trash

    // NOTE: x, y will be center
    constructor(imgSrc, width, x, y, visible=true) {
        
        this.ORIG_IMG_SRC = imgSrc;
        this.ORIG_X = x;
        this.ORIG_Y = y;
        this.ORIG_VISIBLE = visible;

        this.img = new Image(width);
        
        document.getElementById("column-1").appendChild(this.img);

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

            this.img.onload = () => {};
            this.isLoaded = true;
        }
    }

    reset() {
        clearInterval(this.intervalId);
        this.img.src = this.ORIG_IMG_SRC;
        this.moveTo(this.ORIG_X, this.ORIG_Y);
        this.setVisible(this.ORIG_VISIBLE);
    }

    setVisible(v) {
        this.img.style.visibility = v ? "visible" : "hidden";
    }

    setHorizontalFlip(v) {
        this.img.style.transform = v ? "scaleX(-1)" : "scaleX(1)";
    }

    moveTo(x, y, centered=true) {
        
        this.x = x;
        this.y = y;

        if (centered) {
            this.x -= this.WIDTH/2;
            this.y -= this.HEIGHT/2;
        }

        this.img.style.left = Game.canvasRect.x + Math.floor(this.x) + "px";
        this.img.style.top = Game.canvasRect.y + Math.floor(this.y) + "px";
    }

    moveBy(dx, dy) {
        this.x += dx;
        this.y += dy;

        this.img.style.left = Game.canvasRect.x + Math.floor(this.x) + "px";
        this.img.style.top = Game.canvasRect.y + Math.floor(this.y) + "px";
    }

    moveToAnim(x, y, onFinish, onNewFrame=()=>{}) {

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

        const FRAMES = Math.floor(dist/speed*fps);
        let frame = 0;        

        this.intervalId = setInterval(() => {

            onNewFrame(frame/FRAMES);
            frame++;

            if ((moveRight && this.x+dx >= x) || (!moveRight && this.x+dx <= x)) {
                this.moveTo(x, y, false);
                clearInterval(this.intervalId);
                onFinish();
            }
            else {
                this.moveBy(dx, dy);
            }
            
        }, interval);

    }

}