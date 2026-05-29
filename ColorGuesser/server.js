const express = require('express');
const app = express();
app.use(express.static("client"));
const server = app.listen(8000);
const io = require("socket.io")(server);

const users = {}
let timer = 10;
let stage = "GAME"
let user_count = 0
const f = require('./functions');
let color = f.randomColor();
let colorHex = color[0];
let colorR = color[1];
let colorG = color[2];
let colorB = color[3];
let everyoneSubmitted;


// const { spawnSync } = require('child_process');
// const pythonProcess = spawnSync('python3', [
//     'C:/Users/szotk/Desktop/-/.Programování/.Js/colors/python/color_changer.py',
//     'first_function',
//     '',
//     'C:/Users/szotk/Desktop/-/.Programování/.Js/colors/python/results.json'
//   ]);
//  const result = pythonProcess.stdout?.toString()?.trim();
//  const error = pythonProcess.stderr?.toString()?.trim();
// console.log(result, error)


io.sockets.on("connection", (socket) => {
    io.sockets.emit("stage-update", { stage: stage, timer: timer, color: colorHex });

    user_count++

    socket.on("player-joined", function (data) {
        users[socket.id] = {
            "name": data.name,
            "score": 0,
            "submitted": false,
            "r": undefined,
            "g": undefined,
            "b": undefined,
        }
        io.sockets.emit("game-update", { users: users })
    })

    socket.on("submit", function (data) {
        users[socket.id].submitted = true;
        users[socket.id].r = data.r
        users[socket.id].g = data.g
        users[socket.id].b = data.b

        everyoneSubmitted = true;
        for (const [id, u] of Object.entries(users)) {
            if (!u.submitted) everyoneSubmitted = false
        }
        if (everyoneSubmitted) timer = 0;
    })

})



//---------------------------------------------------------------

setInterval(function () {
    if (timer > 0) {
        timer--;
        io.sockets.emit("timer-update", { time: timer });
    } else {
        if (stage == "GAME") {
            stage = "ROUNDEND";
            timer = 5;
            let topId;
            let topScore;
            let usersArr = []
            for (const [id, u] of Object.entries(users)) {
                u.submitted = false;
                usersArr.push(u);
                if (u.r == undefined || u.g == undefined || u.b == undefined) continue;
                let score = 255 * 3 - Math.abs(colorR-u.r)- Math.abs(colorB-u.b)- Math.abs(colorB-u.b)
                u.score += score
                if (topId == undefined || score > topScore) {
                    topId = id;
                    topScore = score;
                }

            }

            usersArr = f.sort(usersArr);

            if (topId != undefined) {
                io.sockets.emit("stage-update", {
                    stage: stage, timer: timer, color: colorHex, correct: [colorR, colorG, colorB],
                    top: [users[topId].name, users[topId].r, users[topId].g, users[topId].b],
                    lb: usersArr
                });
            } else {
                io.sockets.emit("stage-update", {
                    stage: stage, timer: timer, color: colorHex, correct: [colorR, colorG, colorB],
                    top: ["Noone answered", "-", "-", "-"],
                    lb: usersArr
                });
            }
            for (const [id, u] of Object.entries(users)) {
                u.r = undefined;
                u.g = undefined;
                u.b = undefined;
            }

        }
        else {
            stage = "GAME";
            timer = 10;
            color = f.randomColor();
            colorHex = color[0];
            colorR = color[1];
            colorG = color[2];
            colorB = color[3];
            io.sockets.emit("stage-update", { stage: stage, timer: timer, color: colorHex });
        }
    }

}, 1000);