let template = document.getElementById("b-0");
let container = document.getElementById("c");

function handlePop(event) {

    let letter = "O"
    switch (event.currentTarget.id) {
        case "b-8":
            letter = "M"
            break;
        case "b-42":
            letter = "E"
            break;
        case "b-118":
            letter = "G"
            break;
        case "b-156":
            letter = "A"
            break;
        case "b-289":
            letter = "T"
            break;
        case "b-314":
            letter = "R"
            break;
        case "b-401":
            letter = "o"
            break;
        case "b-493":
            letter = "N"
            break;
    
        default:
            break;
    }

    event.currentTarget.innerText = "P"+letter+"P";
    event.currentTarget.style.background = "#9f9f9f";
}

template.addEventListener("mouseup", handlePop);


for (let i = 1; i <= 511; i++) {
    const clone = template.cloneNode(true);
    
    clone.id = "b-" + i;
    clone.addEventListener("mouseup", handlePop);
    
    c.appendChild(clone);
}