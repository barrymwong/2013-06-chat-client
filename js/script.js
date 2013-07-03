(function() {
  var app = {};
  app.parseUrl = 'https://api.parse.com/1/classes/messages';
  app.timestamp = '1900-01-21T01:01:00.000Z';

  var dataString = 'where={"createdAt":{"$gt":{"__type":"Date","iso":"' + app.timestamp + '"}}}&limit=20&order=-createdAt';

  var pullData = function() {
    $('#main').html('');
    $.ajax({
      url: app.parseUrl,
      data: dataString,
      contentType: 'application/json',
      success: function(data){
        var result = data.results;
        app.timestamp = result[0].createdAt;
        // console.log(data);

        for(var i = 0; i < result.length; i++) {
          var username = $('<a/>').addClass('username').attr('href', '#').text('@' + result[i].username);
          var date = $('<span/>').addClass('date').text(moment().startOf(result[i].createdAt).fromNow());
          var message = $('<div/>').addClass('message').text(result[i].text);
          var template = $('<div/>').addClass('box').append(username).append(date).append(message);
          $('#main').append(template);
        }
      },
      error: function(data) {
        console.log('Ajax request failed');
      }
    });
    setTimeout(function() {
      pullData();
    }, 5000);
  };

  var getUsername = function() {
    var loc = (location.href).split('username=');
    $('#username').text(loc[1]);
    return loc[1];
  };

  var sendData = {
    username: getUsername(),
    text: $('#input-message').val()
  };

  var pushData = function() {
    $.ajax({
      url: app.parseUrl,
      data: sendData,
      contentType: 'application/json',
      success: function(data){
        console.log('sent!');
      },
      error: function(data) {
        console.log('Ajax request failed');
      }
    });
    $('#input-message').val(null).focus();
  };

  var init = function() {
    pullData();
    getUsername();
    $('#form-message').on('submit', function(event) {
      event.preventDefault();
      pushData();
    });
  };
  init();

}());

// if time is newer than last updated time, then request those.
// remove the number of nodes at the bottom equal to the number of new requested