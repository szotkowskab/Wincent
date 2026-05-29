const startBtn = document.getElementById("start");
const nickname = document.getElementById("name");

const body = document.body;
let gameHtml;
let reHtml;
let submitted = false;
let lb = []

var xhr = new XMLHttpRequest();
xhr.open('GET', "game/game.html", false);
xhr.onreadystatechange = function () {
    if (this.readyState !== 4) return ":(";
    gameHtml = this.responseText;
};
xhr.send();
var xhr = new XMLHttpRequest();
xhr.open('GET', "roundend/roundend.html", false);
xhr.onreadystatechange = function () {
    if (this.readyState !== 4) return ":(";
    reHtml = this.responseText;
};
xhr.send();

function onsubmit(socket){
    if(submitted) return

    let r = parseInt(document.getElementById("R").value);
    let g = parseInt(document.getElementById("G").value);
    let b = parseInt(document.getElementById("B").value);
    if (!(r >= 0 && r <= 255)) {
        document.getElementById("R").style.border = "red 2px solid"
        return
    }if (!(g >= 0 && g <= 255)) {
        document.getElementById("G").style.border = "red 2px solid"
        return
    }if (!(b >= 0 && b <= 255)) {
        document.getElementById("B").style.border = "red 2px solid"
        return
    }
    socket.emit("submit", { r: r, g: g, b: b });
    document.getElementById("submit").style.color = "black"
    document.getElementById("submit").style.border = "solid black 2px"
    document.getElementById("R").readOnly = true;
    document.getElementById("G").readOnly = true;
    document.getElementById("B").readOnly = true;
    submitted = true;
    console.log(r,g,b)
}
// --------------------------------------------------------------------
// -------------------------------------------------------------------
// --------------------------------------------------------------------

startBtn.onclick = function () {
    if (nickname.value == "") return

    const socket = io();

    socket.emit("player-joined", { name: nickname.value });

    socket.on("timer-update", function (time) {
        document.getElementById("timer").innerText = time.time;
    })

    socket.on("stage-update", function (data) {
        if (data.stage == "ROUNDEND") {
            document.documentElement.innerHTML = reHtml;
            submitted = false;
            lb = data.lb;


            document.getElementById("correct_rgb").innerText = String(data.correct[0])+", "+String(data.correct[1])+", "+String(data.correct[2]);
            document.getElementById("closest_rgb").innerText = String(data.top[1])+", "+String(data.top[2])+", "+String(data.top[3]);
            document.getElementById("closest_name").innerText = data.top[0];
        } else {
            document.documentElement.innerHTML = gameHtml;
            document.getElementById("submit").onclick = function(){onsubmit(socket)};
            window.onkeydown = function(key){
                if (key.key == "Enter"){
                    onsubmit(socket);
                }
            }
        }
        document.body.style.background = data.color;
        document.getElementById("timer").innerText = data.timer;

        let a = Math.min(lb.length, 5);

            for (let i = 0; i < a; i++) {
                const el = lb[i];
                let span = document.createElement("span");
                span.innerText = el.name + " - " + String(el.score);
                document.getElementById("lb").appendChild(span);
                
            }
    })



}

