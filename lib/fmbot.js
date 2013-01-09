(function(){
  var Bot, nconf;
  Bot = require('ttapi');
  nconf = require('nconf');
  nconf.file({
    file: 'config.json'
  }).defaults({
    upvote: 'all'
  });
  global.bot = new Bot(nconf.get('Auth'), nconf.get('UserId'), nconf.get('RoomId'));
  switch (nconf.get('upvote')) {
  case 'all':
    bot.on('newsong', function(){
      bot.bop();
    });
    break;
  case 'follow':
    bot.on('update_votes', function(votes){
      if (votes.room.metadata.upvotes > votes.room.metadata.downvotes) {
        bot.bop();
      }
    });
  }
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
