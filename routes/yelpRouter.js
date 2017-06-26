var express = require('express');
var yelpRouter = express.Router();
var qs = require('querystring');
var axios =require('axios');
var config = require('../config.js');
var UserList = require('../models/userList');
var token;


yelpRouter.post('/', function(req,res){
	token = getYelpToken(req,res);
})

yelpRouter.post('/search', function(req,res){
	console.log(req.body.term)
	search(req.body.term,token,res)
})

yelpRouter.route('/go')
.post(function(req,res){
	addToList(req);
	res.json({
		status:'success',
		id:req.body.location,
		user:req.body.user
	})
})
.delete(function(req,res){
	removeFromList(req)
	res.json({status:'success'})
})

function getYelpToken(req,res){

	var details = {
	    'grant_type': 'client_credentials',
	    'client_id': config.ID,
	    'client_secret': config.SECRET
	};
     axios.post('https://api.yelp.com/oauth2/token', 
     	qs.stringify(details))
     	.then(response =>{
     		token = response.data.access_token;
     		 //req.token_data = response.data;
        	//req.token = response.data.access_token;
			console.log('YELP TOKEN RECEIVED')
			res.json({'status':'success'})
     	})
        .catch(err=> console.log('server error'))

     return token;
}

function search(term,token,res){
    var url = 'https://api.yelp.com/v3/businesses/search';
    url += '?categories=bars';
    url +='&location=' + term
	axios({
		method:'get',
		url:url,
		headers:{'Authorization':'Bearer ' + token}
	})
	.then(response=>{
		//console.log(response.data.businesses[0])
		res.json(response.data)
	})
	.catch(err=> console.log(err))
}
function addToList(req){
	UserList.findById(req.body.location,function(err,list){
		if(err) throw err;
		if(!list){
			makeList(req);
		}
		else{
			list.list.push(req.body.user);
			list.markModified('list');
			list.save();
			console.log(list)
		}
	})
}
function removeFromList(req){
	UserList.findById(req.body.location,function(err,list){
		if(err) throw err;
		
		var index = list.list.indexOf(req.body.user)
		list.list.splice(index,1)
		list.markModified('list');
		list.save();
		console.log(list)
		
	})
}
function makeList(req){
	var list = [];
	list.push(req.body.user);
	var data =({
		_id: req.body.location,
		list: list
	})
	UserList.create(data,function(err,list){
		if(err) throw err;
		console.log(list)
	})
}
module.exports = yelpRouter;