function randomColor() {
    r = Math.floor(Math.random() * 255);
    g = Math.floor(Math.random() * 255);
    b = Math.floor(Math.random() * 255);
    hex = rgbToHex(r, g, b);
    return [hex, r, g, b];s
}

function componentToHex(c) {
    var hex = c.toString(16);
    return hex.length == 1 ? "0" + hex : hex;
}

function rgbToHex(r, g, b) {
    return "#" + componentToHex(r) + componentToHex(g) + componentToHex(b);
}

function bblSort(arr) {
 
    for (var i = 0; i < arr.length; i++) {
 
        for (var j = 0; j < (arr.length - i - 1); j++) {
 
            if (arr[j].score < arr[j + 1].score) {
 
                var temp = arr[j]
                arr[j] = arr[j + 1]
                arr[j + 1] = temp
            }
        }
    }
    return arr;
}

module.exports.randomColor = randomColor;
module.exports.sort = bblSort;