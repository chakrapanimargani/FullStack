const express=require('express');
const keys=require('./config/keys');
const mongoose=require('mongoose');
const passport=require('passport');
const bodyParser=require('body-parser');

require('./models/user');
require('./services/passport');
const app=express();
mongoose.connect(keys.mongoURI);
app.use(bodyParser.json());
app.use(passport.initialize());
app.use(passport.session());

if(process.env.NODE_ENV === 'production'){
app.use(express.static('client/build'));
const path = require('path');
app.get('*', (req, res) => {
res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'));
})
}

var server=app.listen(process.env.PORT || 8181,function(){
	var port=server.address().port;
	console.log("express is working on port:"+port);
})