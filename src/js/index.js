'use strict'

const dotenv = require('dotenv')
const {DialogFlow} = require('dialogflow')
dotenv.config()
const projectId = 'northernirishparent'
const languageCode = 'en-US' 
const sessionId = 'quickstart-session-id'

//HELP
// https://medium.com/@tzahi/how-to-setup-dialogflow-v2-authentication-programmatically-with-node-js-b37fa4815d89
// https://github.com/googleapis/nodejs-dialogflow#using-the-client-library

//WEBPACK NIGHTMARES
//https://medium.com/@binyamin/creating-a-node-express-webpack-app-with-dev-and-prod-builds-a4962ce51334

export const initSession = () => {
    const getCredentials = () => {
        let privateKey = process.env.DIALOGFLOW_PRIVATE_KEY
        let clientEmail = process.env.DIALOGFLOW_CLIENT_EMAIL
        return {
            credentials: {
                private_key: privateKey,
                client_email: clientEmail
            }
        }
    }
    // Instantiate a DialogFlow client.
    const config = getCredentials();
    const sessionClient = new DialogFlow.SessionsClient(config);
    const sessionPath = sessionClient.sessionPath(projectId, sessionId);

    return {sessionClient, sessionPath};
}

const formatQuery = (query, sessionPath) => {
    return {
        session: sessionPath,
        queryInput: {
            text: {
                text: query,
                languageCode: languageCode,
            }
        }
    }
}

export const askAgent = (query, sessionClient, sessionPath) => {
    const request = formatQuery(query, sessionPath);
    // Send request and log result
    sessionClient
        .detectIntent(request)
        .then(responses => {
            console.log('Detected intent');
            const result = responses[0].queryResult;
            console.log(`  Query: ${result.queryText}`);
            console.log(`  Response: ${result.fulfillmentText}`);
            if (result.intent) {
                console.log(`  Intent: ${result.intent.displayName}`);
            } else {
                console.log(`  No intent matched.`);
            }
            return `<p>${result.fulfillmentText}</p>`;
        })
        .catch(err => {
            console.error('ERROR:', err);
        });

    return "hello end text";
}

