const admin = require('firebase-admin');
const serviceAccount = require('../../../firebaseSecret.json');

class FirebaseApp {
  constructor() {
    // eslint-disable-next-line
    console.log('Firebase::constructor');
    admin.initializeApp({
      credential: admin.credential.cert(serviceAccount),
      databaseURL: 'https://mmcomponents-60e3f.firebaseio.com',
    });

    this.firebaseApp = admin;
  }
}

const firebaseApp = new FirebaseApp();

export default firebaseApp;
