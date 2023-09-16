
var socket = io("http://localhost:3000"); //connecting to socket server


socket.on("receiveMsg", (msg) => { //Subscribing
    console.log("received msg")
    console.log(msg);
    renderMsgToBlock(msg, "receive");
});

var readUserMsg = ()=> {
    var msg = $("#userMsg").val();
    renderMsgToBlock(msg, 'send');
    socket.emit("sendingMsg", msg); //Publishing msg to socket server with unique key 'sendingMsg'
    $("#userMsg").val('');
}

var renderMsgToBlock = (msg, type) => {
    var divTag = $("<div/>").text(msg);
    switch(type) {
        case 'send':
            divTag.addClass("sendMsg")
            break;
        case 'receive' :
            divTag.addClass("receiveMsg")
            break;
    }
    $(".msgBlock").append(divTag);
}