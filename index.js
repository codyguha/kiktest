'use strict';

let mongodb = require('mongodb');
let util = require('util');
let http = require('http');
let Bot = require('@kikinteractive/kik');

var uri = 'mongodb://heroku_w9p37vp9:3huc3hgd51uauubr921v8ctb4l@ds053216.mlab.com:53216/heroku_w9p37vp9';

var seedData = [{
  user: "",
  hungry: "",
  relationship: "",
  detail: "",
  mood: "",
  preference: ""
}]

mongodb.MongoClient.connect(uri, function(err, db) {

  if (err) throw err;

  var results = db.collection('results');

  results.insert(seedData, function(err, result) {

    if (err) throw err;
  });

  let bot = new Bot({
    username: 'vclabs_surveybot',
    apiKey: 'd117253a-66ec-4fbb-a1d5-5b07089d153f',
    baseUrl: 'https://infinite-atoll-38383.herokuapp.com/'
  });

  bot.updateBotConfiguration();

  bot.onTextMessage(/Hi$/i, (incoming, next) => {
    bot.getUserProfile(incoming.from)
      .then((user) => {
        const message = Bot.Message.text(`Hey ${user.firstName}! Please choose a survey to complete.`)
          .addTextResponse(`Chicken`)
          .addTextResponse(`Angus Reid Poll`)
          .addTextResponse(`Another Survey`)
          .addTextResponse(`Another Poll`)
          .addTextResponse(`No thanks`)
        incoming.reply(message)
      });
  });
  

  bot.onStartChattingMessage((incoming) => {
    bot.getUserProfile(incoming.from)
      .then((user) => {
        const message = Bot.Message.text(`Hey ${user.firstName}! I am the VC Labs survey bot.  You can complete surveys with me. Please choose a survey to begin.`)
          .addTextResponse(`Chicken`)
          .addTextResponse(`Angus Reid Poll`)
          .addTextResponse(`Another Survey`)
          .addTextResponse(`Another Poll`)
          .addTextResponse(`No thanks`)
        incoming.reply(message)
      });
  });

  bot.onScanDataMessage((incoming) => {
    bot.getUserProfile(incoming.from)
      .then((user) => {
        const message = Bot.Message.text(`Hey ${user.firstName}! I am the VC Labs survey bot.  You can complete surveys with me. Please choose a survey to begin.`)
          .addTextResponse(`Chicken`)
          .addTextResponse(`Angus Reid Poll`)
          .addTextResponse(`Another Survey`)
          .addTextResponse(`Another Poll`)
          .addTextResponse(`No thanks`)
        incoming.reply(message)
      });
  });

  bot.onTextMessage(/No thanks$/i, (incoming, next) => {
    bot.getUserProfile(incoming.from)
      .then((user) => {
        const message = Bot.Message.text(`ok ${user.firstName}! say "Hi" again sometime `)
        incoming.reply(message)
      });
  });

  bot.onTextMessage(/no, I ate|YES!$/i, (incoming, next) => {
    bot.getUserProfile(incoming.from)
      .then((user) => {
        const message = Bot.Message.text(`Thanks for your time. Say "hi" to take another survey.`)
        const hifive = Bot.Message.video(`http://media.giphy.com/media/uXNYDeQ20XWSs/giphy.gif`)
          .setAttributionName(' ')
          .setLoop(true)
          .setAutoplay(true)
          .setAttributionIcon('http://icons.iconarchive.com/icons/icons8/ios7/128/Animals-Chicken-icon.png')
        results.update({
          user: user.username
        }, {
          $set: {
            hungry: incoming.body
          }
        })
        return incoming.reply([hifive, message])
      });
  });

  bot.onTextMessage(/Chicken$/i, (incoming, next) => {
    bot.getUserProfile(incoming.from)
      .then((user) => {
        const message = Bot.Message.text(`Awesome lets get started. What would you say your relationship is with fried chicken?`)
          .addTextResponse(`I love it`)
          .addTextResponse(`It's a guilty pleasure`)
          .addTextResponse(`Not really my thing`)
          .addTextResponse(`I’ll die before I eat fried chicken`)
        results.insert({
          user: user.username
        })
        return incoming.reply(message)
      });
  });

  bot.onTextMessage(/I love it$/i, (incoming, next) => {
    bot.getUserProfile(incoming.from)
      .then((user) => {
        const message = Bot.Message.text(`What is your favourite way to eat fried chicken?`)
          .addTextResponse(`I make it myself`)
          .addTextResponse(`KFC is my go to`)
          .addTextResponse(`Any fried chicken is good chicken`)
          .addTextResponse(`It's a secret and I’m not telling you`)
        results.update({
          user: user.username
        }, {
          $set: {
            relationship: incoming.body
          }
        })
        return incoming.reply(message);
      });
  });

  bot.onTextMessage(/It's a guilty pleasure$/i, (incoming, next) => {
    bot.getUserProfile(incoming.from)
      .then((user) => {
        const message = Bot.Message.text(`Guilty pleasure you say, tell me more.`)
          .addTextResponse(`After a night of hard partying`)
          .addTextResponse(`A treat if I’ve been eating good for while`)
          .addTextResponse(`It’s a personal matter`)
        results.update({
          user: user.username
        }, {
          $set: {
            relationship: incoming.body
          }
        })
        return incoming.reply(message)
      });
  });

  bot.onTextMessage(/Not really my thing|I’ll die before I eat fried chicken$/i, (incoming, next) => {
    bot.getUserProfile(incoming.from)
      .then((user) => {
        const message = Bot.Message.text(`So your not a fan eh? Tell us more.`)
          .addTextResponse(`Chicken is God’s creature and shouldn’t be eaten`)
          .addTextResponse(`Fried food is gross`)
          .addTextResponse(`I’m not going to get into it`)
        results.update({
          user: user.username
        }, {
          $set: {
            relationship: incoming.body
          }
        })
        return incoming.reply(message)
      });
  });

  bot.onTextMessage(/^After a night of hard partying|I’m not going to get into it|Fried food is gross|Chicken is God’s creature and shouldn’t be eaten|A treat if I’ve been eating good for while|It’s a personal matter|I make it myself|KFC is my go to|Any fried chicken is good chicken|It's a secret and I’m not telling you$/i, (incoming, next) => {
    bot.getUserProfile(incoming.from)
      .then((user) => {
        const message = Bot.Message.text(`What is your current mood?`)
          .addTextResponse(`😀`)
          .addTextResponse(`😊`)
          .addTextResponse(`😞`)
          .addTextResponse(`😠`)
        results.update({
          user: user.username
        }, {
          $set: {
            detail: incoming.body
          }
        })
        return incoming.reply(message);
      });
  });

  bot.onTextMessage(/^😀|😊|😞|😠$/i, (incoming, next) => {
    bot.getUserProfile(incoming.from)
      .then((user) => {
        const pic1 = Bot.Message.picture(`http://fiber-international.com/wp-content/uploads/2015/04/800x600-chicken.jpg`)
          .setAttributionName('Chicken Parmesan')
          .setAttributionIcon('http://icons.iconarchive.com/icons/icons8/ios7/128/Animals-Chicken-icon.png')
        const pic2 = Bot.Message.picture(`http://assets.bwbx.io/images/ieMg5BCeWkWU/v1/-1x-1.jpg`)
          .setAttributionName('Double Down')
          .setAttributionIcon('http://icons.iconarchive.com/icons/icons8/ios7/128/Animals-Chicken-icon.png')
        const pic3 = Bot.Message.picture(`https://i.ytimg.com/vi/G8hbFO-r2nQ/maxresdefault.jpg`)
          .setAttributionName('Fried Drumsticks')
          .setAttributionIcon('http://icons.iconarchive.com/icons/icons8/ios7/128/Animals-Chicken-icon.png')
        const pic4 = Bot.Message.picture(`http://www.urbanmommies.com/wp-content/uploads/McDonalds-Chicken-Nuggets.jpg`)
          .setAttributionName('Chicken Nuggets')
          .setAttributionIcon('http://icons.iconarchive.com/icons/icons8/ios7/128/Animals-Chicken-icon.png')
        const message = Bot.Message.text(`Which of these would you like to be eating right now?`)
          .addTextResponse('Chicken Parmesan')
          .addTextResponse('Double Down')
          .addTextResponse('Fried Drumsticks')
          .addTextResponse('Chicken Nuggets')
        results.update({
          user: user.username
        }, {
          $set: {
            mood: incoming.body
          }
        })
        return incoming.reply([pic1, pic2, pic3, pic4, message]);
      });
  });

  bot.onTextMessage(/^Chicken Parmesan|Double Down|Fried Drumsticks|Chicken Nuggets$/i, (incoming, next) => {
    bot.getUserProfile(incoming.from)
      .then((user) => {
        const message = Bot.Message.text(`Have we made you hungry answering these questions?`)
          .addTextResponse(`YES!`)
          .addTextResponse(`no, I ate`)
        results.update({
          user: user.username
        }, {
          $set: {
            preference: incoming.body
          }
        })
        return incoming.reply(message)
      });
  });

  let server = http
    .createServer(bot.incoming())
    .listen(process.env.PORT || 8080);
});