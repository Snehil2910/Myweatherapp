const express = require('express');
const path = require('path');
const app = express();
const fetch = require('node-fetch');
app.set('view engine', 'ejs');
app.use(express.urlencoded({extended:false}));
app.use(express.static(path.join(__dirname + '/public')));
app.get('/signup',function(req,res){
    res.redirect( '/welcome.html');
});
app.get('/home',function(req,res){
    res.redirect('/home.html');
    
});
app.post('/signupreq',function(req,res){
    fetch('https://api.openweathermap.org/data/2.5/weather?q='+req.body.cit+'&units=metric&appid=13f32b1a5f095aae09bb1f8edbf9ec36')
  .then(response => response.json())
  .then(data => {
    res.render('home',{
        city:req.body.cit,
        name:req.body.nm,
        temp:data.main.temp,
        tempmin:data.main.temp_min,
        tempmax:data.main.temp_max 
    });
  })
    .catch(err => {
        if (err){
            console.log(err);
        }
    })
    
    

});

app.listen(8080,function(){
	console.log('server started at 8080');
});

  