(function(){
  var Bot, nconf, bot;
  Bot = require('ttapi');
  nconf = require('nconf');
  nconf.argv().env().file({
    file: 'config.json'
  });
  bot = new Bot(nconf.get('Auth'), nconf.get('UserId'), nconf.get('RoomId'));
  bot.on('newsong', function(){
    bot.vote('up');
  });
}).call(this);
