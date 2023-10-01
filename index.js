const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");

const app = express();

app.use(bodyParser.json());
app.use(express.static('public'));
app.use(bodyParser.urlencoded({
    extended: true
}));

mongoose.connect('mongodb+srv://manan4805be21:<1234>@cluster0.fp5xaca.mongodb.net/', {
    useNewUrlParser: true,
    useUnifiedTopology: true
}).then(() => {``
    console.log('Connected to MongoDB Atlas');
}).catch((err) => {
    console.error(err);
});

const db = mongoose.connection;

db.on('error', () => console.log("Error in Connecting to Database"));
db.once('open', () => console.log("Connected to Database"));

app.post("/sign_up", (req, res) => {
    const email = req.body.email;
    const password = req.body.password;

    const data = {

        "email": email,
        "password": password
    };

    db.collection('users').insertOne(data, (err, result) => {
        if (err) {
            console.error(err);
        } else {
            console.log("Record Inserted Successfully");
            prompt("Record Inserted Successfully");
        }
    });

    return res.redirect('index.html');

});

app.post("/login", (req, res) => {
    const email = req.body.email;
    const password = req.body.password;

    db.collection('users').findOne({ email: email }, (err, user) => {
        if (err) {
            console.error(err);
            return res.status(500).send();
        }
        if (!user) {
            return res.status(404).send();
        }

        if (password === user.password) {
            return res.redirect('front1.html'); //
        } else {
            return res.status(401).send();
        }
    });
});

app.get("/", (req, res) => {
    res.set({
        "Allow-access-Allow-Origin": '*'
    });
    return res.redirect('login.html');
}).listen(3000);

console.log("Listening on PORT 3000");