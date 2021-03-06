/**
    Copyright 2014-2015 Amazon.com, Inc. or its affiliates. All Rights Reserved.

    Licensed under the Apache License, Version 2.0 (the "License"). You may not use this file except in compliance with the License. A copy of the License is located at

        http://aws.amazon.com/apache2.0/

    or in the "license" file accompanying this file. This file is distributed on an "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied. See the License for the specific language governing permissions and limitations under the License.
*/

var textHelper = require('textHelper');

var registerEventHandlers = function(eventHandlers, skillContext) {
  'use strict';
  eventHandlers.onSessionStarted = function(sessionStartedRequest, session) {
    // if user said a one shot command that triggered an intent event,
    // it will start a new session, and then we should avoid speaking too many words.
    skillContext.needMoreHelp = false;
  };

  eventHandlers.onLaunch = function(launchRequest, session, response) {
    // Speak welcome message and ask user questions
    // based on whether there are players or not.
    console.log('Expense Tracker Launched');
    var speechText = 'Welcome to Expense Tracker. Opening your diary.';
    var repromptText = textHelper.helpText + 'What do you want to do ?';
    response.ask(speechText, repromptText);
  };

  eventHandlers.onSessionEnded = function(sessionEndedRequest, session) {
    console.log('ExpenseTracker onSessionEnded requestId: ' + sessionEndedRequest.requestId + ', sessionId: ' + session.sessionId);
    // any cleanup logic goes here
  };
};
exports.register = registerEventHandlers;