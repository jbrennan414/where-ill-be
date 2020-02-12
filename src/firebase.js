// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: process.env.REACT_APP_API_KEY,
    authDomain: "where-ill-be.firebaseapp.com",
    databaseURL: "https://where-ill-be.firebaseio.com",
    projectId: "where-ill-be",
    storageBucket: "where-ill-be.appspot.com",
    messagingSenderId: process.env.REACT_APP_MESSAGING_SENDER_ID,
    appId: process.env.REACT_APP_APP_ID,
};

export default firebaseConfig;