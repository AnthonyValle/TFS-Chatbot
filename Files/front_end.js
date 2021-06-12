let bootstrap = document.createElement('link')
bootstrap.setAttribute('rel', 'stylesheet')
bootstrap.setAttribute('href', 'https://stackpath.bootstrapcdn.com/bootstrap/3.4.1/css/bootstrap.min.css')
bootstrap.setAttribute('crossorgin', 'anonymous')
document.body.appendChild(bootstrap)

let data = document.createElement('script')
data.setAttribute('src','data.js')
document.body.appendChild(data)

let css = document.createElement('link');
css.setAttribute('href', 'chatbot.css')
css.setAttribute('rel','stylesheet')
document.body.appendChild(css);

let chat_bot_div = document.createElement('div');
chat_bot_div.setAttribute('id', 'c_div')
document.body.appendChild(chat_bot_div);
chat_bot_div.style.display = 'none'

let x_div = document.createElement('div');
x_div.setAttribute('id','x_div')
document.getElementById('c_div').appendChild(x_div);

let chat_bot = document.createElement('div');
chat_bot.setAttribute('id', 'c')
document.getElementById('c_div').appendChild(chat_bot);

let exit = document.createElement('button')
exit.setAttribute('onclick', 'openbutton()')
exit.setAttribute('id', 'x_button')
exit.setAttribute("class","btn btn-default")
exit.innerHTML = 'X'
document.getElementById('x_div').appendChild(exit);

let form = document.createElement('form');
form.setAttribute('action','#')
form.setAttribute('onsubmit', 'chat();return false')
form.setAttribute('id', 'form')
document.getElementById('c_div').appendChild(form);

let input_box = document.createElement('input');
let input_submit = document.createElement('input');
input_box.setAttribute('id','submit_input')
input_box.setAttribute('class','form-control')
input_submit.setAttribute('id','submit_button')
input_submit.setAttribute('type', 'submit')
input_submit.setAttribute("class","btn btn-default")
input_submit.setAttribute('value', 'Chat')
document.getElementById('form').appendChild(input_box);
document.getElementById('form').appendChild(input_submit);

let chatbutton = document.createElement('div');
chatbutton.setAttribute('id','chatbutton')
document.body.appendChild(chatbutton);

let chatbutton_button = document.createElement('button');
chatbutton_button.setAttribute('id','chatbutton_button')
chatbutton_button.setAttribute('class','btn btn-default')
chatbutton_button.setAttribute('onclick','closebutton()')
chatbutton_button.innerHTML = "Lets Chat"
document.getElementById('chatbutton').appendChild(chatbutton_button);



function scroll(){
  let elem = document.getElementById('c');
  elem.scrollTop = elem.scrollHeight;
}


function closebutton() {

  chatbutton.style.display = 'none'

  chat_bot_div.style.display = 'block'
}

function openbutton() {
  chatbutton.style.display = 'block'

  chat_bot_div.style.display = 'none'
}

let chatbot_js = document.createElement('script')
chatbot_js.setAttribute('src','Chatbot.js')
document.body.appendChild(chatbot_js)
