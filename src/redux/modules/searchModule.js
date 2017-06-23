//var qs = require('querystring');
var axios =require('axios');

//action
export function searchBars(search){
	return{
		type: 'SEARCH',
		search
	}
}

//async, action creator
export function fetchBars(term){
	return (dispatch) =>{
		var header = new Headers({
			'Content-Type': 'text/plain'
		})
		fetch('/yelp/search',
		{
			method:'POST',
			headers:header,
			body:term
		})
		.then(search =>dispatch(searchBars(search)))
		
	}
}

//reducer
export const search = (state='',action)=>{
	switch(action.type){
		case 'SEARCH':
			return action.search;
		default:
			return state;
	}
}

export default search