if (!window.WebSocket) {
	document.body.innerHTML = 'WebSocket в этом браузере не поддерживается.';
}

var key = "JKjiu76%dfDrte356erjyt%iuyfiuyoliu&jk";
function Senddata() {
  this.key;
  this.id_client;
  this.ticker;
  this.request;
  this.source;
  this.type_data;
  //this.data;
}
var senddata = new Senddata();

// создать подключение
var socket = new WebSocket("ws://137.74.1.130:8081");

// отправить сообщение из формы publish
document.forms.publish.onsubmit = function() {
  var outgoingMessage = this.message.value;
	
	senddata['ticker']=outgoingMessage;
	senddata['request']="reqdata";
	senddata['source']="integral";
	senddata['type_data']="realtime";
  socket.send(JSON.stringify(senddata));
  return false;
};

//остановить
function stopquotes(){
	senddata['ticker']=document.getElementById('ticker').value;
	senddata['request']="canceldata";
	senddata['source']="integral";
	senddata['type_data']="realtime";
	socket.send(JSON.stringify(senddata));
}

var id_client;

// обработчик входящих сообщений
socket.onmessage = function(event) {
	var incomingMessage = event.data;
	var jp = JSON.parse(incomingMessage);
	//проверяем ключ
	if (jp['key']!=key) return;
	//connect
	if (jp['request'] == "connect") {
		senddata['id_client']=jp['id_client']; //присвиваем id клиента элементу структуры
		senddata['key']=key;
		showMessage("Connect OK");
	}
	//получаем данные
	if (jp['request']=="data") {
		//console.log(incomingMessage);
		var otta="Symbol: "+jp['ticker']+" Time: "+jp['tradetime']+" Bid: "+jp['bid']+" Askl: "+jp['ask'];
  //showMessage(jp['id_client']+" "+jp['kom']);
	document.getElementById('subscribe').innerHTML=otta;
	}
  
};

// показать сообщение в div#subscribe
function showMessage(message) {
  var messageElem = document.createElement('div');
  messageElem.appendChild(document.createTextNode(message));
  document.getElementById('subscribe').appendChild(messageElem);
}
