var express = require('express');
var app = express();
var fs = require('fs');
var template = require('./lib/template.js');
var path = require('path');
var qs = require('querystring');
var bodyParser = require('body-parser');
var compression = require('compression')
var topicRouter = require('./routes/topic');
var indexRouter = require('./routes/index');
app.use(bodyParser.urlencoded({extended:false}));
app.use(compression());
app.use(express.static('public'))
app.get('*',(req,res,next)=>{
    fs.readdir('./data', function(err, filelist){
        req.list = filelist;
        next();
    })
});
app.use('/', indexRouter);
app.use('/topic',topicRouter);

app.use(function(req,res,next){
    res.status(404).send('sorry cant find that!');
});

app.use(function(err,req,res,next){
    console.error(err.stack);
    res.status(500).send('somting broke!');
});
app.listen(3000, () => console.log('Example app listening on port 3000'))
