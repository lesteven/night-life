var express = require('express');
var morgan = require('morgan');
var app = express();
app.use(morgan('dev'));
var port = process.env.PORT || 3000;
var path = require('path');

//routers
var userRouter = require('./routes/userRouter');

app.get('*.js', function (req, res, next) {
  req.url = req.url + '.gz';
  res.set('Content-Encoding', 'gzip');
  next();
});

app.use(express.static(__dirname + '/dist'));
app.use('/',express.static(__dirname + '/public'));

app.use('/users',userRouter);

app.get('*', function(req,res){
	res.sendFile(path.join(__dirname+'/public/index.html'))
})


app.listen(port,function(){
	console.log(`Listening on port ${port}`)
})

