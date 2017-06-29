var qs = require('querystring');

//action
export function searchBars(search,data){
	return{
		type: 'SEARCH',
		search,
		data
	}
}

//async, action creator
export function fetchBars(term){
	return (dispatch) =>{
		
		var formData = {
			term:term
		}
		fetch('/yelp/search',
		{
			method:'POST',
			headers: {'Content-Type':'application/x-www-form-urlencoded'}, 
			body: qs.stringify(formData)
		})
		//.then(console.log(formData))
		.then(response => response.json())
		.then(data => dispatch(searchBars(term,data.businesses)))
	}
}

//reducer
export const search = (state={term:'',data:''},action)=>{
	switch(action.type){
		case 'SEARCH':
			return {term:action.search,data:action.data};
		default:
			return state;
	}
}

export default search