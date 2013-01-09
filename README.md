FMBot
=====

Install dependencies with NPM.

Create a config script.

Start it with node.

Install
-------

`npm i`

Configure
---------

```
echo > config.json <<EOF
{
	"Auth": "AUTH_KEY",
	"UserId": "USER_ID",
	"RoomId": "ROOM_ID",
	"upvote": "all"
}
EOF
```

You can find the params for your room with [this bookmarklet](http://alaingilbert.github.com/Turntable-API/bookmarklet.html).

The bot has two upvote modes, "all" and "follow". In "all", the bot upvotes any new song that plays. In "follow", it waits for more upvotes than downvotes, then upvotes. (This bot is super friendly, and doesn't downvote.) Switch between modes by changing the "upvote" field in the config. Default is "all".


Start
-----

`node lib/fmbot.js`
