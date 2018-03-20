import fs from 'fs';
import cheerio from 'cheerio';
import colors from 'colors';

/*eslint-disable no-console */

fs.readFile('src/index.html', 'utf8', (err, markup) => {
    if (err) {
        return console.log(err);
    }

    const dir = 'dist/login';
    
    if (!fs.existsSync(dir)){
        fs.mkdirSync(dir);
    }

    const $ = cheerio.load(markup);

 //   $('head').prepend('<link rel="stylesheet" type="text/css" href="login/styles.css">');
    $('head').prepend('<link rel="stylesheet" href="/login/styles.css">');
 

    fs.writeFile(dir + '/index.html', $.html(), 'utf8', function (err) {
        if (err) {
            return console.log(err);
        }
        console.log('index.html written to /dist'.green);
    });
});