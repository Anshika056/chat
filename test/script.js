const socket = io("http://localhost:3000")

socket.on("chat",data=>{
   console.log(data)
})

const form = document.querySelector("form");
const input = document.querySelector(".input");
const messages = document.querySelector(".messages");


form.addEventListener("submit",(event)=>{
    event.preventDefault();

    socket.emit("chat_message", {                          //send the msg to the server
        message: input.value
    });

    input.value = "";
})

socket.on("chat_message", function(data) {
    addMessage(data.message);
});



function addMessage(message) {                                //function to add the message in the ul in form container
    const li = document.createElement("li");
    li.innerHTML = message;
    messages.appendChild(li);
    window.scrollTo(0, document.body.scrollHeight);
}
