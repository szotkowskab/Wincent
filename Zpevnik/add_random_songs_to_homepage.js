const czechSongsList = document.getElementById("czech_songs_list")
const folkSongsList = document.getElementById("folk_songs_list")
const carolSongsList = document.getElementById("carol_songs_list")

const songsCountPerCategory = 10;

function getRandomSongs(songs, n) {
    return songs
        .sort(() => Math.random() - 0.5) // a fancy way to shuffle an array
        .slice(0, n); 
};


const tags = ["czech", "folk", "carol"]

async function main() {
    let data = await getJSONData("./data.json");
    let songs = data.songs;

    tags.forEach(tag => {
        const songsWithIndexes = getSongsByTag(getSongsWithIndexes(songs), tag); 
        const randomSongs = getRandomSongs(songsWithIndexes, songsCountPerCategory);
        
        randomSongs.forEach(el => {
            let a = document.createElement("a");
            let br = document.createElement("br");
            a.innerText = el.song.title;
            a.href = "./song?id="+String(el.index)
            document.getElementById(tag+"_songs_list").appendChild(a)
            document.getElementById(tag+"_songs_list").appendChild(br)
        });
    });

}

main()