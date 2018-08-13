const passport = require('passport');

const GoogleStrategy = require('passport-google-oauth20').Strategy;
//const FacebookStrategy = require('passport-facebook').Strategy;
//const LocalStrategy = require('passport-local').Strategy;
const keys = require('../config/keys');
const mongoose = require('mongoose');

const user = mongoose.model('users');

passport.serializeUser((user, done) => {
	done(null, user.id);
});

passport.deserializeUser((id, done) => {
	user.findById(id)
	.then((user) => {
		done(null, user);
	})
});

passport.use(new GoogleStrategy({
	clientID: keys.googleClientID,
	clientSecret: keys.googleClientSecret,
	callbackURL: '/auth/google/callback',
	proxy: true
}, (accessToken, refreshToken, profile, done) => {
user.findOne({ googleId: profile.id })
.then((existUser) => {
	console.log("existUser", existUser)
	if(existUser){
		done(null, existUser);
		//already user had googleID created
	}
	else{
		new user({
			googleId: profile.id,
			name: profile.displayName
		}).save()
		.then((user) => done(null, user))
	}
})
}));




