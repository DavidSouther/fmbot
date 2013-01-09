require! {Bot: "ttapi", nconf}

# Load config file
nconf.file { file: 'config.json' }

# Get ourselves a new bot. Attach it to the global scope so we can get at it in node-inspector.
global.bot = new Bot(nconf.get(\Auth), nconf.get(\UserId), nconf.get(\RoomId))

# Songs are awesome. Bop all songs!
bot.on \newsong, !-> bot.bop!

# Set up listeners to jump in and DJ or leave a turntable open
let djing = no
	dj = !->
		bot.roomInfo !(info)->
			# Start DJing if there aren't at least two DJs
			if info.djids.length < 2
				bot.addDj!
				djing := yes
			# Don't take up space we don't need
			else if djing && info.djids.length is 5
				bot.remDj nconf.get(\UserId)
				djing := no

	# These are events where we want to check what's going on in the DJ booth.
	bot.on \roomChanged, dj
	bot.on \add_dj, dj
	bot.on \rem_dj, dj
