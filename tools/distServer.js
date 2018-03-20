import express from 'express';
import path from 'path';
import open from 'open';
import compression from 'compression';

/*eslint-disable no-console */

const port = 3001;
let app = express();
let cookieParser = require('cookie-parser');
let csrf = require('csurf');
let csrfProtection = csrf({ cookie: true });

app.use(cookieParser()); 

// set a cookie
app.use(csrfProtection,function (req, res, next) {
  // check if client sent cookie
  let cookie = req.cookies.cookieName;  
  res.cookie('csrfToken', req.csrfToken(), { httpOnly: true },{secure:true});  

  next(); // <-- important!
}); 

app.use(compression());
app.use(express.static('dist'));
app.get('/login',csrfProtection, function(req, res) {    
    res    
        .sendFile(path.join(__dirname, '../dist/login/index.html'));
});

app.listen(port, function(err) {
    if (err) {
        console.log(err);
    } else {
        open(`http://localhost:${port}/login`);
    }
});