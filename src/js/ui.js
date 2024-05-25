import { Game } from "./game.js";

export class UI {

    static setup() {

        // level button
        const btnNext = document.getElementById("button-next-level");
        const btnLast = document.getElementById("button-last-level");
        const btnNew = document.getElementById("button-new-trash");
        const span = document.getElementById("span-level");
        
        btnLast.disabled = true;

        btnLast.addEventListener("click", () => {
            if (Game.level > 0) {
                Game.nextLevel(-1);
                span.innerHTML = "Nivå " + (Game.level+1);
                btnNext.disabled = false;
            }
            if (Game.level == 0) {
                btnLast.disabled = true;
            }
        });
        
        btnNext.addEventListener("click", () => {
            if (Game.level < 2) {
                Game.nextLevel(+1);
                span.innerHTML = "Nivå " + (Game.level+1);
                btnLast.disabled = false;
            }
            if (Game.level == 2) {
                btnNext.disabled = true;
            }
        });

        btnNew.addEventListener("click", () => {
            Game.nextLevel(0);      // no change in level just regenerates random trash
        });

        // reset button
        let btn = document.getElementById("button-reset-level");
        btn.addEventListener("click", Game.reset);

    }
}
