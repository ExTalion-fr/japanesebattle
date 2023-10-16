
let socket = null;

let pageStatus = "index";
let roomId = null;
let player = null;
let players = [];
let finishStatus = false;

$(function(){
    window.onload = async (e) => {

        // const socket = io('ws://localhost:8080');
        // socket = io('https://japanesebattle.vercel.app:8080');
        socket = io();

        $("#index-button-create").click(function() {
            socket.emit('createRoom', (repsonse) => {
                $('#page-index').hide();
                $('#page-room').css("display", "flex");
                pageStatus = "room";
                roomId = repsonse.roomId;
                player = repsonse.player;
                $("#room-link").html(roomId);
                players.push(player);
                addPlayerToRoom(player);
            });
        });

        $("#index-button-join").click(function() {
            $('#page-index').hide();
            $('#page-join').css("display", "flex");
            pageStatus = "join";
        });

        $("#join-button").click(function() {
            roomId = $("#join-input").val();
            socket.emit('joinRoom', roomId, (response) => {
                $('#page-join').hide();
                $('#page-room').css("display", "flex");
                pageStatus = "room";
                players = response;
                $("#room-link").html(roomId);
                players.forEach(p => {
                    addPlayerToRoom(p);
                });
            });
        });
        $("#room-button-start").click(function() {
            let type = $("#lettering-choice div.active").attr("data-type");
            socket.emit('startGame', roomId, type);
        });
        $("#game-button-finish").click(function() {
            finish();
        });

        $("#lettering-choice div").click(function() {
            $("#lettering-choice div").removeClass("active");
            $(this).addClass("active");
        });
        $('#popup .popup-button').click(function() {
            $('#popup').hide();
        });

        initializeOnEvents();
    }
});

function initializeOnEvents() {
    socket.on('playerJoined', (p) => {
        players.push(p);
        addPlayerToRoom(p);
    });
    socket.on('startGame', (array) => {
        $('#page-room').hide();
        $('#page-game').css("display", "flex");
        pageStatus = "game";
        array.forEach(letter => {
            addLettering(letter);
        });
        let letterList = $('#item-list');
        letterList.children().each(function() {
            $(this).find("input").on('keypress', function(e) {
                if (e.which === 13) {
                    e.preventDefault();
                    let item = $(this).parent();
                    let romaji = item.attr("data-romaji");
                    if ($(this).val() == romaji) {
                        item.removeClass("incorrect");
                        item.addClass("correct");
                        item.prop("disabled", true);
                    } else {
                        item.addClass("incorrect");
                    }
                    let enabled = false;
                    while (!enabled) {
                        if (item.next().length == 0) {
                            enabled = true;
                        } else if (item.next().hasClass("correct")) {
                            item = item.next();
                        } else {
                            enabled = true;
                        }
                    }
                    if (item.next().length != 0) {
                        item.next().find("input").focus();
                    } else {
                        finish();
                    }
                }
            });
        });
    });
    socket.on('finishGame', (p, timeDiff) => {
        $('#popup').css("display", "flex");
        if (p.id == player.id) {
            $('#popup .popup-title').html(`Vous avez gagné !`);
        } else {
            $('#popup .popup-title').html(`Vous avez perdu !`);
        }
        $('#popup .popup-description').html(`${player.name} a gagné en ${timeDiff} !`);
    });
}

function addPlayerToRoom(p) {
    let playerList = $('#player-list');
    let playerItem = `
        <div data-id="${p.id}" class="player item">
            <span>${p.name}</span>
        </div>`;
    playerList.append(playerItem);
}

function addLettering(letter) {
    let letterList = $('#item-list');
    let letterItem = `
        <div data-lettering="${letter.japanese}" data-romaji="${letter.romaji}" class="item">
            <span class="lettering">${letter.japanese}</span>
            <input type="text" class="btn"/>
        </div>`;
    letterList.append(letterItem);
}

function finish() {
    if (finishStatus) {
        $('#page-index').css("display", "flex");
        $('#page-game').hide();
        pageStatus = "index";
        return;
    }
    let letterList = $('#item-list');
    let canFinish = true;
    letterList.children().each(function() {
        if (!$(this).hasClass("correct")) {
            console.log(false);
            $(this).find("input").focus();
            canFinish = false;
        }
    });
    if (canFinish !== false) {
        socket.emit('finishGame', roomId, player);
        finishStatus = true;
    }
}