
const socket=io("http://localhost:8000");
const messagebody=document.getElementById('mainbody');
const messageinpt=document.getElementById('messageinput');
const messagebox=document.getElementById("message-box");
const sound =new Audio("ting.mp3");

const name=prompt("enter your name");

socket.emit('new-user-joined',name);

//when user send message
messagebox.addEventListener("submit",(e)=>{
  e.preventDefault();
  const message=messageinpt.value
  append(`you:${message}`,"right");
  socket.emit('send',message);
})

const append=(message,position)=>{
 const newuser=document.createElement("div");
 newuser.innerText=message;
 newuser.classList.add("message")
 newuser.classList.add(position);
 messagebody.appendChild(newuser);
 if(position=="left")
 sound.play();


}
//for walcoming user
append(`Welcome ${name}!`,"right");

//when new user joins
socket.on('user-joined',name=>{
append(`${name}:joined chat`,"left");
})

//when user will receive message
socket.on('receive',data=>{
    append(`${data.name}:${data.message}`,"left");
})


//when user leave
socket.on('left',name=>{
 append(`${name} left the chat!`,"left");
})
