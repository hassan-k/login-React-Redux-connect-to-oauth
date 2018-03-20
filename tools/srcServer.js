import express from 'express';
import webpack from 'webpack';
import path from 'path';
import config from '../webpack.config.dev';
import open from 'open';

/* eslint-disable no-console */

const port = 3001;
//let app = express();
const compiler = webpack(config);
let app = express();
let cookieParser = require('cookie-parser');
let csrf = require('csurf');
let csrfProtection = csrf({ cookie: true });

app.use(cookieParser()); 

app.use(csrfProtection,function (req, res, next) {
  // check if client sent cookie
  let cookie = req.cookies.cookieName;  
  res.cookie('csrfToken', req.csrfToken(), { httpOnly: true },{secure:true});  

  next(); // <-- important!
});

app.use(require('webpack-dev-middleware')(compiler, {
  noInfo: true,
  publicPath: config.output.publicPath
}));

app.use(require('webpack-hot-middleware')(compiler));

app.get('*',csrfProtection, function(req, res) {
  res    
    .sendFile(path.join( __dirname, '../src/index.html'));
});

app.listen(port, function(err) {
  if (err) {
    console.log(err);
  } else {
    open(`http://localhost:${port}`);
  }
});
