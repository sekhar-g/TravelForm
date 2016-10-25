/**
 * Created by Sekhar Golla on 01-Oct-16.
 */
var express = require('express');
var app = express();
var mongoose = require('mongoose');
var bodyParser = require('body-parser');
var nodemailer = require('nodemailer');
var sgTransport = require('nodemailer-sendgrid-transport');

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

var options = {
  auth: {
    api_user: 'sekharbabu',
    api_key: 'sekhar@1976'
  }
}

var transporter = nodemailer.createTransport(sgTransport(options));

var traveller = mongoose.model("Travel",{
    firstName:String,
    lastName: String,
    phone: Number,
    email: String,
    form: String,
    destination: String,
    date: Date
});

app.post("/", function(req,res){
    travel.create({
        firstName:req.body.firstName,
        lastName: req.body.lastName,
        phone: req.body.phone,
        email: req.body.email,
        form: req.body.form,
        destination: req.body.destination,
        date: req.body.date
    })
});

app.post('/sendmail', function(req, res){
    var user = req.body;
    console.log('bidy', user);

    var mailOptions = {
        from: 'sekharbabu.golla@gmail.com', // sender address
        to: user.details.email, // list of receivers
        subject: 'Travel Details', // Subject line
        html: user.details.fname + ' ' + user.details.lname + ' ' + '(' + user.details.mobile + ') will depart from ' + user.travel.from + ' on ' + user.travel.departureDate + ' and return on ' + user.travel.returnDate
    };

    transporter.sendMail(mailOptions, function(error, info){
        if(error){
            console.log(error);
            res.json({yo: 'error'});
        }else{
            console.log('Message sent: ', info);
            res.json({yo: info});
        };
    });
});

app.use(express.static(__dirname + '/public'));

mongoose.connect('mongodb:////travellerdb:traveller@ds053136.mlab.com:53136/sbdb', {},function(){
    console.log('connected to data base');

    app.listen('8888',function(){
        console.log('server running...8888');
    })
})