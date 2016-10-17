'use strict';

let mongodb = require('mongodb');
let util = require('util');
let http = require('http');
let Bot = require('@kikinteractive/kik');

var seedData = [{
 "user": "codyguha",
    "canadian_values": {
        "question01": "Greater acceptance of people who are LGBTQ",
        "question02": "Give priority to people in crisis abroad",
        "question03": "Publicly celebrate the role of faith in our collective lives",
        "question04": "Be required to recruit and hire women so they're equally represented in senior management",
        "question05": "Prohibit private medical clinics to preserve the principle of equal access",
        "question06": "Expand policies aimed at improving the situation for Indigenous Canadians",
        "question07": "More emphasis on a system that rewards hard work and initiative",
        "question08": "Emphasize economic growth over environmental protection",
        "question09": "Have more government involvement and regulation of the economy",
        "question10": "Leave it as the responsibility of parents to work out their own best child care options",
        "question11": "It should be easier for individual Canadians to make their own end-of-life decisions",
        "question12": "An overall asset because of its contribution to the Canadian economy",
        "question13": "Curiosity",
        "question14": "People who are rich mostly got there through hard work",
        "question15": "News media do a good job presenting the facts"
    },
    "chicken_survey": {
        "relationship": "It's a guilty pleasure",
        "detail": "After a night of hard partying",
        "mood": "😊",
        "preference": "Double Down",
        "hungry": "YES!"
    }
}]

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

  bot.onTextMessage((incoming, next) => {
        console.log(incoming)
        const link = Bot.Message.link(`https://cfd38084.ngrok.io/testerbubble`)
        incoming.reply(link)
  });

  bot.onLinkMessage((incoming, next) => {
        console.log(incoming)
  });


  // bot.onTextMessage(/Hi$/i, (incoming, next) => {
  //   bot.getUserProfile(incoming.from)
  //     .then((user) => {
  //       const message = Bot.Message.text(`Hello again ${user.firstName}! Please choose a survey to complete.`)
  //         .addTextResponse(`@surveychicken Chicken Survey`)
  //         .addTextResponse(`Canadian Values Index`)
  //         .addTextResponse(`No thanks`)
  //       incoming.reply(message)
  //       console.log(incoming)
  //     });
  // });
  
  // bot.onStartChattingMessage((incoming) => {
  //   bot.getUserProfile(incoming.from)
  //     .then((user) => {
  //       const message = Bot.Message.text(`Hey ${user.firstName}! I am the VC Labs survey bot.  You can complete surveys with me. Please choose a survey to begin.`)
  //         .addTextResponse(`@surveychicken Chicken Survey`)
  //         .addTextResponse(`Canadian Values Index`)
  //         .addTextResponse(`No thanks`)
  //       incoming.reply(message)
  //       results.insert({user: user.username})
  //     });
    
  // });

  // bot.onScanDataMessage((incoming) => {
  //   bot.getUserProfile(incoming.from)
  //     .then((user) => {
  //       const message = Bot.Message.text(`Hey ${user.firstName}! I am the VC Labs survey bot.  You can complete surveys with me. Please choose a survey to begin.`)
  //         .addTextResponse(`@surveychicken Chicken Survey`)
  //         .addTextResponse(`Canadian Values Index`)
  //         .addTextResponse(`No thanks`)
  //       incoming.reply(message)
  //       results.insert({user: user.username})
  //     });
  // });

  // bot.onTextMessage(/^Chicken Survey$/i, (incoming, next) => {
  //   bot.getUserProfile(incoming.from)
  //     .then((user) => {
  //       const message = Bot.Message.text(`ok ${user.firstName}! I will summon the survey chicken for you ! `)
  //       incoming.reply(message)
  //     });
  // });

  // bot.onTextMessage(/No thanks$/i, (incoming, next) => {
  //   bot.getUserProfile(incoming.from)
  //     .then((user) => {
  //       const message = Bot.Message.text(`ok ${user.firstName}! say "Hi" agian sometime `)
  //       incoming.reply(message)
  //     });
  // });

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
        if (incoming.body === `Greater acceptance of people who are LGBTQ`) {
          results.update({
            user: user.username
            }, {
            $set: {
              "canadian_values.q01": 1
            }
          })
        } else {
          results.update({
            user: user.username
            }, {
            $set: {
              "canadian_values.q01": 2
            }
          })
        }
        return incoming.reply(message)
      });
  });

  bot.onTextMessage(/Give priority to people in crisis abroad|Give priority to Canada's own economic and workforce needs$/i, (incoming, next) => {
    bot.getUserProfile(incoming.from)
      .then((user) => {
        const message = Bot.Message.text(`(3/15) In Canada, we should...`)
          .addTextResponse(`Keep God and religion completely out of public life`)
          .addTextResponse(`Publicly celebrate the role of faith in our collective lives`)
        if (incoming.body === `Give priority to people in crisis abroad`) {
          results.update({
            user: user.username
            }, {
            $set: {
              "canadian_values.q02": 1
            }
          })
        } else {
          results.update({
            user: user.username
            }, {
            $set: {
              "canadian_values.q02": 2
            }
          })
        }
        return incoming.reply(message)
      });
  });

  bot.onTextMessage(/Keep God and religion completely out of public life|Publicly celebrate the role of faith in our collective lives$/i, (incoming, next) => {
    bot.getUserProfile(incoming.from)
      .then((user) => {
        const message = Bot.Message.text(`(4/15) In the Canadian workplace, Large public companies should...`)
          .addTextResponse(`Be required to recruit and hire women so they're equally represented in senior management`)
          .addTextResponse(`Make their own hiring decisions, even if it means fewer women in senior management`)
        if (incoming.body === `Keep God and religion completely out of public life`) {
          results.update({
            user: user.username
            }, {
            $set: {
              "canadian_values.q03": 1
            }
          })
        } else {
          results.update({
            user: user.username
            }, {
            $set: {
              "canadian_values.q03": 2
            }
          })
        }
        return incoming.reply(message)
      });
  });

  bot.onTextMessage(/Be required to recruit and hire women so they're equally represented in senior management|Make their own hiring decisions, even if it means fewer women in senior management$/i, (incoming, next) => {
    bot.getUserProfile(incoming.from)
      .then((user) => {
        const message = Bot.Message.text(`(5/15) Regarding health care outside of the public health care system, we should...`)
          .addTextResponse(`Encourage private medical clinics to give Canadians more choice`)
          .addTextResponse(`Prohibit private medical clinics to preserve the principle of equal access`)
        if (incoming.body === `Be required to recruit and hire women so they're equally represented in senior management`) {
          results.update({
            user: user.username
            }, {
            $set: {
              "canadian_values.q04": 1
            }
          })
        } else {
          results.update({
            user: user.username
            }, {
            $set: {
              "canadian_values.q04": 2
            }
          })
        }
        return incoming.reply(message)
      });
  });

  bot.onTextMessage(/Encourage private medical clinics to give Canadians more choice|Prohibit private medical clinics to preserve the principle of equal access$/i, (incoming, next) => {
    bot.getUserProfile(incoming.from)
      .then((user) => {
        const message = Bot.Message.text(`(6/15) Canada should...`)
          .addTextResponse(`Expand policies aimed at improving the situation for Indigenous Canadians`)
          .addTextResponse(`Work to remove any special status and programs for Indigenous Canadians`)
        if (incoming.body === `Encourage private medical clinics to give Canadians more choice`) {
          results.update({
            user: user.username
            }, {
            $set: {
              "canadian_values.q05": 1
            }
          })
        } else {
          results.update({
            user: user.username
            }, {
            $set: {
              "canadian_values.q05": 2
            }
          })
        }
        return incoming.reply(message)
      });
  });

  bot.onTextMessage(/Expand policies aimed at improving the situation for Indigenous Canadians|Work to remove any special status and programs for Indigenous Canadians$/i, (incoming, next) => {
    bot.getUserProfile(incoming.from)
      .then((user) => {
        const message = Bot.Message.text(`(7/15) There should be...`)
          .addTextResponse(`More public support for the poor, the disadvantaged and those in economic trouble`)
          .addTextResponse(`More emphasis on a system that rewards hard work and initiative`)
        if (incoming.body === `Expand policies aimed at improving the situation for Indigenous Canadians`) {
          results.update({
            user: user.username
            }, {
            $set: {
              "canadian_values.q06": 1
            }
          })
        } else {
          results.update({
            user: user.username
            }, {
            $set: {
              "canadian_values.q06": 2
            }
          })
        }
        return incoming.reply(message)
      });
  });

  bot.onTextMessage(/More public support for the poor, the disadvantaged and those in economic trouble|More emphasis on a system that rewards hard work and initiative$/i, (incoming, next) => {
    bot.getUserProfile(incoming.from)
      .then((user) => {
        const message = Bot.Message.text(`(8/15) Overall, Canada's policies should...`)
          .addTextResponse(`Emphasize environmental protection over economic growth`)
          .addTextResponse(`Emphasize economic growth over environmental protection`)
        if (incoming.body === `More public support for the poor, the disadvantaged and those in economic trouble`) {
          results.update({
            user: user.username
            }, {
            $set: {
              "canadian_values.q07": 1
            }
          })
        } else {
          results.update({
            user: user.username
            }, {
            $set: {
              "canadian_values.q07": 2
            }
          })
        }
        return incoming.reply(message)
      });
  });

  bot.onTextMessage(/Emphasize environmental protection over economic growth|Emphasize economic growth over environmental protection$/i, (incoming, next) => {
    bot.getUserProfile(incoming.from)
      .then((user) => {
        const message = Bot.Message.text(`(9/15) Overall, it would be better to...`)
          .addTextResponse(`Leave the economy more to the free market`)
          .addTextResponse(`Have more government involvement and regulation of the economy`)
        if (incoming.body === `Emphasize environmental protection over economic growth`) {
          results.update({
            user: user.username
            }, {
            $set: {
              "canadian_values.q08": 1
            }
          })
        } else {
          results.update({
            user: user.username
            }, {
            $set: {
              "canadian_values.q08": 2
            }
          })
        }
        return incoming.reply(message)
      });
  });

  bot.onTextMessage(/Leave the economy more to the free market|Have more government involvement and regulation of the economy$/i, (incoming, next) => {
    bot.getUserProfile(incoming.from)
      .then((user) => {
        const message = Bot.Message.text(`(10/15) On childcare, would you say...`)
          .addTextResponse(`A national child care program is a needed investment in the next generation`)
          .addTextResponse(`Leave it as the responsibility of parents to work out their own best child care options`)
        if (incoming.body === `Leave the economy more to the free market`) {
          results.update({
            user: user.username
            }, {
            $set: {
              "canadian_values.q09": 1
            }
          })
        } else {
          results.update({
            user: user.username
            }, {
            $set: {
              "canadian_values.q09": 2
            }
          })
        }
        return incoming.reply(message)
      });
  });

  bot.onTextMessage(/A national child care program is a needed investment in the next generation|Leave it as the responsibility of parents to work out their own best child care options$/i, (incoming, next) => {
    bot.getUserProfile(incoming.from)
      .then((user) => {
        const message = Bot.Message.text(`(11/15) When it comes to doctor-assisted dying...`)
          .addTextResponse(`It should be easier for individual Canadians to make their own end-of-life decisions`)
          .addTextResponse(`There should be lots of safeguards restricting access to doctor-assisted death`)
        if (incoming.body === `A national child care program is a needed investment in the next generation`) {
          results.update({
            user: user.username
            }, {
            $set: {
              "canadian_values.q10": 1
            }
          })
        } else {
          results.update({
            user: user.username
            }, {
            $set: {
              "canadian_values.q10": 2
            }
          })
        }
        return incoming.reply(message)
      });
  });

  bot.onTextMessage(/It should be easier for individual Canadians to make their own end-of-life decisions|There should be lots of safeguards restricting access to doctor-assisted death$/i, (incoming, next) => {
    bot.getUserProfile(incoming.from)
      .then((user) => {
        const message = Bot.Message.text(`(12/15) Do you think of Canada's oil industry in Alberta and other parts of the country as:`)
          .addTextResponse(`An overall liability because of the environmental risk`)
          .addTextResponse(`An overall asset because of its contribution to the Canadian economy`)
        if (incoming.body === `It should be easier for individual Canadians to make their own end-of-life decisions`) {
          results.update({
            user: user.username
            }, {
            $set: {
              "canadian_values.q11": 1
            }
          })
        } else {
          results.update({
            user: user.username
            }, {
            $set: {
              "canadian_values.q11": 2
            }
          })
        }
        return incoming.reply(message)
      });
  });

  bot.onTextMessage(/An overall liability because of the environmental risk|An overall asset because of its contribution to the Canadian economy$/i, (incoming, next) => {
    bot.getUserProfile(incoming.from)
      .then((user) => {
        const message = Bot.Message.text(`(13/15) Please indicate which one you think is more important for a child to have:`)
          .addTextResponse(`Good manners`)
          .addTextResponse(`Curiosity`)
        if (incoming.body === `An overall liability because of the environmental risk`) {
          results.update({
            user: user.username
            }, {
            $set: {
              "canadian_values.q12": 1
            }
          })
        } else {
          results.update({
            user: user.username
            }, {
            $set: {
              "canadian_values.q12": 2
            }
          })
        }
        return incoming.reply(message)
      });
  });

  bot.onTextMessage(/Good manners|Curiosity$/i, (incoming, next) => {
    bot.getUserProfile(incoming.from)
      .then((user) => {
        const message = Bot.Message.text(`(14/15) In terms of individual success, would you say:`)
          .addTextResponse(`People who are rich mostly got there through hard work`)
          .addTextResponse(`People who are rich mostly got there through family connections or luck`)
        if (incoming.body === `Good manners`) {
          results.update({
            user: user.username
            }, {
            $set: {
              "canadian_values.q13": 1
            }
          })
        } else {
          results.update({
            user: user.username
            }, {
            $set: {
              "canadian_values.q13": 2
            }
          })
        }
        return incoming.reply(message)
      });
  });

  bot.onTextMessage(/People who are rich mostly got there through hard work|People who are rich mostly got there through family connections or luck$/i, (incoming, next) => {
    bot.getUserProfile(incoming.from)
      .then((user) => {
        const message = Bot.Message.text(`(15/15) In your view:`)
          .addTextResponse(`Most of the stories you see in the news can't be trusted`)
          .addTextResponse(`News media do a good job presenting the facts`)
        if (incoming.body === `People who are rich mostly got there through hard work`) {
          results.update({
            user: user.username
            }, {
            $set: {
              "canadian_values.q14": 1
            }
          })
        } else {
          results.update({
            user: user.username
            }, {
            $set: {
              "canadian_values.q14": 2
            }
          })
        }
        return incoming.reply(message)
      });
  });

  bot.onTextMessage(/Most of the stories you see in the news can't be trusted|News media do a good job presenting the facts$/i, (incoming, next) => {
    bot.getUserProfile(incoming.from)
      .then((user) => {
        if (incoming.body === `Most of the stories you see in the news can't be trusted`) {
          results.update({
            user: user.username
            }, {
            $set: {
              "canadian_values.q15": 1
            }
          })
        } else {
          results.update({
            user: user.username
            }, {
            $set: {
              "canadian_values.q15": 2
            }
          })
        }
        var uservalues = user.username.candian_values
        var segCS = Math.exp(
           1.324777341 * uservalues.q01 +
          -0.439317293 * uservalues.q02 +
          -1.141955791 * uservalues.q03 +
           0.946527238 * uservalues.q04 +
           1.065909437 * uservalues.q05 +
           1.856962384 * uservalues.q06 +
           0.313054006 * uservalues.q07 +
           0.335923336 * uservalues.q08 +
          -0.822735827 * uservalues.q09 +
           1.418703947 * uservalues.q10 +
          -0.705176968 * uservalues.q11 +
          -1.339674474 * uservalues.q12 +
           0.990574065 * uservalues.q13 +
           3.17706193  * uservalues.q14 +
          -3.538568365 * uservalues.q15 +
          -3.687443765);

        var segPR = Math.exp(
           0.360924702 * uservalues.q01 +
          -4.778865322 * uservalues.q02 +
          -0.096688666 * uservalues.q03 +
           1.556509672 * uservalues.q04 +
           2.000184421 * uservalues.q05 +
           0.052231303 * uservalues.q06 +
          -1.892051762 * uservalues.q07 +
           0.873597825 * uservalues.q08 +
          -1.024131769 * uservalues.q09 +
           1.058972973 * uservalues.q10 +
           1.387828058 * uservalues.q11 +
          -1.645821049 * uservalues.q12 +
           4.147904236 * uservalues.q13 +
           2.471886731 * uservalues.q14 +
          -1.551020565 * uservalues.q15 +
          -3.344123223);

        var segFBT = Math.exp(
           1.937264942 * uservalues.q01 +
          -2.782925459 * uservalues.q02 +
           2.014814213 * uservalues.q03 +
           1.738605214 * uservalues.q04 +
           0.59702853  * uservalues.q05 +
           0.847449727 * uservalues.q06 +
          -0.706492853 * uservalues.q07 +
           1.961100828 * uservalues.q08 +
          -1.677824254 * uservalues.q09 +
           1.768624728 * uservalues.q10 +
           3.445928658 * uservalues.q11 +
          -0.138628647 * uservalues.q12 +
           0.746561782 * uservalues.q13 +
           1.871286665 * uservalues.q14 +
          -2.419686983 * uservalues.q15 +
          -11.1287024);

        var segFEE = Math.exp(
           1.029244103 * uservalues.q01 +
          -1.496981598 * uservalues.q02 +
          -1.196622034 * uservalues.q03 +
           2.94630191  * uservalues.q04 +
          -0.551662564 * uservalues.q05 +
           1.775545107 * uservalues.q06 +
           1.01564184  * uservalues.q07 +
           1.850206979 * uservalues.q08 +
          -2.918294699 * uservalues.q09 +
           2.858187827 * uservalues.q10 +
          -0.233789783 * uservalues.q11 +
           0.454961524 * uservalues.q12 +
           2.491671372 * uservalues.q13 +
           0.997044403 * uservalues.q14 +
          -1.273910456 * uservalues.q15 +
          -10.76338147);

          console.log("segCS: " + segCS)
          console.log("segPR: " + segPR)
          console.log("segFBT: " + segFBT)
          console.log("segFEE: " + segFEE)
        //Highest scoring segment wins!   Output the right text.
          switch(Math.max(segCS, segPR, segFBT, segFEE, 1)) {
            case segCS:
              const message = Bot.Message.text(`You are a Cautious Skeptic!`)
              return incoming.reply(message)
              break;
            case segPR:
              const message = Bot.Message.text(`You are a Permissive Reformer!`)
              return incoming.reply(message)
              break;
            case segFBT:
              const message = Bot.Message.text(`You are a Faith Based Traditionalist!`)
              return incoming.reply(message)
              break;
            case segFEE:
              const message = Bot.Message.text(`You are a Free Enterprise Enthusiast!`)
              return incoming.reply(message)
              break;
            case 1:
              const message = Bot.Message.text(`Public Sector Proponent!`)
              return incoming.reply(message)
              break;
            default:
              const message = Bot.Message.text(`oops!`)
              return incoming.reply(message)
              break;
            }
      });
  });

function calcClassification() {
        //Load responses into variables, we allready know we've got all of them
        var q5 = $('input[name=Q5]').filter(':checked').val();
        var q7 = $('input[name=Q7]').filter(':checked').val();
        var q8 = $('input[name=Q8]').filter(':checked').val();
        var q9 = $('input[name=Q9]').filter(':checked').val();
        var q10 = $('input[name=Q10]').filter(':checked').val();
        var q11 = $('input[name=Q11]').filter(':checked').val();
        var q12 = $('input[name=Q12]').filter(':checked').val();
        var q13 = $('input[name=Q13]').filter(':checked').val();
        var q14 = $('input[name=Q14]').filter(':checked').val();
        var q15 = $('input[name=Q15]').filter(':checked').val();
        var q16 = $('input[name=Q16]').filter(':checked').val();
        var q21 = $('input[name=Q21]').filter(':checked').val();
        var q36 = $('input[name=Q36]').filter(':checked').val();
        var q37b = $('input[name=Q37b]').filter(':checked').val();
        var q37d = $('input[name=Q37d]').filter(':checked').val();

        //Apply the equation for each segment, remember the 4 of these are relative to the last segment (which =1)

        var segCS = Math.exp(
           1.324777341 * q5 +
          -0.439317293 * q7 +
          -1.141955791 * q8 +
           0.946527238 * q9 +
           1.065909437 * q10 +
           1.856962384 * q11 +
           0.313054006 * q12 +
           0.335923336 * q13 +
          -0.822735827 * q14 +
           1.418703947 * q15 +
          -0.705176968 * q16 +
          -1.339674474 * q21 +
           0.990574065 * q36 +
           3.17706193  * q37b +
          -3.538568365 * q37d +
          -3.687443765);

        var segPR = Math.exp(
           0.360924702 * q5 +
          -4.778865322 * q7 +
          -0.096688666 * q8 +
           1.556509672 * q9 +
           2.000184421 * q10 +
           0.052231303 * q11 +
          -1.892051762 * q12 +
           0.873597825 * q13 +
          -1.024131769 * q14 +
           1.058972973 * q15 +
           1.387828058 * q16 +
          -1.645821049 * q21 +
           4.147904236 * q36 +
           2.471886731 * q37b +
          -1.551020565 * q37d +
          -3.344123223);

        var segFBT = Math.exp(
           1.937264942 * q5 +
          -2.782925459 * q7 +
           2.014814213 * q8 +
           1.738605214 * q9 +
           0.59702853  * q10 +
           0.847449727 * q11 +
          -0.706492853 * q12 +
           1.961100828 * q13 +
          -1.677824254 * q14 +
           1.768624728 * q15 +
           3.445928658 * q16 +
          -0.138628647 * q21 +
           0.746561782 * q36 +
           1.871286665 * q37b +
          -2.419686983 * q37d +
          -11.1287024);

        var segFEE = Math.exp(
           1.029244103 * q5 +
          -1.496981598 * q7 +
          -1.196622034 * q8 +
           2.94630191  * q9 +
          -0.551662564 * q10 +
           1.775545107 * q11 +
           1.01564184  * q12 +
           1.850206979 * q13 +
          -2.918294699 * q14 +
           2.858187827 * q15 +
          -0.233789783 * q16 +
           0.454961524 * q21 +
           2.491671372 * q36 +
           0.997044403 * q37b +
          -1.273910456 * q37d +
          -10.76338147);

          //Highest scoring segment wins!   Output the right text.
          switch(Math.max(segCS, segPR, segFBT, segFEE, 1)) {
            case segCS:
              document.getElementById("classification").innerHTML = "<span class='result'>You're a <b>Cautious Skeptic</b>!</span><br>" + "<a href='https://www.facebook.com/' target='_blank'><img src='http://angusreidorg.staging.wpengine.com/wp-content/uploads/2016/09/facebook.png' alt='Share your results'></a> <a href='https://twitter.com/intent/tweet?text=I%27m%20a%20Cautious%20Skeptic!%20Take%20the%20test%20for%20yourself.&url=http://angusreid.org/canadian-values-index/' target='_blank'><img src='http://angusreidorg.staging.wpengine.com/wp-content/uploads/2016/10/share-twitter-button-01-e1475170529219.png' alt='Tweet your results'></a>" + "<h4>Click below to read more about your segment...</h4>";
              break;
            case segPR:
              document.getElementById("classification").innerHTML = "<span class='result'>You're a <b>Permissive Reformer</b>!</span><br>" + "<a href='https://www.facebook.com/' target='_blank'><img src='http://angusreidorg.staging.wpengine.com/wp-content/uploads/2016/09/facebook.png' alt='Share your results'></a> <a href='https://twitter.com/intent/tweet?text=I%27m%20a%20Permissive%20Reformer!%20Take%20the%20test%20for%20yourself.&url=http://angusreid.org/canadian-values-index/' target='_blank'><img src='http://angusreidorg.staging.wpengine.com/wp-content/uploads/2016/10/share-twitter-button-01-e1475170529219.png' alt='Tweet your results'></a>" + "<h4>Click below to read more about your segment...</h4>";
              break;
            case segFBT:
              document.getElementById("classification").innerHTML = "<span class='result'>You're a <b>Faith Based Traditionalist</b>!</span><br>" + "<a href='https://www.facebook.com/' target='_blank'><img src='http://angusreidorg.staging.wpengine.com/wp-content/uploads/2016/09/facebook.png' alt='Share your results'></a> <a href='https://twitter.com/intent/tweet?text=I%27m%20a%20Faith%20Based%20Traditionalist!%20Take%20the%20test%20for%20yourself.&url=http://angusreid.org/canadian-values-index/' target='_blank'><img src='http://angusreidorg.staging.wpengine.com/wp-content/uploads/2016/10/share-twitter-button-01-e1475170529219.png' alt='Tweet your results'></a>" + "<h4>Click below to read more about your segment...</h4>";
              break;
            case segFEE:
              document.getElementById("classification").innerHTML = "<span class='result'>You're a <b>Free Enterprise Enthusiast</b>!</span><br>" + "<a href='https://www.facebook.com/' target='_blank'><img src='http://angusreidorg.staging.wpengine.com/wp-content/uploads/2016/09/facebook.png' alt='Share your results'></a> <a href='https://twitter.com/intent/tweet?text=I%27m%20a%20Free%20Enterprise%20Enthusiast!%20Take%20the%20test%20for%20yourself.&url=http://angusreid.org/canadian-values-index/' target='_blank'><img src='http://angusreidorg.staging.wpengine.com/wp-content/uploads/2016/10/share-twitter-button-01-e1475170529219.png' alt='Tweet your results'></a>" + "<h4>Click below to read more about your segment...</h4>";
              break;
            case 1:
              document.getElementById("classification").innerHTML = "<span class='result'>You're a <b>Public Sector Proponent</b>!</span><br>" + "<a href='https://www.facebook.com/' target='_blank'><img src='http://angusreidorg.staging.wpengine.com/wp-content/uploads/2016/09/facebook.png' alt='Share your results'></a> <a href='https://twitter.com/intent/tweet?text=I%27m%20a%20Public%20Sector%20Proponent!%20Take%20the%20test%20for%20yourself.&url=http://angusreid.org/canadian-values-index/' target='_blank'><img src='http://angusreidorg.staging.wpengine.com/wp-content/uploads/2016/10/share-twitter-button-01-e1475170529219.png' alt='Tweet your results'></a>" + "<h4>Click below to read more about your segment...</h4>";
              break;
            default:
              document.getElementById("classification").innerHTML = "You shouldn't see this result";
              break;
            }
  //document.getElementById("classification").innerHTML = ad;
          }


  let server = http
    .createServer(bot.incoming())
    .listen(process.env.PORT || 8080);
});