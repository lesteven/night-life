//action
export function userLogin(user){
	return{
		type: 'USER_LOGIN',
		user
	}
}

//async, action creator
export function fetchUser(){
	return (dispatch) =>{
		fetch('/users', { credentials : 'same-origin' })
			.then((response)=> response.json())
			.then(user => dispatch(userLogin(user)))
	}
}

//reducer
export const user = (state ={username:''}, action)=>{
	switch(action.type){
		case 'USER_LOGIN':
			return action.user;

		default:
			return state;
	}
}

export default user