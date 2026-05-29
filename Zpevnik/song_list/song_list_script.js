let validTags = {
    "czech": false,
    "foreign": false,
    "folk": false,
    "carol": false,
    "artificial": false
}


async function updateValidTagsOnChange(event) {
    document.getElementById("song_list").innerHTML = "";
    validTags[event.target.id] = !validTags[event.target.id]

    let data = await getJSONData("../data.json");
    let songs = data.songs;

    const activeTags = Object.keys(validTags).filter(tag => validTags[tag]);
    let filteredSongs = getSongsWithIndexes(songs)
    activeTags.forEach(el => {
        filteredSongs = getSongsByTag(filteredSongs, el)
    })

    filteredSongs.forEach(el => {
        let songList = document.getElementById("song_list");
        let a = document.createElement("a");
        let br = document.createElement("br");
        a.innerText = el.song.title + " - " + el.song.author;
        a.href = "../song?id=" + String(el.index)
        songList.appendChild(a)
        songList.appendChild(br)
    })
}


async function main() {

    let data = await getJSONData("../data.json");
    let songs = data.songs;
    const songsWithIndexes = getSongsWithIndexes(songs);

    songsWithIndexes.forEach(el => {
        let songList = document.getElementById("song_list");
        let a = document.createElement("a");
        let br = document.createElement("br");
        a.innerText = el.song.title + " - " + el.song.author;
        a.href = "../song?id=" + String(el.index)
        songList.appendChild(a)
        songList.appendChild(br)
    });
}
main()