(function() {
  var template = function(username, date, message) {
    return '<div>' +
      '<a class="username" href="#">' + username + '</a>' +
      '<span class="date">' + date + '</span>' +
      '<div class="message">' + message + '</div>' +
    '</div>';
  };

  $.ajax({
    url: 'https://api.parse.com/1/classes/messages',
    contentType: 'application/json',
    success: function(data){
      for(var i = 0; i < results.length; i++) {
        var username = results[i].username;
        var date = results[i].createdAt;
        var message = results[i].text;
        //$('#main').append(template(results[0], results[0].createdAt, results[0].text));
      }
    },
    error: function(data) {
      console.log('Ajax request failed');
    }
  });
}());