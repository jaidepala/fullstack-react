const express = require('express');
const path = require('path');
const generatePassword = require('password-generator');
const mongoose = require("mongoose");

const bodyParser = require("body-parser");
const logger = require("morgan");
const app = express();
const router = express.Router();
const Data = require("./data");

var mongoDB = process.env.MONGODB_URI || "mongodb://heroku_16g77l48:12go9ld1mgc9279p2c8gog7qha@ds117846.mlab.com:17846/heroku_16g77l48";

mongoose.connect(mongoDB, {
    useNewUrlParser: true
});

var db = mongoose.connection;

db.on('error', console.error.bind(console, 'MongoDB connection error:'));

// Serve static files from the React app
// app.use(express.static(path.join(__dirname, 'client/build')));

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(logger("dev"));

router.get('/passwords', (req, res) => {
    const count = 5;

    // Generate some passwords
    const passwords = Array.from(Array(count).keys()).map(i =>
        generatePassword(12, false)
    )

    // Return them as json
    res.json(passwords);
});

router.get("/getData", (req, res) => {

    Data.find((err, resultData) => {

        if (err) return res.json({ success: false, error: err });
        return res.json({ success: true, data: resultData });
    });
});

router.post("/updateData", (req, res) => {
    const { id, update } = req.body;
    
    Data.findOneAndUpdate(id, update, err => {
        if (err) return res.json({ success: false, error: err });
        return res.json({ success: true });
    });
});

router.post("/putData", (req, res) => {

    if(!req.body || req.body == null)
    {
        return res.json({
            success: false,
            params: req.body,
            message: "No Params"
        });
    }

    let data = new Data();

    const id = req.body.id;
    const message = req.body.message;

    if ((!id && id !== 0) || !message) {
        return res.json({
            success: false,
            error: "INVALID INPUTS"
        });
    }
  
    data.message = message;
    data.id = id;
    
    data.save((err, response) => {
        if (err) return res.json({ success: false, error: err });

        return res.json( response );
    });
});

router.delete("/deleteData", (req, res) => {
    const { id } = req.body;
    
    Data.findOneAndDelete(id, (err, response) => {
        if (err) return res.send(err);

        return res.json( response );
    });
});


// router.get('*', (req, res) => {
//     res.sendFile(path.join(__dirname+'/client/build/index.html'));
// });

//production mode
// if(process.env.NODE_ENV === 'production') {
    
    app.use(express.static(path.join(__dirname, 'client/build')));
    
    //
    router.get('*', (req, res) => {
        res.sendfile(path.join(__dirname = 'client/build/index.html'));
    });
// }

app.use("/api", router);

const port = process.env.PORT || 5000;
app.listen(port, () => {

    console.log(`App listening on ${port}, Env: ${process.env.NODE_ENV}`);
});


