var express = require('express');
var userRouter = express.Router();



userRouter.get('/',function(req,res){
	if(req.user){
		res.json({username:req.user.username})
	}
	else{
		res.json({})
	}
})

module.exports = userRouter;