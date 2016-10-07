'use strict';

let util = require('util');
let http = require('http');
let Bot  = require('@kikinteractive/kik');

// Configure the bot API endpoint, details for your bot
let bot = new Bot({
    username: 'surveychicken',
    apiKey: 'ea2ff779-c0cb-4ee8-9e22-377629a80c5d',
    baseUrl: ''
});

bot.updateBotConfiguration();

bot.onTextMessage((message) => {
    message.reply(message.body);
});

// Set up your server and start listening
let server = http
    .createServer(bot.incoming())
    .listen(process.env.PORT || 8080);