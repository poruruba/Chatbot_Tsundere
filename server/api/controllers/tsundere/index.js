'use strict';

const HELPER_BASE = process.env.HELPER_BASE || '../../helpers/';
const Response = require(HELPER_BASE + 'response');
const Redirect = require(HELPER_BASE + 'redirect');

const config = {
  channelAccessToken: process.env.LINE_CHANNEL_ACCESS_TOKEN || '【チャネルアクセストークン】',
  channelSecret: process.env.LINE_CHANNEL_SECRET || '【チャネルシークレット】',
};

const LineUtils = require(HELPER_BASE + 'line-utils');
const app = new LineUtils(config);

const GoogleAssistant = require('./googleassistant');
const deviceCredentials = require('./../../../credentials/devicecredentials.json');

const tsundere = require('./tsundere');

const CREDENTIALS = {
  client_id: deviceCredentials.client_id,
  client_secret: deviceCredentials.client_secret,
  refresh_token: deviceCredentials.refresh_token,
  type: "authorized_user"
};

const assistant = new GoogleAssistant(CREDENTIALS);

app.message(async (event, client) =>{
  var response = await assistant.assist(event.message.text);
  console.log(response);
  var text = response.text;
  if( text.trim() == '' )
    	text = "サポートしていません。";
  var text = tsundere(text);
  console.log(text);

  const echo = { type: 'text', text: text };
  return client.replyMessage(event.replyToken, echo);
});

exports.handler = app.lambda();
