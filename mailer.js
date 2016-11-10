var nodemailer = require('nodemailer');
var express = require('express');
var app = express();
var bodyParser = require('body-parser');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));

app.all('*', function (req, res, next) {

    var responseSettings = {
        "AccessControlAllowOrigin": req.headers.origin,
        "AccessControlAllowHeaders": "Content-Type,X-CSRF-Token, X-Requested-With, Accept," +
        " Accept-Version, Content-Length, Content-MD5,  Date, X-Api-Version, X-File-Name",
        "AccessControlAllowMethods": "POST, GET, PUT, DELETE, OPTIONS",
        "AccessControlAllowCredentials": true
    };
    res.header("Access-Control-Allow-Credentials", responseSettings.AccessControlAllowCredentials);
    res.header("Access-Control-Allow-Origin", responseSettings.AccessControlAllowOrigin);
    res.header("Access-Control-Allow-Headers", (req.headers['access-control-request-headers']) ?
        req.headers['access-control-request-headers'] : "x-requested-with");
    res.header("Access-Control-Allow-Methods", (req.headers['access-control-request-method']) ?
        req.headers['access-control-request-method'] : responseSettings.AccessControlAllowMethods);

    if ('OPTIONS' == req.method) {
        res.send(200);
    }
    else {
        next();
    }
});
var transporter = nodemailer.createTransport({
    service: 'Gmail',
    auth: {
        user: 'babusekhar@1906', // Your email id
        pass: 'babusekhar1906' // Your password
    }
});


app.post('/sendMail', function (req, res) {

    var mailOptions = {
        from: 'sekharbabu.golla@gmail.com', // sender address
        to: req.body.to, // list of receivers
        subject: 'Booking Confirm', // Subject line
        text: req.body.frstName + ' ' + req.body.lastname + ' ' + req.body.phno + ' ' + req.body.text + ' ' +
        req.body.city + ' ' + req.body.text1 + ' ' + req.body.ddt + ' ' + req.body.text2 + ' ' + req.body.rdt

    };

    transporter.sendMail(mailOptions, function (error, info) {
        if (error) {
            // console.log(error);
            res.json('error');
        } else {
            // console.log('Message sent: ' + info.response);
            res.json(info.response);

        }
        ;
    });
});

app.listen(2000, function () {
    console.log('App listening on port 6000!');
});