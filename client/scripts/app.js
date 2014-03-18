// YOUR CODE HERE:
$(document).ready(function(){
var whoAmI = getUserName();
var message = {
  'username': ''+whoAmI+'',
  'text': 'If a woodchuck could chuck wood how much wood would a wood chuck chuck?',
  'roomname': 'the basement'
};
function getChat(){
$.ajax({
  // always use this url
  url: 'http://localhost:3000/1/classes/chatterbox',
  type: 'GET',
   data: {order : '-createdAt'},
  data: JSON.stringify(message),
  contentType: 'application/json',
  success: function (data) {
    ourData = data;
    ourDataparsed = JSON.parse(data);
      var user;
      var line;
      var rooms = {};
      //this part for our chat lines and room counter
    for (var i = 0; i < ourDataparsed.results.length; i++) {
      //console.log(data.results);
      username = ourDataparsed.results[i]["username"];
      line = ourDataparsed.results[i]["text"];
      room = ourDataparsed.results[i]["roomname"];


      //objectId = data.results[i]["objectId"];

       if ((username === undefined) || (username === null)) {
         username = "";
       }

      if ((line === undefined) || (line === null)) {
        line = "";
      }

      if ((room === undefined) || (room === null)) {
        room = "";
      }


      var usernameId = username.replace(/[^a-zA-Z0-9]+$/, "");
      var usernameId = usernameId.replace("%20", "");

      var line = line.replace(/[^a-zA-Z0-9]+$/, "");
      var line = line.replace("%20", "");
      var room = room.replace(/[^a-zA-Z0-9]+$/, "");
      var room = room.replace("%20", "");

      if (rooms[room] === undefined){
        rooms[room] = 1;
      } else {
        rooms[room] += 1;
      }
// console.log(username);
// console.log(line);
// console.log(room);



      $(".chat").append("<p><span class='userLine' id='" + usernameId + "'><span class='room' id='" + room + "'> [" + room + "] </span><span class='username'>" + username + " : </span><span class='line'>" + line + "</span></span></p>")


      
    }
    var friends = [];
    $('.userLine').on("click", function(){
      var friend = $(this).attr('id');
      
      console.log (friends.indexOf(friend));
      if (friends.indexOf(friend) === -1) {
        friends.push(friend);
        $('#'+ friend).css('fontWeight', 'bold' );
  //      console.log(friends);
        $('.friendList').append('<li>'+ friend + '</li>')
      }
    //  console.log(friend);
//      friends.push(friend);
      
    })


  
    //this part for our roomlist
    for (var key in rooms) {
//      var newKey = key.replace(/[^a-zA-Z0-9]+$/, "");
//      var newKey = newKey.replace("%20", "");

//$('.roomItem').append("<li class='" + key + "'>" + key + " " + rooms[key] + "</li>");
      
      $('.roomItem').append("<li id='" + key + "'>" + key + " (" + rooms[key] + ")</li>");
      //$("#" + key).text(key + " " + "(" + rooms[key] + ")");
    }

    $('.roomItem li').on("click", function() {
        var roomChoice = $(this).attr('id');
        console.log(roomChoice);
        

        ///THIS SECTION DOESN'T WORK.  TO BE CONTINUED.
        $("#"+ roomChoice).each(function(){
          $("#"+ roomChoice).hide();});
   //     $("#" + roomChoice).show();

    })
console.log(rooms);

  },
  error: function (data) {
    // see: https://developer.mozilla.org/en-US/docs/Web/API/console.error
    console.error('chatterbox: Failed to send message');
  } 
});
}

function postChat(message){
$.ajax({
  // always use this url
  url: 'http://localhost:3000/1/classes/chatterbox',
  type: 'POST',
  data: message,
  contentType: 'application/json',
  success: function (data) {
    console.log('chatterbox: Message sent');
  },
  error: function (data) {
    // see: https://developer.mozilla.org/en-US/docs/Web/API/console.error
    console.error('chatterbox: Failed to send message');
  }
});
}
getChat();

function refresh() {
 console.log('hey!');
  $(".smallChat").empty();
  $("ul").empty();
  getChat();
}

$('.refresh').on('click', refresh);

 //Gets Username from URL
function getUserName () {
  var string = window.location.search;
  var myArray = string.split("");

  string = myArray.slice((myArray.indexOf("="))+1).join("");
 // string = string.replace("%20", " ");
  string = string.split("%20").join(" ");

  return string;

}

  //ENTER TEXT MESSAGE!!!!!
$('.submit').on('click', function(){
  message.text = String($('textarea').val());
  $('textarea').val("Say something kewl!!!!");
  postChat(message);
  refresh();
})
$('textarea').on('click', function(){
  $('textarea').val("");
});

});







