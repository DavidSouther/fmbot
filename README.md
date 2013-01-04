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
	"Auth": "auth+live+$YOUR_AUTH_KEY",
	"UserId": "$USER_ID",
	"RoomId": "$ROOM_ID"
}
EOF
```

You can find the params for your room with [this bookmarklet](http://alaingilbert.github.com/Turntable-API/bookmarklet.html).


Start
-----

`node lib/fmbot.js`
