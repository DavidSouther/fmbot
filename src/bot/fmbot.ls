require! {Bot: "ttapi", nconf}

nconf.argv!
	.env!
	.file { file: 'config.json' }

bot = new Bot(nconf.get(\Auth), nconf.get(\UserId), nconf.get(\RoomId))

bot.on \newsong, !-> bot.vote \up