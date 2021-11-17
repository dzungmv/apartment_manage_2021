const express = require('express');
const handlebars = require('express-handlebars');
const bodyParser = require('body-parser');
const multiparty = require('multiparty');
const cookieParser = require('cookie-parser');
const expressSession = require('express-session');
const path = require('path');
const app = express();
const PORT = 3000;
const credentials = require('./credentials');
const route = require('./route/index');
const db = require('./config/db')
const initAdmin = require('./config/admin')

db.connect();
app.use(cookieParser((credentials.cookieSecret)))
app.use(expressSession({
    resave: false,
    saveUninitialized: false,
    secret: credentials.cookieSecret,
}))
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static(path.join(__dirname, 'public')));
app.engine('hbs', handlebars({ extname: '.hbs' }));
app.set('view engine', 'hbs');
app.set('views', path.join(__dirname, 'views'));

route(app)

initAdmin.createAdminAccount();

app.listen(PORT, () => {
    console.log(`App listening at http://localhost:${PORT}`);
})

// // Import the functions you need from the SDKs you need
// import { initializeApp } from "firebase/app";
// import { getAnalytics } from "firebase/analytics";
// import { getStorage } from "firebase/storage";
// import { getFirestore } from "firebase/firestore";
// const firebaseConfig = {
//     apiKey: "AIzaSyAwPk8s1gRervzp3J2taU4BmWBBDNu_HkE",
//     authDomain: "advanced-web-2021-2022-tdtu.firebaseapp.com",
//     projectId: "advanced-web-2021-2022-tdtu",
//     storageBucket: "advanced-web-2021-2022-tdtu.appspot.com",
//     messagingSenderId: "565623243106",
//     appId: "1:565623243106:web:d40d2d90c08cd9de5dac3b",
//     measurementId: "G-CB7B985W2N"
// };
// // Initialize Firebase
// const app = initializeApp(firebaseConfig);
// const analytics = getAnalytics(app);
// const db = getFirestore(app);
// async function getCities(db) {
//     const citiesCol = collection(db, 'cities');
//     const citySnapshot = await getDocs(citiesCol);
//     const cityList = citySnapshot.docs.map(doc => doc.data());
//     return cityList;
//   }
