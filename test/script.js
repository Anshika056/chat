const socket = io("http://localhost:3000")

socket.on("chat",data=>{
   console.log(data)
})

const form = document.querySelector("form");
const input = document.querySelector(".input");
const messages = document.querySelector(".messages");
const username = prompt("Please enter a nickname: ", "");
 


form.addEventListener("submit",(event)=>{
    event.preventDefault();

    addMessage(username + ": " + input.value);


    socket.emit("chat_message", {                          //send the msg to the server
        message: input.value,
    });

    input.value = "";
    
})

socket.on("user_join", function(data) {
    addMessage(data + " just joined the chat!");
});


socket.on("chat_message", function(data) {
    addMessage(data.username + ": " + data.message);
});

socket.on("user_leave", function(data) {
    addMessage(data + " has left the chat.");
});

addMessage("You have joined the chat as '" + username  + "'.");
  socket.emit("user_join", username);


function addMessage(message) {                                //function to add the message in the ul in form container
    const li = document.createElement("li");
    li.innerHTML = message;
    messages.appendChild(li);
    window.scrollTo(0, document.body.scrollHeight);
}
