function removeDiacritics(text) {
    return text.normalize("NFD").replace(/[\u0300-\u036f]/g, "").toLowerCase();
}


async function main() {
    let searchInput = document.getElementById('search-input');
    let resultsList = document.getElementById('results');
    let data = await getJSONData("../data.json");
    let indexedData = getSongsWithIndexes(data.songs);
    
    indexedData.forEach(el => {
        el.song.title_normalized = removeDiacritics(el.song.title)
        el.song.author_normalized = removeDiacritics(el.song.author)
        el.song.text_normalized = removeDiacritics(el.song.text)
    });

    const search = new JsSearch.Search('index');
    search.addIndex(['song', 'title_normalized']);
    search.addIndex(['song', 'author_normalized']);
    search.addIndex(['song', 'text_normalized']);
    search.addDocuments(indexedData);

    searchInput.addEventListener('input', () => {
        const query = removeDiacritics(searchInput.value.trim());
        const results = search.search(query);

        resultsList.innerHTML = "";
        results.forEach(el => {
            let a = document.createElement('a');
            let li = document.createElement('li');
            a.href = "../song?id=" + el.index;
            a.innerText = el.song.title + " - " + el.song.author;
            li.appendChild(a);
            resultsList.appendChild(li);
        });
    });
}

main();