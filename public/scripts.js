var myname = "";
var id = "";
var socket = io();
var typing = 0;
var stilltying = false;
var listOfUsers = [];
var typer = "";
var firsttyper = true;
var conversations = [];
var typingtext = " is typing...";
var mesId = 0;
var oldmessages = [];
var muyli
var socket = io();

$(document).ready(function () {
    $('#inputName').submit(function () {
        for (var i = 0; i < 10; ++i) {
            id += (Math.floor((Math.random() * 9) + 0)).toString();
        }


        socket.on('user login', function (msg) {
            
            $("#title").text(myname);
            $("#inputName").hide();
            $(".container").show();
            listOfUsers = [];
            $(".otherUser").remove();
            for (var i = 0; i < msg.length; ++i) {
                if (!listOfUsers.includes(msg[i]) && msg[i] != myname) {
                    listOfUsers.push(msg[i]);
                    $('#activeUsers').prepend("<div class='otherUser'><h3 id='User'>" + msg[i] + "</h3></div>");
                }
            }
        });

        socket.on("already used", function (msg) {
            if (msg.id == id && msg.name == myname) {
                alert("username is already taken!");
            }
        });


        socket.on('typing', function (msg) {

            if (msg.id != id && msg.name != myname || (msg.id != id && msg.name == myname)) {
                $("#typing").remove();
                clearInterval(typing);
                if (!typer.includes(msg.name)) {
                    if (firsttyper == true) {
                        firsttyper = false;
                        typer += msg.name;
                    } else {
                        typingtext = " are typing...";
                        typer += " & " + msg.name;
                    }
                }
                $('#messages').append("<h5 id='typing'>" + typer + typingtext + "</h5>");
                typing = setInterval(function () { $("#typing").remove(); }, 1000);
            }
        });

        socket.on('chat message', function (msg) {
            $("#messagesHolder").scrollTop($("#messagesHolder")[0].scrollHeight);
            if (msg.id == id && msg.name == myname) {
                publicChat('myMess', "<b>Me</b>: " + msg.message);
            } else {
                typer = "";
                firsttyper = true;
                typingtext = " is typing...";
                $("#typing").remove();
                publicChat('othersMess', "<b>" + msg.name + "</b>: " + msg.message);
            }
        });

        socket.on('oldmessages', function (data) {
            if (data.sender.id == id && data.sender.name == myname) {
                for (var i = 0; i < data.messages.length; ++i) {
                    publicChat('othersMess', "<b>" + data.messages[i].name + "</b>: " + data.messages[i].message);
                }
            }
        });

        myname = $("#username").val();
        $(".myname").text(myname);
        socket.emit('user login', { id: id, name: myname });
        socket.emit('oldmessages', { id: id, name: myname })
        return false;
    });

    $('#chatbox').submit(function (e) {
        e.preventDefault();
        if ($('#m').val() != "") {
            socket.emit('chat message', { id: id, name: myname, message: $('#m').val() });
            $('#m').val('');
        }
    });
});

$(document).ready(function () {
    $('#m').keydown(function () {
        socket.emit('typing', { id: id, name: myname, type: "public" });
    });
});

$(document).on('keydown', "#m2", function () {
    socket.emit('typing', { id: id, name: myname, receipient: $(this).closest("div").closest("div").attr("id"), type: "private" });
});



$(window).on('beforeunload', function () {
    socket.emit('logout', { id: id, name: myname });
});

function publicChat(divType, message) {
    $('#messages').append("<div id='mesDivHolder'><div class='newMes' id='" + divType + "'><h5 id='me'>" + message + "</h5></div><div>");
}


