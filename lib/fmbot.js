(function() {
  var Bot, nconf;

  Bot = require("ttapi");

  nconf = require("nconf");

  nconf.file({
    file: process.argv[2] || 'config.json'
  }.defaults({
    upvote: 'all'
  }));

  global.bot = new Bot(nconf.get('Auth'), nconf.get('UserId'), nconf.get('RoomId'));

  switch (nconf.get('upvote')) {
    case 'all':
      bot.on('newsong', function() {
        return bot.bop();
      });
      break;
    case 'follow':
      bot.on('update_votes', function(votes) {
        if (votes.room.metadata.upvotes > votes.room.metadata.downvotes) {
          return bot.bop();
        }
      });
  }

  (function(djing) {
    var dj;
    dj = function() {
      return bot.roomInfo(function(info) {
        if (info.djids.length < 2) {
          bot.addDj();
          return djing = true;
        } else if (djing && info.djids.length === 5) {
          bot.remDj(nconf.get('UserId'));
          return djing = false;
        }
      });
    };
    bot.on('roomChanged', dj);
    bot.on('add_dj', dj);
    return bot.on('rem_dj', dj);
  })(false);

}).call(this);
