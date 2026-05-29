let imgIds = ["wave.jpg", "lost.jpg", "seer.jpg", "main.jpg", "main.jpg", "wave.jpg"];
let img = document.getElementById("img");
let btns = [];
for(let i = 1; i <=5; i++){
    btns[i-1] = document.getElementById("b"+i)
    btns[i-1].addEventListener("mouseup", () => {
        handleClick(i);
    })
};
let parCollections = [];

for(let i = 1; i <=6; i++){
    parCollections[i-1] = Array.from(document.getElementsByClassName("p"+i));
};

function handleClick(i) {
    console.log(i)

    img.src = imgIds[i]
    parCollections.forEach(coll => {
        for(let p of coll){
            p.style.display = "none"; 
        }
    });

    parCollections[i].forEach(p => {
        p.style.display = "block"
    })

}
handleClick(0)