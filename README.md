# Block Members Not In Telegram Channel

* This is made to work without need of a Server.
* If a user is not subscribed to the specific channel or leaves the channel, they'll be kicked out as soon as they do any activity in the groups.

## Setup

* After deploying script, update the variables, channel id, admin id and bot token.
* Add Bot in both channel and any number of groups.
* Setup webhook to the Workers URL eg. `https://api.telegram.org/botBOTTOKEN/setWebhook?url=https://yourworker.yourworkerhandle.workers.dev&drop_pending_updates=true&max_connections=100`
* Enjoy your Bot.

## Credits

* Telegram API and [Parveen Bhadoo](https://twitter.com/ParveenBhadoo)
