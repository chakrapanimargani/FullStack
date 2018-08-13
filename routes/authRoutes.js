const passport = require('passport');
module.exports = (app) => {

app.get('/auth/google/', passport.authenticate('google', {
    scope: ['profile', 'email']
}));

/*app.get('/auth/facebook/',
 passport.authenticate('facebook'));

app.get('/auth/facebook/callback', passport.authenticate('facebook'),
    (req, res) => {
        res.redirect('/surveys');
    });*/

app.post('/auth/login',
passport.authenticate('local', { successRedirect: '/user-selection',
                                   failureRedirect: '/user-selection',
                                   failureFlash: true })
);

app.get('/auth/google/callback', passport.authenticate('google'),
    (req, res) => {
        res.redirect('/user-selection');
    });

app.get('/api/current_user', (req, res) => {
    res.send(req.user);
});

app.get('/api/logout', (req, res) => {
    req.logout();
    res.redirect('/');
});
};