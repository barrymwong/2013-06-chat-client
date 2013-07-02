(function() {
  var app = {};
  app.parseUrl = 'https://api.parse.com/1/classes/messages';
  app.timestamp = '1900-01-21T01:01:00.000Z';

  var template = function(username, date, message) {
    var html = '<div class="box">' +
      '<a class="username" href="#">' + username + '</a>' +
      '<span class="date">' + date + '</span>' +
      '<div class="message">' + message + '</div>' +
    '</div>';
    return malString(html) ? '' : html;
  };

  var malString = function(string) {
    return (/<script>/).test(string);
  };

  var dataString = 'where={"createdAt":{"$gt":{"__type":"Date","iso":"' + app.timestamp + '"}}}&limit=20&order=-createdAt';

  var update = function() {
    $('#main').html('');
    $.ajax({
      url: app.parseUrl,
      data: dataString,
      contentType: 'application/json',
      success: function(data){
        var result = data.results;
        if(result[0].date > app.timestamp) {
          app.timestamp = result[0].date;
        }

        for(var i = 0; i < result.length; i++) {
          var username = '@' + result[i].username;
          var date = moment().startOf(result[i].createdAt).fromNow();
          var message = result[i].text;
          $('#main').append(template(username, date, message));
        }
      },
      error: function(data) {
        console.log('Ajax request failed');
      }
    });
    setTimeout(function() {
      update();
    }, 5000);
  };

  var init = function() {
    update();
  };
  init();

}());