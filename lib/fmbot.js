(function(){
  var Bot, nconf;
  Bot = require('ttapi');
  nconf = require('nconf');
  nconf.file({
    file: 'config.json'
  });
  global.bot = new Bot(nconf.get('Auth'), nconf.get('UserId'), nconf.get('RoomId'));
  bot.on('newsong', function(){
    bot.bop();
  });
  (function(djing){
    var dj;
    dj = function(){
      bot.roomInfo(function(info){
        if (info.djids.length < 2) {
          bot.addDj();
          djing = true;
        } else if (djing && info.djids.length === 5) {
          bot.remDj(nconf.get('UserId'));
          djing = false;
        }
      });
    };
    bot.on('roomChanged', dj);
    bot.on('add_dj', dj);
    bot.on('rem_dj', dj);
  }.call(this, false));
}).call(this);
