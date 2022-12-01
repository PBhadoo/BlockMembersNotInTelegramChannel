async function handleRequest(request) {
  var url = new URL(request.url);
  var path = url.pathname;
  var hostname = url.hostname;
  var stampDate = Date.now();
  var expirestampDate = stampDate + 30;
  var localDate = new Date (stampDate);
  var channel = "-100xxxxxxxxxxx";
  var tg_bot_token = "xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx" // Replace with Telegram Bot Token
  var admin = "xxxxxxxxx";
  
  if (path == '/') {
        var data = JSON.stringify(await request.json());
        var obj = JSON.parse(data);
        // Check if User is in the Channel
        try {
          if (obj.message.from.id != null && obj.message.chat.type == "supergroup" || obj.message.chat.type == "group") {
              var checkifUserInChannel = await fetch("https://api.telegram.org/bot"+tg_bot_token+"/getChatMember?user_id="+obj.message.from.id+"&chat_id="+channel, {
                  method: "GET",
              })
              console.log("Getting Data from Telegram about user")
              if (checkifUserInChannel.ok && obj.message.chat.type == "supergroup" || obj.message.chat.type == "group") {
                  var checkifUserInChanneldata = await checkifUserInChannel.text()
                  var checkifUserInChannelobj = JSON.parse(checkifUserInChanneldata);
                  if (checkifUserInChannelobj.result.status != "left") {
                    console.log("Member is allowed.")
                  } else {
                    var telegram = await fetch("https://api.telegram.org/bot"+tg_bot_token+"/banChatMember?user_id="+obj.message.from.id+"&chat_id="+obj.message.chat.id+"&until_date="+expirestampDate, {method: "GET",})
                    var telegram = await fetch("https://api.telegram.org/bot"+tg_bot_token+"/unbanChatMember?user_id="+obj.message.from.id+"&chat_id="+obj.message.chat.id, {method: "GET",})
                    var telegram1 = await telegram.text()
                    var telegram2 = await fetch("https://api.telegram.org/bot"+tg_bot_token+"/SendMessage?parse_mode=Markdown&disable_web_page_preview=true&chat_id="+obj.message.chat.id+"&text=Ban Request Log\n\n["+obj.message.from.id+"](tg://user?id="+obj.message.from.id+") is kicked from Group because not a Member of the Channel.", {
                        method: "GET",
                    })
                    console.log("Is Not a Channel Member. Is Being Kicked Out")
                  }
              } else {
                  console.log("Empty Request")
              }
          }
        }
        catch {
          console.log("Error Executing Code.")
        }
        //await fetch("https://api.telegram.org/bot"+tg_bot_token+"/SendMessage?parse_mode=HTML&disable_web_page_preview=true&chat_id="+admin+"&text=Bot Log\n\n"+data, { method: "GET",})
        return new Response("OK", {
            status: 200,
            headers: {
                "content-type": "application/json",
            },
        })
  } else {
    return new Response("OK", {
      status: 200,
      headers: {
        'content-type': 'application/json',
      },
    });
  }
}

addEventListener('fetch', event => {
  return event.respondWith(handleRequest(event.request));
});
