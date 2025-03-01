var express = require('express');
var router = express.Router();
var path = require('path');
var fs = require('fs');
var template = require('../lib/template.js');

console.log('Starting');
router.post('/delete_process', (req,res)=>{
    var post=req.body;
    var title = post.title;
    fs.unlink(`data/${title}`, (err) =>{
        res.writeHead(302, {Location: `/`});
        res.end();
        // res.writeHead(302,{Location: `/page/${name}`});
        // res.end();
    });
});
router.get('/update/:pageID', (req,res)=>{
    fs.readFile(`./data/${req.params.pageID}`,(err, description)=>{ 
        var title =  req.params.pageID;
        var list = template.list(req.list);
        var html = template.HTML(title, list,
            `<form action="/topic/update_process" method="post">
            <p>
            <input type="hidden" name="hidden_title" value = ${req.params.pageID}>
            </p>
            <p>
            <input type="text" name="title" placeholder="title" value = ${req.params.pageID}>
            </p>
            <p>
            <textarea name = "description" placeholder = "description" >${description}</textarea>
            </p>
            <p>
            <input type = "submit">
            </p>
                        <h2>${title}</h2><p>${description}</p>`,
            `<a href="/create">create</a>
            <a href="/update/${req.params.pageID}">update</a>`
        );
        res.send(html);
    }); 
});
router.post('/update_process', (req,res)=>{
    var post = req.body;       
    var name = post.hidden_title;
    var title = post.title;
    var description = post.description;
    fs.rename(`./data/${name}`, `data/${title}`, (err) =>{
        fs.writeFile(`./data/${title}`,description,'utf8',function(err){
            res.redirect (`/topic/${title}`);
            res.end();
        // res.writeHead(302,{Location: `/page/${name}`});
        // res.end();
        });
    });
});
router.get('/create', (req,res)=>{
    var title = 'Welcome';
    var description = 'Hello, Node.js';
    var list = template.list(req.list);
    var html = template.HTML(title, list,
        `<form action="/topic/create_process" method="post">
        <p>
        <input type="text" name="title" placeholder="title">
        </p>
        <p>
        <textarea name = "description" placeholder = "description"></textarea>
        </p
        <p>
        <input type = "submit">
        </p>
                    <h2>${title}</h2><p>${description}</p>`,
        `<a href="/topic/create">create</a>`
    );
    res.send(html);
}); 
router.post('/create_process', (req,res)=>{
    var post=req.body;
    console.log(post);
    var name = post.title;
    var description = post.description;
    fs.writeFile(`data/${name}`,description,'utf8',function(err){
        res.redirect(`/topic/${name}`);
    });
})

router.get('/:pageID' , (req, res, next)=>{
    fs.readFile(`./data/${req.params.pageID}`, (err, description)=>{
        if (err) {
            next(err);
        } else {   
            var title = 'Page';
            var list = template.list(req.list);
            var html = template.HTML(title, list,
                `<p>${description}</p>
                <form action="/topic/delete_process" method = "post">
                <p><input type="hidden" name="title" value = ${req.params.pageID}><p>
                <p><input type = "submit" value = "delete"></p>
                </form>`
                ,
                `<a href="/topic/create">create</a>
                <a href="/topic/update/${req.params.pageID}">update</a>`
            );
            res.send(html);
        };
    });
}); 
module.exports = router;  