var express = require('express');
var yelpRouter = express.Router();
var qs = require('querystring');
var axios =require('axios');
var config = require('../config.js');
var token;


yelpRouter.post('/', function(req,res){
	token = getYelpToken(req,res);
})

yelpRouter.post('/search', function(req,res){
	console.log(req.body.term)
	search(req.body.term,token,res)
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
module.exports = yelpRouter;