import { Game } from "./game.js";

export class UI {

    static INACTIVITY_THRESHOLD = 120 * 1000;  // in ms

    static setup() {

        UI.setupResetWhenInactive();

        // level button
        const btnNext = document.getElementById("button-next-level");
        const btnLast = document.getElementById("button-last-level");
        const btnNew = document.getElementById("button-new-trash");
        const span = document.getElementById("span-level");
        
        btnLast.disabled = true;

        btnLast.addEventListener("click", () => {
            if (Game.ignoreClicks) {
                return;
            }
            
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
            if (Game.ignoreClicks) {
                return;
            }

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
            if (Game.ignoreClicks) {
                return;
            }
            Game.nextLevel(0);      // no change in level just regenerates random trash
        });

        // reset button
        let btn = document.getElementById("button-reset-level");
        btn.addEventListener("click", () => {
            if (Game.ignoreClicks) {
                return;
            }
            Game.reset()
        });

        document.addEventListener("contextmenu", event => {
            event.preventDefault();
        });

    }

    static setupResetWhenInactive() {
        function addTimeout() {
            return setTimeout(() => {
                Game.level = 0;
                Game.nextLevel(0);
                resetTimeout = addTimeout();
            }, UI.INACTIVITY_THRESHOLD);

        }

        const body = document.getElementsByTagName("body")[0];
        body.addEventListener("click", () => {
            clearTimeout(resetTimeout);
            resetTimeout = addTimeout();
        });

        let resetTimeout = addTimeout();
    }

    static setButtonsEnabled(bool) {
        for (const btn of document.getElementById("buttons").getElementsByTagName("button")) {
            
            if (bool) {
                if (btn.oldDisabled) {
                    continue;
                }
            }
            else {
                btn.oldDisabled = btn.disabled;     // add custom prop to remember when enabling
            }
            btn.disabled = !bool;
        }
    }
}
