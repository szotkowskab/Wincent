function songSetTitle(title) {
    document.getElementById("title").innerText = title
}
function songSetAuthor(text) {
    document.getElementById("author").innerText = text
}

function createCustomSpan(text, id) {
    const span = document.createElement("span");
    span.classList.add("song-text_section")
    span.id = id
    span.innerText = text
    return span
}
function setChord(chord, id) {
    document.styleSheets[0].insertRule("#" + id + "::before { content: '" + chord + "'; }", 2);
}
function songSetText(text) {
    if(text[0] != "{") text = "{}"+text
    temp = text.split("{")
    chordsWithText = []
    temp.forEach(el => {
        if (el == "") return;
        chordsWithText.push(el.split("}"))
    });

    const songTextEl = document.getElementById("song-text")
    idCounter = 0
    chordsWithText.forEach(el => {
        id = "id" + String(idCounter)
        const span = createCustomSpan(el[1], id)
        songTextEl.append(span)
        setChord(el[0], id)
        idCounter++
    });
    adjustChordSpacing()
}

function adjustChordSpacing(){
    let spans = document.querySelectorAll(".song-text_section");
    spans.forEach(span => {
        const chordWidth = parseFloat(window.getComputedStyle(span, "::before").width.replace("px", ""));
        const spanWidth = parseFloat(span.getBoundingClientRect().width);
        if (chordWidth >= spanWidth){
            span.style.marginRight = String(chordWidth-spanWidth+5)+"px"
        }
    });
}



async function main() {
    let data = await getJSONData("../data.json");
    let songs = data.songs;
    let id = getID();
    try {
        songSetTitle(songs[id].title);
        songSetAuthor(songs[id].author);
        songSetText(songs[id].text);
    } catch (error) {
        setTimeout(()=>{}, 4000)
        songSetTitle("Hm, něco se nepovedlo :(");
        songSetAuthor("Zkontrolujte prosím, jestli jste na správné stránce. Pokud ano, zmáčkněte Ctrl+F5.");
    } 
    
    

}




main();

