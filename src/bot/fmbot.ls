require! {Bot: "ttapi", nconf}

# Load config file
nconf.file { file: 'config.json' }

# Get ourselves a new bot. Attach it to the global scope so we can get at it in node-inspector.
global.bot = new Bot(nconf.get(\Auth), nconf.get(\UserId), nconf.get(\RoomId))

# Songs are awesome. Bop all songs!
bot.on \newsong, !-> bot.bop!

