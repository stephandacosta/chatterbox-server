


var postChat = function (message){
  $.ajax({
    url: 'http://localhost:3000/1/classes/chatterbox',
    type: 'POST',
    data: message,
    contentType: 'application/json',
    success: function (data) {
      console.log('chatterbox: Message sent');
    },
    error: function (data) {
      console.error('chatterbox: Failed to send message');
    }
  });
};


var getChat = function (){
  $.ajax({
    url: 'http://localhost:3000/1/classes/chatterbox',
    type: 'GET',
    contentType: 'application/json',
    success: function (data) {
      console.log(data);
      // parsedData = JSON.parse(data);
      parsedData = data;
      for (var i = 0; i < parsedData.results.length; i++) {
        $('body').append($('<div>'));
        $('body').append($('<div>').text(data));
        $('body').append($('<div>').text("Username :" + parsedData.results[i].username));
        $('body').append($('<div>').text("Text :" + parsedData.results[i].text));
        $('body').append($('<div>').text("roomname :" + parsedData.results[i].roomname));
      }
    },
    error: function (data) {
      console.error('chatterbox: Failed to send message');
    }
  });
};


var testObject = {
    createdAt : "2013-10-07T16:22:03.280Z",
    objectId : "teDOY3Rnpe",
    roomname : "lobby",
    text : "hello",
    updatedAt : "2013-10-07T16:22:03.280Z",
    username : "gary"
};

postChat(JSON.stringify(testObject));

getChat();