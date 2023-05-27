const socket = io();
let Name;
let textArea = document.querySelector('#textarea');
let messageArea = document.querySelector('.message__area');

do{
    Name = prompt('Please enter your name: ')
}while(!Name);

document.addEventListener('keyup',(e)=>{
    if(e.key == 'Enter') {
        const msgObj = {
            name: Name,
            message: e.target.value.trim()
        }
        sendMessage(msgObj);
        textArea.value ='';
    }
})

function sendMessage(msgObj) {
    appendMessage(msgObj,'outgoing');
    scrollToBottom();
    socket.emit('message', msgObj);

}

function appendMessage(msgObj, type) {
    const {name, message} = msgObj;
    const mainDiv = document.createElement('div');
    let className = type;
    mainDiv.classList.add(className,'message');
    const markup = `
    <h4>${name}</h4>
    <p>${message.trim()}</p>`;
   mainDiv.innerHTML = markup;
   messageArea.appendChild(mainDiv);
}

socket.on('message',(msgObj)=>{
    appendMessage(msgObj,'incoming');
    scrollToBottom();
})

function scrollToBottom() {
    messageArea.scrollTop = messageArea.scrollHeight;
}