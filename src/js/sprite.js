import { Game } from "./game.js";
import { Resolution } from "./resolution.js";


export class Sprite {

    x;      // left
    y;      // top
    width;
    height;
    sizeRatio;

    img;    // HTML elem

    intervalId;     // for moveToAnim

    ORIG_IMG_SRC;     // used to reset
    ORIG_X;
    ORIG_Y;
    ORIG_WIDTH;     // used to resize back from 0x0
    ORIG_VISIBLE;

    isLoaded = false;       // used to move generated trash

    // NOTE: x, y will be center
    constructor(imgSrc, width, x, y, visible=true) {
        
        this.ORIG_IMG_SRC = imgSrc;
        this.ORIG_X = x;
        this.ORIG_Y = y;
        this.ORIG_WIDTH = width / Resolution.SCALE;
        this.ORIG_VISIBLE = visible;

        this.img = new Image(width);
        
        document.getElementById("column-1").appendChild(this.img);

        this.img.classList.add("shadow");

        this.img.src = imgSrc;
        this.img.onload = () => {
            this.sizeRatio = this.img.width / this.img.height;
            this.width = Math.floor(this.ORIG_WIDTH);
            this.height = Math.floor(this.width / this.sizeRatio);

            this.img.style.position = "absolute";
            this.img.style.width = this.width + "px";
            this.img.style.height = this.height + "px";

            this.img.style.pointerEvents = "none";       // ignore events, since they should go to canvas, not this img

            this.moveTo(x, y);

            this.img.onload = () => {};
            this.isLoaded = true;
        }
    }

    reset(anim=false) {
        clearInterval(this.intervalId);
        this.img.src = this.ORIG_IMG_SRC;
        this.moveTo(this.ORIG_X, this.ORIG_Y);
        if (anim) {
            this.setVisibleAnim(this.ORIG_VISIBLE);
        }
        else {
            this.setVisible(this.ORIG_VISIBLE);
        }
    }

    setClass(cls, enabled) {
        if (enabled) {
            this.img.classList.add(cls);
        }
        else {
            this.img.classList.remove(cls);
        }
    }


    setSize(w, h=null) {
        
        const centerX = this.x + this.width/2;
        const centerY = this.y + this.height/2;

        this.width = w;
        
        if (h === null) {
            h = this.width / this.sizeRatio;
        }
        this.height = h;
        
        this.img.style.width = this.width + "px";
        this.img.style.height = this.height + "px";

        this.moveTo(centerX, centerY);
    }

    setVisible(v) {
        if (v) {
            this.img.style.visibility = "visible";
            if (this.width == 0) {
                this.setSize(this.ORIG_WIDTH)
            }
        }
        else {
            this.img.style.visibility = "hidden";
        }
    }

    setVisibleAnim(toVisible, onFinish=()=>{}, onNewFrame=()=>{}) {

        const fps = 30;
        const speed = 2 / Resolution.SCALE;       // pixels/second
        const interval = 1000/fps;

        const dist = this.width;
        const FRAMES = Math.floor(dist/speed*fps);
        let frame = 0;        

        let currentWidth, currentHeight;
        let finalWidth, finalHeight;
        let dx, dy;

        if (toVisible) {
            currentWidth = 0;
            currentHeight = 0;

            finalWidth = this.ORIG_WIDTH;
            finalHeight = Math.floor(this.ORIG_WIDTH / this.sizeRatio);           

            dx = finalWidth * speed / fps;
            dy = finalHeight * speed / fps;
            this.setSize(1, 0);             // 0,0 doesnt work, neither does 0,1
            this.setVisible(true);
        }
        else {
            currentWidth = this.width;
            currentHeight = this.height;
            finalWidth = 0;
            finalHeight = 0;
            dx = - currentWidth * speed / fps;
            dy = - currentHeight * speed / fps;
        }

        this.intervalId = setInterval(() => {
    
            onNewFrame(frame/FRAMES);
            frame++;

            currentWidth += dx;
            currentHeight += dy;

            if ((toVisible && currentWidth >= finalWidth) || (!toVisible && currentWidth <= finalWidth)) {
                this.setSize(finalWidth, finalHeight);
                clearInterval(this.intervalId);

                this.setVisible(toVisible);
                onFinish((dist/dx)*interval);           // param is duration in ms
            }
            else {
                this.setSize(currentWidth, currentHeight);
            }
            
        }, interval);


    }

    setHorizontalFlip(v) {
        this.img.style.transform = v ? "scaleX(-1)" : "scaleX(1)";
    }

    moveTo(x, y, centered=true) {
        
        this.x = x;
        this.y = y;

        if (centered) {
            this.x -= this.width/2;
            this.y -= this.height/2;
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

    moveToAnim(x, y, onFinish=()=>{}, onNewFrame=()=>{}) {

        x -= this.width/2;      // final x,y should be for topleft, not center
        y -= this.height/2;

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
                onFinish((distX/dx)*interval);           // param is duration in ms
            }
            else {
                this.moveBy(dx, dy);
            }
            
        }, interval);

    }

}