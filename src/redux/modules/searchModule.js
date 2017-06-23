var qs = require('querystring');

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
		dispatch(searchBars(term))
		var formData = {
			term:term
		}
		fetch('/yelp/search',
		{
			method:'POST',
			headers: {'Content-Type':'application/x-www-form-urlencoded'}, 
			body: qs.stringify(formData)
		})
		.then(console.log(formData))
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