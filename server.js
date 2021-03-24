const express = require("express");
const app = express();
const path = require("path");
const cors = require('cors');
const request = require("request");

// add this code
const whitelist = ['https://alamine.herokuapp.com']; // list of allow domain

const corsOptions = {
    origin: function (origin, callback) {
        if (!origin) {
            return callback(null, true);
        }
        if (whitelist.indexOf(origin) === -1) {
            var msg = 'The CORS policy for this site does not ' +
                'allow access from the specified Origin.';
            return callback(new Error(msg), false);
        }
        return callback(null, true);
    }
}
app.use(cors(corsOptions));

app.use(express.static(__dirname + "/dist/E-Librairie"));


app.listen(process.env.PORT || 4200);

app.get("/*", function(req, res) {
    res.sendFile(path.join(__dirname + "/dist/E-Librairie/index.html"));
  });

console.log("App is listenning!");
