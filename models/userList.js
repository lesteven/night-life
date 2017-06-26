var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var UserList = new Schema({
	_id: {type:String,required:true},
	list:{type:[]}
},{
	_id:false
});

module.exports = mongoose.model('UserList',UserList)