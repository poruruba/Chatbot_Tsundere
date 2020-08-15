'use strict';

const HELPER_BASE = process.env.HELPER_BASE || '../../helpers/';
const Response = require(HELPER_BASE + 'response');
const Redirect = require(HELPER_BASE + 'redirect');

const GoogleAssistant = require('./googleassistant');
const deviceCredentials = require('./../../../credentials/devicecredentials.json');

const CREDENTIALS = {
  client_id: deviceCredentials.client_id,
  client_secret: deviceCredentials.client_secret,
  refresh_token: deviceCredentials.refresh_token,
  type: "authorized_user"
};

const assistant = new GoogleAssistant(CREDENTIALS);

exports.handler = async (event, context, callback) => {
  if( event.path == '/assistant-talk'){
    var body = JSON.parse(event.body);

    var response = await assistant.assist(body.message);
    console.log(response);
    return new Response({ text: response.text });
  }
};
