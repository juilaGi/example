const chat_1 = document.getElementById("chat_1").contentWindow;
const chat_2 = document.getElementById("chat_2").contentWindow;

sessionStorage.setItem("history", "");

function postMsg (iframe, event) {
    iframe.postMessage(
        {'msg': event.data.msg,
         'sender': event.data.sender,
         'user': event.data.user
        },
        "*"
    );
}

window.addEventListener('message', function (event) {
    postMsg(chat_1, event);
    postMsg(chat_2, event);

    sessionStorage.history += ' -/- ' + event.data.user + ': ' + event.data.msg;
});
