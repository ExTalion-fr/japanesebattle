const express = require('express');
const http = require('http');
const { Server } = require("socket.io");
const app = express();
const server = http.createServer(app);
const io = new Server(server);

app.use(express.static('public')); 

app.get('/', (req, res) => {
    res.sendFile('/index.html');
});

const hiraganaList = [
    { japanese: 'あ', romaji: 'a' },
    { japanese: 'い', romaji: 'i' },
    { japanese: 'う', romaji: 'u' },
    { japanese: 'え', romaji: 'e' },
    { japanese: 'お', romaji: 'o' },
    { japanese: 'か', romaji: 'ka' },
    { japanese: 'き', romaji: 'ki' },
    { japanese: 'く', romaji: 'ku' },
    { japanese: 'け', romaji: 'ke' },
    { japanese: 'こ', romaji: 'ko' },
    { japanese: 'さ', romaji: 'sa' },
    { japanese: 'し', romaji: 'shi' },
    { japanese: 'す', romaji: 'su' },
    { japanese: 'せ', romaji: 'se' },
    { japanese: 'そ', romaji: 'so' },
    { japanese: 'た', romaji: 'ta' },
    { japanese: 'ち', romaji: 'chi' },
    { japanese: 'つ', romaji: 'tsu' },
    { japanese: 'て', romaji: 'te' },
    { japanese: 'と', romaji: 'to' },
    { japanese: 'な', romaji: 'na' },
    { japanese: 'に', romaji: 'ni' },
    { japanese: 'ぬ', romaji: 'nu' },
    { japanese: 'ね', romaji: 'ne' },
    { japanese: 'の', romaji: 'no' },
    { japanese: 'は', romaji: 'ha' },
    { japanese: 'ひ', romaji: 'hi' },
    { japanese: 'ふ', romaji: 'fu' },
    { japanese: 'へ', romaji: 'he' },
    { japanese: 'ほ', romaji: 'ho' },
    { japanese: 'ま', romaji: 'ma' },
    { japanese: 'み', romaji: 'mi' },
    { japanese: 'む', romaji: 'mu' },
    { japanese: 'め', romaji: 'me' },
    { japanese: 'も', romaji: 'mo' },
    { japanese: 'や', romaji: 'ya' },
    { japanese: 'ゆ', romaji: 'yu' },
    { japanese: 'よ', romaji: 'yo' },
    { japanese: 'ら', romaji: 'ra' },
    { japanese: 'り', romaji: 'ri' },
    { japanese: 'る', romaji: 'ru' },
    { japanese: 'れ', romaji: 're' },
    { japanese: 'ろ', romaji: 'ro' },
    { japanese: 'わ', romaji: 'wa' },
    { japanese: 'を', romaji: 'wo' },
    { japanese: 'ん', romaji: 'n' },
    { japanese: 'が', romaji: 'ga' },
    { japanese: 'ぎ', romaji: 'gi' },
    { japanese: 'ぐ', romaji: 'gu' },
    { japanese: 'げ', romaji: 'ge' },
    { japanese: 'ご', romaji: 'go' },
    { japanese: 'ざ', romaji: 'za' },
    { japanese: 'じ', romaji: 'ji' },
    { japanese: 'ず', romaji: 'zu' },
    { japanese: 'ぜ', romaji: 'ze' },
    { japanese: 'ぞ', romaji: 'zo' },
    { japanese: 'だ', romaji: 'da' },
    { japanese: 'ぢ', romaji: 'ji' },
    { japanese: 'づ', romaji: 'zu' },
    { japanese: 'で', romaji: 'de' },
    { japanese: 'ど', romaji: 'do' },
    { japanese: 'ば', romaji: 'ba' },
    { japanese: 'び', romaji: 'bi' },
    { japanese: 'ぶ', romaji: 'bu' },
    { japanese: 'べ', romaji: 'be' },
    { japanese: 'ぼ', romaji: 'bo' },
    { japanese: 'ぱ', romaji: 'pa' },
    { japanese: 'ぴ', romaji: 'pi' },
    { japanese: 'ぷ', romaji: 'pu' },
    { japanese: 'ぺ', romaji: 'pe' },
    { japanese: 'ぽ', romaji: 'po' },
    { japanese: 'ちゃ', romaji: 'cha'},
    { japanese: 'ぎゃ', romaji: 'gya'},
    { japanese: 'ぴょ', romaji: 'pyo'},
    { japanese: 'しょ', romaji: 'sho'},
    { japanese: 'びょ', romaji: 'byo'},
    { japanese: 'にょ', romaji: 'nyo'},
    { japanese: 'ひゃ', romaji: 'hya'},
    { japanese: 'ちゅ', romaji: 'chu'},
    { japanese: 'びゅ', romaji: 'byu'},
    { japanese: 'ぎょ', romaji: 'gyo'},
    { japanese: 'にゃ', romaji: 'nya'},
    { japanese: 'びゃ', romaji: 'bya'},
    { japanese: 'じゃ', romaji: 'ja'},
    { japanese: 'ぴゅ', romaji: 'pyu'},
    { japanese: 'きゃ', romaji: 'kya'},
    { japanese: 'にゅ', romaji: 'nyu'},
    { japanese: 'みゅ', romaji: 'myu'},
    { japanese: 'ぎゅ', romaji: 'gyu'},
    { japanese: 'しゃ', romaji: 'sha'},
    { japanese: 'ぴゃ', romaji: 'pya'},
    { japanese: 'りゃ', romaji: 'rya'},
    { japanese: 'みゃ', romaji: 'mya'},
    { japanese: 'しゅ', romaji: 'shu'},
    { japanese: 'ちょ', romaji: 'cho'},
    { japanese: 'きゅ', romaji: 'kyu'},
    { japanese: 'りゅ', romaji: 'ryu'},
    { japanese: 'ひょ', romaji: 'hyo'},
    { japanese: 'りょ', romaji: 'ryo'},
    { japanese: 'じゅ', romaji: 'ju'},
    { japanese: 'きょ', romaji: 'kyo'},
    { japanese: 'じょ', romaji: 'jo'},
    { japanese: 'みょ', romaji: 'myo'},
    { japanese: 'ひゅ', romaji: 'hyu'},
];

const katakanaList = [
    { japanese: 'ア', romaji: 'a' },
    { japanese: 'イ', romaji: 'i' },
    { japanese: 'ウ', romaji: 'u' },
    { japanese: 'エ', romaji: 'e' },
    { japanese: 'オ', romaji: 'o' },
    { japanese: 'カ', romaji: 'ka' },
    { japanese: 'キ', romaji: 'ki' },
    { japanese: 'ク', romaji: 'ku' },
    { japanese: 'ケ', romaji: 'ke' },
    { japanese: 'コ', romaji: 'ko' },
    { japanese: 'サ', romaji: 'sa' },
    { japanese: 'シ', romaji: 'shi' },
    { japanese: 'ス', romaji: 'su' },
    { japanese: 'セ', romaji: 'se' },
    { japanese: 'ソ', romaji: 'so' },
    { japanese: 'タ', romaji: 'ta' },
    { japanese: 'チ', romaji: 'chi' },
    { japanese: 'ツ', romaji: 'tsu' },
    { japanese: 'テ', romaji: 'te' },
    { japanese: 'ト', romaji: 'to' },
    { japanese: 'ナ', romaji: 'na' },
    { japanese: 'ニ', romaji: 'ni' },
    { japanese: 'ヌ', romaji: 'nu' },
    { japanese: 'ネ', romaji: 'ne' },
    { japanese: 'ノ', romaji: 'no' },
    { japanese: 'ハ', romaji: 'ha' },
    { japanese: 'ヒ', romaji: 'hi' },
    { japanese: 'フ', romaji: 'fu' },
    { japanese: 'ヘ', romaji: 'he' },
    { japanese: 'ホ', romaji: 'ho' },
    { japanese: 'マ', romaji: 'ma' },
    { japanese: 'ミ', romaji: 'mi' },
    { japanese: 'ム', romaji: 'mu' },
    { japanese: 'メ', romaji: 'me' },
    { japanese: 'モ', romaji: 'mo' },
    { japanese: 'ヤ', romaji: 'ya' },
    { japanese: 'ユ', romaji: 'yu' },
    { japanese: 'ヨ', romaji: 'yo' },
    { japanese: 'ラ', romaji: 'ra' },
    { japanese: 'リ', romaji: 'ri' },
    { japanese: 'ル', romaji: 'ru' },
    { japanese: 'レ', romaji: 're' },
    { japanese: 'ロ', romaji: 'ro' },
    { japanese: 'ワ', romaji: 'wa' },
    { japanese: 'ヲ', romaji: 'wo' },
    { japanese: 'ン', romaji: 'n' },
    { japanese: 'ガ', romaji: 'ga' },
    { japanese: 'ギ', romaji: 'gi' },
    { japanese: 'グ', romaji: 'gu' },
    { japanese: 'ゲ', romaji: 'ge' },
    { japanese: 'ゴ', romaji: 'go' },
    { japanese: 'ザ', romaji: 'za' },
    { japanese: 'ジ', romaji: 'ji' },
    { japanese: 'ズ', romaji: 'zu' },
    { japanese: 'ゼ', romaji: 'ze' },
    { japanese: 'ゾ', romaji: 'zo' },
    { japanese: 'ダ', romaji: 'da' },
    { japanese: 'ヂ', romaji: 'ji' },
    { japanese: 'ヅ', romaji: 'zu' },
    { japanese: 'デ', romaji: 'de' },
    { japanese: 'ド', romaji: 'do' },
    { japanese: 'バ', romaji: 'ba' },
    { japanese: 'ビ', romaji: 'bi' },
    { japanese: 'ブ', romaji: 'bu' },
    { japanese: 'ベ', romaji: 'be' },
    { japanese: 'ボ', romaji: 'bo' },
    { japanese: 'パ', romaji: 'pa' },
    { japanese: 'ピ', romaji: 'pi' },
    { japanese: 'プ', romaji: 'pu' },
    { japanese: 'ペ', romaji: 'pe' },
    { japanese: 'ポ', romaji: 'po' },
];

function getRandomList(type) {
    let array = [];
    if (type === 'hiragana') {
        array = hiraganaList.sort(() => Math.random() - 0.5);
    } else if (type === 'katakana') {
        array = katakanaList.sort(() => Math.random() - 0.5);
    }
    return array;
}

let currentConnections = {};
let currentRooms = {};

io.on('connection', (socket) => {
    currentConnections[socket.id] = { id: socket.id, name: socket.id.substr(0, 2) };
    console.log('a user connected : ' + socket.id);

    socket.on('disconnecting', () => {
        console.log('user disconnected : ' + socket.id);
        // for in currentRooms object
        for (let roomId in currentRooms) {
            currentRooms[roomId].players.forEach((player, index) => {
                if (player === socket.id) {
                    io.to(roomId).emit('playerDisconnected', currentConnections[socket.id]);
                }
            });
        }
        delete currentConnections[socket.id];
    });

    socket.on('createRoom', (callback) => {
        let roomId = socket.id + "_room";
        console.log('createRoom : ' + roomId);
        socket.join(roomId);
        let room = {
            id: roomId,
            players: [socket.id]
        }
        currentRooms[roomId] = room;
        callback({
            roomId: roomId,
            player: currentConnections[socket.id]
        });
    });

    socket.on('joinRoom', (roomId, callback) => {
        console.log('user ' + socket.id + ' joinRoom : ' + roomId);
        socket.join(roomId);
        currentRooms[roomId].players.push(socket.id);
        let players = [];
        currentRooms[roomId].players.forEach(player => {
            players.push(currentConnections[player]);
            if (player !== socket.id) {
                io.to(player).emit('playerJoined', currentConnections[socket.id]);
            }
        });
        callback(players);
    });

    socket.on('startGame', (roomId, type) => {
        let array = getRandomList(type);
        currentRooms[roomId].startTime = Date.now();
        console.log("startGame : " + roomId + " " + type);
        io.to(roomId).emit('startGame', array);
    });

    socket.on('finishGame', (roomId, player) => {
        console.log("finishGame : " + roomId + " " + player.id);
        let timeDiff = Date.now() - currentRooms[roomId].startTime;
        io.to(roomId).emit('finishGame', player, timeDiff);
    });

});

server.listen(3000, () => {
    console.log('listening on *:3000');
});