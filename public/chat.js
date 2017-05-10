const container = document.getElementById("container");
const form = document.getElementById("form");
const dialog = document.getElementById('dialog');
const elMsg =  document.getElementById("msg");
const sender = document.getElementsByTagName('body')[0].className;

form.onsubmit = function () {
    const user = document.getElementById('user').value;
    const msg = elMsg.value;

    if (user == '') {
        alert('Необходимо заполнить поле User');
        return false;
    } else if (msg == '') {
        return false;
    } else {
        top.postMessage(
            {'msg': msg,
             'sender': sender,
             'user': user
            },
            "*"
        );
        return false;
    }
};

window.addEventListener('message', function (event) {
    let prepareMsg = perpareMessage(event.data.msg);
    let message;
    if (event.data.sender === sender) {
        message = '<div class="sent" style="text-align: right">' + prepareMsg + '</div>';
    } else {
        const user = document.getElementById('user').value;
        prepareMsg = prepareMsg.replace(RegExp('\\b' + user + '\\b', 'g'), "<b>" + user + "</b>");
        message = '<div><div class="sender">' + event.data.user + ':</div> <div class="inbox">'
            + prepareMsg + '</div></div>';
    }

    dialog.innerHTML += message;
    elMsg.value = '';
    container.scrollTop = container.scrollHeight;
});

/**
 * Заменяет названия emoji на коды в тексте сообщения.
 *
 * @param {String}
 * @return {String}
 */
function perpareMessage (msg) {
    const emoji = {
        smile: '&#128522',
        lol: '&#128514',
        kiss: '&#128573',
        sad: '&#128530',
        angry: '&#128545'
    };
    let prepareMsg = msg;
    for (var key in emoji) {
        prepareMsg = prepareMsg.replace(RegExp(key, 'g'), emoji[key]);
    }
    return prepareMsg;
}

/**
 * Устанавливает отправку формы нажатием на Shift + Enter.
 *
 * @param {Object}
 */
function submitKey (event) {
    if (event.shiftKey && (event.keyCode == 13)) {
        document.getElementById('form').onsubmit();
    }
}
