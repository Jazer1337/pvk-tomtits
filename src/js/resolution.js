
export class Resolution {

    static SCALE;       // used for scaling images and props on the game map
    
    static circleRadius = 10;       // for 1920x1080

    static setup() {  

        const marginBetweenCols = parseInt(window.getComputedStyle(document.getElementById("column-2")).marginLeft);

        const infoBoxHeight = parseInt(window.getComputedStyle(document.getElementById("info")).height)

        const margin = 20;

        const desiredW = 1920 + 350;
        const desiredH = 1080;

        let desiredRatio = desiredW / desiredH;
        
        let winW = window.innerWidth - 2*margin - marginBetweenCols;
        let winH = window.innerHeight - 2*margin - infoBoxHeight;
        
        let winRatio = winW / winH;
        
        let totalW, totalH;
        if (winRatio > desiredRatio) {
            totalH = winH;
            totalW = totalH * desiredRatio;     // screen is wider: height constrains svg size
        }
        else {
            totalW = winW;
            totalH = totalW / desiredRatio;       // screen is taller/same aspect ratio: width constrains svg size
        }

        this.SCALE = desiredW / totalW;

        // set sizes based on potential new ratio
        this.circleRadius = this.circleRadius * totalW / 1920;

        const col1 = document.getElementById("column-1");
        col1.style.width = (1920/1080) * totalH + "px";
        col1.style.height = totalH + "px";

        const col2 = document.getElementById("column-2");
        col2.style.width = totalW - parseInt(col1.style.width) + "px";
        col2.style.height = totalH + "px";
        col2.style.marginLeft = marginBetweenCols + "px";


        // set **internal** size for canvas. Can be set in the element in html (or here in js) but not in css.
        const canvas = document.getElementById("canvas");
        canvas.width = parseInt(col1.style.width);      // NOTE: without "px"
        canvas.height = parseInt(col1.style.height);

        canvas.style.width = col1.style.width;
        canvas.style.height = col1.style.height;

        const scorePlayer = document.getElementById("score-player");
        const scorePlayerImg = scorePlayer.getElementsByTagName("img")[0];
        scorePlayerImg.style.width = 100 / this.SCALE + "px";
        
        const scoreRobot = document.getElementById("score-robot");
        const scoreRobotImg = scoreRobot.getElementsByTagName("img")[0];
        scoreRobotImg.style.width = 75 / this.SCALE + "px";

    }

}
