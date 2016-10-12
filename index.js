'use strict';

let mongodb = require('mongodb');
let util = require('util');
let http = require('http');
let Bot = require('@kikinteractive/kik');

// var seedData = [{
//  "user": "codyguha",
//     "canadian_values": {
//         "question01": "Greater acceptance of people who are LGBTQ",
//         "question02": "Give priority to people in crisis abroad",
//         "question03": "Publicly celebrate the role of faith in our collective lives",
//         "question04": "Be required to recruit and hire women so they're equally represented in senior management",
//         "question05": "Prohibit private medical clinics to preserve the principle of equal access",
//         "question06": "Expand policies aimed at improving the situation for Indigenous Canadians",
//         "question07": "More emphasis on a system that rewards hard work and initiative",
//         "question08": "Emphasize economic growth over environmental protection",
//         "question09": "Have more government involvement and regulation of the economy",
//         "question10": "Leave it as the responsibility of parents to work out their own best child care options",
//         "question11": "It should be easier for individual Canadians to make their own end-of-life decisions",
//         "question12": "An overall asset because of its contribution to the Canadian economy",
//         "question13": "Curiosity",
//         "question14": "People who are rich mostly got there through hard work",
//         "question15": "News media do a good job presenting the facts"
//     },
//     "chicken_survey": {
//         "relationship": "It's a guilty pleasure",
//         "detail": "After a night of hard partying",
//         "mood": "😊",
//         "preference": "Double Down",
//         "hungry": "YES!"
//     }
// }]

mongodb.MongoClient.connect(process.env.MONGODB_URI, function(err, db) {

  if (err) throw err;

  var results = db.collection('results');

  // results.insert(seedData, function(err, result) {

  //   if (err) throw err;
  // });

   let bot = new Bot({
    username: process.env.BOT_NAME,
    apiKey: process.env.API_KEY,
    baseUrl: process.env.BASE_URL
  });

  bot.updateBotConfiguration();

  bot.onTextMessage(/Hi$/i, (incoming, next) => {
    bot.getUserProfile(incoming.from)
      .then((user) => {
        const message = Bot.Message.text(`Hello again ${user.firstName}! Please choose a survey to complete.`)
          .addTextResponse(`Chicken Survey`)
          .addTextResponse(`Canadian Values Index`)
          .addTextResponse(`No thanks`)
        incoming.reply(message)
      });
  });
  
  bot.onStartChattingMessage((incoming) => {
    bot.getUserProfile(incoming.from)
      .then((user) => {
        const message = Bot.Message.text(`Hey ${user.firstName}! I am the VC Labs survey bot.  You can complete surveys with me. Please choose a survey to begin.`)
          .addTextResponse(`Chicken Survey`)
          .addTextResponse(`Canadian Values Index`)
          .addTextResponse(`No thanks`)
        incoming.reply(message)
        results.insert({user: user.username})
      });
    
  });

  bot.onScanDataMessage((incoming) => {
    bot.getUserProfile(incoming.from)
      .then((user) => {
        const message = Bot.Message.text(`Hey ${user.firstName}! I am the VC Labs survey bot.  You can complete surveys with me. Please choose a survey to begin.`)
          .addTextResponse(`Chicken Survey`)
          .addTextResponse(`Canadian Values Index`)
          .addTextResponse(`No thanks`)
        incoming.reply(message)
        results.insert({user: user.username})
      });
  });

  bot.onTextMessage(/Chicken$/i, (incoming, next) => {
    bot.getUserProfile(incoming.from)
      .then((user) => {
        const message = Bot.Message.text(`@surveychicken chicken survey`)
        return incoming.reply(message)
      });
  });

  // bot.onTextMessage(/I love it$/i, (incoming, next) => {
  //   bot.getUserProfile(incoming.from)
  //     .then((user) => {
  //       const message = Bot.Message.text(`What is your favourite way to eat fried chicken?`)
  //         .addTextResponse(`I make it myself`)
  //         .addTextResponse(`KFC is my go to`)
  //         .addTextResponse(`Any fried chicken is good chicken`)
  //         .addTextResponse(`It's a secret and I’m not telling you`)
  //       results.update({
  //         user: user.username
  //       }, {
  //         $set: { 
  //           "chicken_survey.relationship": incoming.body
  //         }
  //       })
  //       return incoming.reply(message);
  //     });
  // });

  // bot.onTextMessage(/It's a guilty pleasure$/i, (incoming, next) => {
  //   bot.getUserProfile(incoming.from)
  //     .then((user) => {
  //       const message = Bot.Message.text(`Guilty pleasure you say, tell me more.`)
  //         .addTextResponse(`After a night of hard partying`)
  //         .addTextResponse(`A treat if I’ve been eating good for while`)
  //         .addTextResponse(`It’s a personal matter`)
  //       results.update({
  //         user: user.username
  //       }, {
  //         $set: {
  //           "chicken_survey.relationship": incoming.body
  //         }
  //       })
  //       return incoming.reply(message)
  //     });
  // });

  // bot.onTextMessage(/Not really my thing|I’ll die before I eat fried chicken$/i, (incoming, next) => {
  //   bot.getUserProfile(incoming.from)
  //     .then((user) => {
  //       const message = Bot.Message.text(`So your not a fan eh? Tell us more.`)
  //         .addTextResponse(`Chicken is God’s creature and shouldn’t be eaten`)
  //         .addTextResponse(`Fried food is gross`)
  //         .addTextResponse(`I’m not going to get into it`)
  //       results.update({
  //         user: user.username
  //       }, {
  //         $set: {
  //           "chicken_survey.relationship": incoming.body
  //         }
  //       })
  //       return incoming.reply(message)
  //     });
  // });

  // bot.onTextMessage(/^After a night of hard partying|I’m not going to get into it|Fried food is gross|Chicken is God’s creature and shouldn’t be eaten|A treat if I’ve been eating good for while|It’s a personal matter|I make it myself|KFC is my go to|Any fried chicken is good chicken|It's a secret and I’m not telling you$/i, (incoming, next) => {
  //   bot.getUserProfile(incoming.from)
  //     .then((user) => {
  //       const message = Bot.Message.text(`What is your current mood?`)
  //         .addTextResponse(`😀`)
  //         .addTextResponse(`😊`)
  //         .addTextResponse(`😞`)
  //         .addTextResponse(`😠`)
  //       results.update({
  //         user: user.username
  //       }, {
  //         $set: {
  //           "chicken_survey.detail": incoming.body
  //         }
  //       })
  //       return incoming.reply(message);
  //     });
  // });

  // bot.onTextMessage(/^😀|😊|😞|😠$/i, (incoming, next) => {
  //   bot.getUserProfile(incoming.from)
  //     .then((user) => {
  //       const pic1 = Bot.Message.picture(`http://fiber-international.com/wp-content/uploads/2015/04/800x600-chicken.jpg`)
  //         .setAttributionName('Chicken Parmesan')
  //         .setAttributionIcon('http://icons.iconarchive.com/icons/icons8/ios7/128/Animals-Chicken-icon.png')
  //       const pic2 = Bot.Message.picture(`http://assets.bwbx.io/images/ieMg5BCeWkWU/v1/-1x-1.jpg`)
  //         .setAttributionName('Double Down')
  //         .setAttributionIcon('http://icons.iconarchive.com/icons/icons8/ios7/128/Animals-Chicken-icon.png')
  //       const pic3 = Bot.Message.picture(`https://i.ytimg.com/vi/G8hbFO-r2nQ/maxresdefault.jpg`)
  //         .setAttributionName('Fried Drumsticks')
  //         .setAttributionIcon('http://icons.iconarchive.com/icons/icons8/ios7/128/Animals-Chicken-icon.png')
  //       const pic4 = Bot.Message.picture(`http://www.urbanmommies.com/wp-content/uploads/McDonalds-Chicken-Nuggets.jpg`)
  //         .setAttributionName('Chicken Nuggets')
  //         .setAttributionIcon('http://icons.iconarchive.com/icons/icons8/ios7/128/Animals-Chicken-icon.png')
  //       const message = Bot.Message.text(`Which of these would you like to be eating right now?`)
  //         .addTextResponse('Chicken Parmesan')
  //         .addTextResponse('Double Down')
  //         .addTextResponse('Fried Drumsticks')
  //         .addTextResponse('Chicken Nuggets')
  //       results.update({
  //         user: user.username
  //       }, {
  //         $set: {
  //           "chicken_survey.mood": incoming.body
  //         }
  //       })
  //       return incoming.reply([pic1, pic2, pic3, pic4, message]);
  //     });
  // });

  // bot.onTextMessage(/^Chicken Parmesan|Double Down|Fried Drumsticks|Chicken Nuggets$/i, (incoming, next) => {
  //   bot.getUserProfile(incoming.from)
  //     .then((user) => {
  //       const message = Bot.Message.text(`Have we made you hungry answering these questions?`)
  //         .addTextResponse(`YES!`)
  //         .addTextResponse(`no, I ate`)
  //       results.update({
  //         user: user.username
  //       }, {
  //         $set: {
  //           "chicken_survey.preference": incoming.body
  //         }
  //       })
  //       return incoming.reply(message)
  //     });
  // });

  bot.onTextMessage(/No thanks$/i, (incoming, next) => {
    bot.getUserProfile(incoming.from)
      .then((user) => {
        const message = Bot.Message.text(`ok ${user.firstName}! say "Hi" agian sometime `)
        incoming.reply(message)
      });
  });

 // bot.onTextMessage(/no, I ate|YES!$/i, (incoming, next) => {
 //    bot.getUserProfile(incoming.from)
 //      .then((user) => {
 //        const message = Bot.Message.text(`Thanks for your time. Say "hi" to take another survey.`)
 //        const hifive = Bot.Message.video(`http://media.giphy.com/media/uXNYDeQ20XWSs/giphy.gif`)
 //          .setAttributionName(' ')
 //          .setLoop(true)
 //          .setAutoplay(true)
 //          .setAttributionIcon('http://icons.iconarchive.com/icons/icons8/ios7/128/Animals-Chicken-icon.png')
 //        results.update({
 //          user: user.username
 //        }, {
 //          $set: {
 //            "chicken_survey.hungry": incoming.body
 //          }
 //        })
 //      return incoming.reply([hifive, message])
 //    });
 //  });

  //// CANADIAN VALUES SURVEY

  bot.onTextMessage(/Canadian Values Index$/i, (incoming, next) => {
    bot.getUserProfile(incoming.from)
      .then((user) => {
        const message = Bot.Message.text(`The Angus Reid Institute's national poll conducted in partnership with the CBC identifies five Canadian mindsets when it comes to values.  Please choose one answer for each of the following questions on a broad range of topics in Canadian life.  Your answers will determine with which of the five mindsets you are most aligned.`)
          .addTextResponse(`Get Started`)
          .addTextResponse(`No thanks`)
        return incoming.reply(message)
      });
  });

  bot.onTextMessage(/Get Started$/i, (incoming, next) => {
    bot.getUserProfile(incoming.from)
      .then((user) => {
        const message = Bot.Message.text(`(1/15) Canadian society should work towards...`)
          .addTextResponse(`Greater acceptance of people who are LGBTQ`)
          .addTextResponse(`More recognition of the importance of traditional families where a man is married to a woman`)
        return incoming.reply(message)
      });
  });

  bot.onTextMessage(/Greater acceptance of people who are LGBTQ|More recognition of the importance of traditional families where a man is married to a woman$/i, (incoming, next) => {
    bot.getUserProfile(incoming.from)
      .then((user) => {
        const message = Bot.Message.text(`(2/15) Canada's immigration and refugee policies should...`)
          .addTextResponse(`Give priority to people in crisis abroad`)
          .addTextResponse(`Give priority to Canada's own economic and workforce needs`)
        results.update({
          user: user.username
        }, {
          $set: {
            "canadian_values.question01": incoming.body
          }
        })
        return incoming.reply(message)
      });
  });

  bot.onTextMessage(/^Give priority to people in crisis abroad|Give priority to Canada's own economic and workforce needs$/i, (incoming, next) => {
    bot.getUserProfile(incoming.from)
      .then((user) => {
        const message = Bot.Message.text(`(3/15) In Canada, we should...`)
          .addTextResponse(`Keep God and religion completely out of public life`)
          .addTextResponse(`Publicly celebrate the role of faith in our collective lives`)
        results.update({
          user: user.username
        }, {
          $set: {
            "canadian_values.question02": incoming.body
          }
        })
        return incoming.reply(message)
      });
  });

  bot.onTextMessage(/Keep God and religion completely out of public life|Publicly celebrate the role of faith in our collective lives$/i, (incoming, next) => {
    bot.getUserProfile(incoming.from)
      .then((user) => {
        const message = Bot.Message.text(`(4/15) In the Canadian workplace, Large public companies should...`)
          .addTextResponse(`Be required to recruit and hire women so they're equally represented in senior management`)
          .addTextResponse(`Make their own hiring decisions, even if it means fewer women in senior management`)
        results.update({
          user: user.username
        }, {
          $set: {
            "canadian_values.question03": incoming.body
          }
        })
        incoming.reply(message)
      });
  });

  bot.onTextMessage(/Be required to recruit and hire women so they're equally represented in senior management|Make their own hiring decisions, even if it means fewer women in senior management$/i, (incoming, next) => {
    bot.getUserProfile(incoming.from)
      .then((user) => {
        const message = Bot.Message.text(`(5/15) Regarding health care outside of the public health care system, we should...`)
          .addTextResponse(`Encourage private medical clinics to give Canadians more choice`)
          .addTextResponse(`Prohibit private medical clinics to preserve the principle of equal access`)
        results.update({
          user: user.username
        }, {
          $set: {
            "canadian_values.question04": incoming.body
          }
        })
        return incoming.reply(message)
      });
  });

  bot.onTextMessage(/Encourage private medical clinics to give Canadians more choice|Prohibit private medical clinics to preserve the principle of equal access$/i, (incoming, next) => {
    bot.getUserProfile(incoming.from)
      .then((user) => {
        const message = Bot.Message.text(`(6/15) Canada should...`)
          .addTextResponse(`Expand policies aimed at improving the situation for Indigenous Canadians`)
          .addTextResponse(`Work to remove any special status and programs for Indigenous Canadians`)
        results.update({
          user: user.username
        }, {
          $set: {
            "canadian_values.question05": incoming.body
          }
        })
        return incoming.reply(message)
      });
  });

  bot.onTextMessage(/Expand policies aimed at improving the situation for Indigenous Canadians|Work to remove any special status and programs for Indigenous Canadians$/i, (incoming, next) => {
    bot.getUserProfile(incoming.from)
      .then((user) => {
        const message = Bot.Message.text(`(7/15) There should be...`)
          .addTextResponse(`More public support for the poor, the disadvantaged and those in economic trouble`)
          .addTextResponse(`More emphasis on a system that rewards hard work and initiative`)
        results.update({
          user: user.username
        }, {
          $set: {
            "canadian_values.question06": incoming.body
          }
        })
        return incoming.reply(message)
      });
  });

  bot.onTextMessage(/More public support for the poor, the disadvantaged and those in economic trouble|More emphasis on a system that rewards hard work and initiative$/i, (incoming, next) => {
    bot.getUserProfile(incoming.from)
      .then((user) => {
        const message = Bot.Message.text(`(8/15) Overall, Canada's policies should...`)
          .addTextResponse(`Emphasize environmental protection over economic growth`)
          .addTextResponse(`Emphasize economic growth over environmental protection`)
        results.update({
          user: user.username
        }, {
          $set: {
            "canadian_values.question07": incoming.body
          }
        })
        return incoming.reply(message)
      });
  });

  bot.onTextMessage(/Emphasize environmental protection over economic growth|Emphasize economic growth over environmental protection$/i, (incoming, next) => {
    bot.getUserProfile(incoming.from)
      .then((user) => {
        const message = Bot.Message.text(`(9/15) Overall, it would be better to...`)
          .addTextResponse(`Leave the economy more to the free market`)
          .addTextResponse(`Have more government involvement and regulation of the economy`)
        results.update({
          user: user.username
        }, {
          $set: {
            "canadian_values.question08": incoming.body
          }
        })
        return incoming.reply(message)
      });
  });

  bot.onTextMessage(/Leave the economy more to the free market|Have more government involvement and regulation of the economy$/i, (incoming, next) => {
    bot.getUserProfile(incoming.from)
      .then((user) => {
        const message = Bot.Message.text(`(10/15) On childcare, would you say...`)
          .addTextResponse(`A national child care program is a needed investment in the next generation`)
          .addTextResponse(`Leave it as the responsibility of parents to work out their own best child care options`)
        results.update({
          user: user.username
        }, {
          $set: {
            "canadian_values.question09": incoming.body
          }
        })
        return incoming.reply(message)
      });
  });

  bot.onTextMessage(/A national child care program is a needed investment in the next generation|Leave it as the responsibility of parents to work out their own best child care options$/i, (incoming, next) => {
    bot.getUserProfile(incoming.from)
      .then((user) => {
        const message = Bot.Message.text(`(11/15) When it comes to doctor-assisted dying...`)
          .addTextResponse(`It should be easier for individual Canadians to make their own end-of-life decisions`)
          .addTextResponse(`There should be lots of safeguards restricting access to doctor-assisted death`)
        results.update({
          user: user.username
        }, {
          $set: {
            "canadian_values.question10": incoming.body
          }
        })
        return incoming.reply(message)
      });
  });

  bot.onTextMessage(/It should be easier for individual Canadians to make their own end-of-life decisions|There should be lots of safeguards restricting access to doctor-assisted death$/i, (incoming, next) => {
    bot.getUserProfile(incoming.from)
      .then((user) => {
        const message = Bot.Message.text(`(12/15) Do you think of Canada's oil industry in Alberta and other parts of the country as:`)
          .addTextResponse(`An overall liability because of the environmental risk`)
          .addTextResponse(`An overall asset because of its contribution to the Canadian economy`)
        results.update({
          user: user.username
        }, {
          $set: {
            "canadian_values.question11": incoming.body
          }
        })
        return incoming.reply(message)
      });
  });

  bot.onTextMessage(/An overall liability because of the environmental risk|An overall asset because of its contribution to the Canadian economy$/i, (incoming, next) => {
    bot.getUserProfile(incoming.from)
      .then((user) => {
        const message = Bot.Message.text(`(13/15) Please indicate which one you think is more important for a child to have:`)
          .addTextResponse(`Good manners`)
          .addTextResponse(`Curiosity`)
        results.update({
          user: user.username
        }, {
          $set: {
            "canadian_values.question12": incoming.body
          }
        })
        return incoming.reply(message)
      });
  });

  bot.onTextMessage(/Good manners|Curiosity$/i, (incoming, next) => {
    bot.getUserProfile(incoming.from)
      .then((user) => {
        const message = Bot.Message.text(`(14/15) In terms of individual success, would you say:`)
          .addTextResponse(`People who are rich mostly got there through hard work`)
          .addTextResponse(`People who are rich mostly got there through family connections or luck`)
        results.update({
          user: user.username
        }, {
          $set: {
            "canadian_values.question13": incoming.body
          }
        })
        return incoming.reply(message)
      });
  });

  bot.onTextMessage(/People who are rich mostly got there through hard work|People who are rich mostly got there through family connections or luck$/i, (incoming, next) => {
    bot.getUserProfile(incoming.from)
      .then((user) => {
        const message = Bot.Message.text(`(15/15) In your view:`)
          .addTextResponse(`Most of the stories you see in the news can't be trusted`)
          .addTextResponse(`News media do a good job presenting the facts`)
        results.update({
          user: user.username
        }, {
          $set: {
            "canadian_values.question14": incoming.body
          }
        })
        return incoming.reply(message)
      });
  });

  bot.onTextMessage(/Most of the stories you see in the news can't be trusted|News media do a good job presenting the facts$/i, (incoming, next) => {
    bot.getUserProfile(incoming.from)
      .then((user) => {
        const message = Bot.Message.text(`You are a "Cautious Skeptic".  Click below to read more about your segment`)
        const link = Bot.Message.link(`http://angusreid.org/cautious-skeptics/`)
        results.update({
          user: user.username
        }, {
          $set: {
            "canadian_values.question15": incoming.body
          }
        })
        return incoming.reply([message, link])
      });
  });

  let server = http
    .createServer(bot.incoming())
    .listen(process.env.PORT || 8080);
});