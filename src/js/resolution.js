
export class Resolution {

    static DESIRED_WIDTH = 1920;
    static DESIRED_HEIGHT = 1080;

    static SCALE;       // used for scaling images and props on the game map
    
    // style variables for 1920x1080 (scales automatically)
    static canvasMargin = 0.1;      // percent
    static circleRadius = 10;

    static setup() {  
        
        const canvas = document.getElementById("canvas");
       
        let desiredRatio = this.DESIRED_WIDTH / this.DESIRED_HEIGHT;
        
        let winW = window.innerWidth;
        let winH = window.innerHeight;
        
        let winRatio = winW / winH;
        
        let w, h;
        if (winRatio > desiredRatio) {
            h = winH;
            w = winH * desiredRatio;     // screen is wider: height constrains svg size
        }
        else {
            w = winW;
            h = winW / desiredRatio;       // screen is taller/same aspect ratio: width constrains svg size
        }

        this.SCALE = this.DESIRED_WIDTH / w;

        // set sizes based on potential new ratio
        this.circleRadius = (this.circleRadius/this.DESIRED_WIDTH) * w;

        // set **internal** size for canvas. Can be set in the element in html (or here in js) but not in css.
        canvas.width = w * (1-this.canvasMargin);
        canvas.height = h * (1-this.canvasMargin);
    }

}
