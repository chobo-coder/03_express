
var express = require('express');
var index  = express.Router();
var path = require('path');
var fs = require('fs');
var template = require('../lib/template.js');

index.get('/', (req,res)=> {
    var title = 'Welcome';
    var description = 'Hello, Node.js';
    var list = template.list(req.list);
    var html = template.HTML(title, list,
        `<h2>${title}</h2><p>${description}</p>
        <img src = "/images/coding.jpg" style="width:300px;, display:block;, margin-top:10px;">`,
        `<a href="/topic/create">create</a>`
    );
    res.send(html);
});
module.exports = index;