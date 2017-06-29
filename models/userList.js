var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var UserList = new Schema({
	_id: {type:String,required:true},
	list:{type:[]},
	createdAt:{type:Date, expires:'12h'}
},{
	_id:false
});

module.exports = mongoose.model('UserList',UserList)