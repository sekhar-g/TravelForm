/**
 * Created by Sekhar Golla on 01-Oct-16.
 */
var express = require('express');
var app = express();

app.use(express.static(__dirname + '/public'));

app.listen(8888, function(){
    console.log('Server started....');
});