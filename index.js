const express = require('express');
const path = require('path');
const generatePassword = require('password-generator');
var mongoose = require('mongoose');
const app = express();
const router = express.Router();
const Data = require("./data");

var mongoDB = "mongodb://heroku_lmrpjzl2:rcl80on37tt51fet0v2nq09qa4@ds143738.mlab.com:43738/heroku_lmrpjzl2";

mongoose.connect(mongoDB, {
    useNewUrlParser: true
});

var db = mongoose.connection;

db.on('error', console.error.bind(console, 'MongoDB connection error:'));

// Serve static files from the React app
app.use(express.static(path.join(__dirname, 'client/build')));

app.get('/api/passwords', (req, res) => {
    const count = 5;

    // Generate some passwords
    const passwords = Array.from(Array(count).keys()).map(i =>
        generatePassword(12, false)
    )

    // Return them as json
    res.json(passwords);

    console.log(`Sent ${count} passwords`);
});

app.get("/api/getData", (req, res) => {

    Data.find((err, resultData) => {

        console.log('err', err);
        console.log('theData', resultData);

        if (err) return res.json({ success: false, error: err });
        return res.json({ success: true, data: resultData });
    });
});

app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname+'/client/build/index.html'));
});

const port = process.env.PORT || 5000;
app.listen(port);

console.log(`Password generator listening on ${port}`);

