var app = express();
var fs = require('fs');

exports.home=function(request,response) {
    app.get('/', (req,res)=> {
        fs.readdir('./data', (err, data)=>{
            if(err) {
                console.log(err);
                res.status(500).send('Internal Server Error');
                return;
            }
            var title = 'Welcome';
            var description = 'Hello, Node.js';
            var list = template.list(data);
            var html = template.HTML(title, list,
                `<h2>${title}</h2><p>${description}</p>`,
                `<a href="/create">create</a>`
            );
            res.send(html);
        });
    });  
}