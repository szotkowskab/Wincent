async function getJSONData(path) {
    const response = await fetch(path, { mode: "no-cors" });
    return response.json();
}
function getSongsByTag(songs, tag) {
    return songs
        .filter(item => item.song.tags[tag]);
}
function getSongsWithIndexes(songs){
    return songs
        .map((song, index) => ({ song, index }))
}
function getID() {
    const params = new Proxy(new URLSearchParams(window.location.search), {
        get: (searchParams, prop) => searchParams.get(prop),
    });
    if (params.id) return parseInt(params.id)
    return 0
}