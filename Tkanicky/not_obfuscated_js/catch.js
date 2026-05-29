let on = document.getElementById("on")
let ans = document.getElementById("ans")

on.addEventListener("mousedown", handleCatch);

let to = setInterval(() => {
    on.style.left = Math.random()*(window.innerWidth-150) + "px";
    on.style.top = Math.random()*(window.innerHeight-250)+100 + "px";
}, 250);



function handleCatch(event){
    clearInterval(to)
    ans.innerText = "heslo: zrcadlo"
}