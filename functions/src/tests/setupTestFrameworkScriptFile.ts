// eslint-disable-next-line no-unused-vars, import/no-extraneous-dependencies
require('@firebase/testing'); // <--- You want this to be the top guy!!!

// eslint-disable-next-line import/no-extraneous-dependencies, @typescript-eslint/no-var-requires
const functions = require('firebase-functions-test');
// eslint-disable-next-line import/no-extraneous-dependencies, @typescript-eslint/no-var-requires
const { testApp } = require('firebase-functions-test/lib/app');
// eslint-disable-next-line @typescript-eslint/no-var-requires
const admin = require('firebase-admin');

// eslint-disable-next-line import/no-extraneous-dependencies, @typescript-eslint/no-var-requires
const mockdate = require('mockdate');
// eslint-disable-next-line @typescript-eslint/no-var-requires
const parseISO = require('date-fns/parseISO');

mockdate.set(parseISO('2021-06-14T00:00:00Z'));

const projectId = 'compilepc';
process.env.GCLOUD_PROJECT = projectId;
process.env.FIRESTORE_EMULATOR_HOST = 'localhost:8080';

// create testenv for mocking changes
global.testEnv = functions();

global.testEnv.mockConfig({});

admin.initializeApp(testApp().getApp().options);
admin.firestore().settings({
  ignoreUndefinedProperties: true,
});
