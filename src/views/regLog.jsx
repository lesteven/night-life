import React,{Component} from 'react';

class RegLog extends Component{
	render(){
		return(
			<div>
				<div className = 'reglog'>
					<span className='reglogChild'>
						<h2>Register</h2>
						<form action='/users/register' method='post'>
							<input type='text' name='username' placeholder='username'/> 
							<br/>
							<input type='password' name='password' placeholder='password'/> 
							<br/>
							<input className='buttons' type='submit' value='Register'/>
						</form>
					</span>
					<span className = 'reglogChild'>
						<h2>Login</h2>
						<form action='/users/login' method='post'>
							<input type='text' name='username' placeholder='username'/> 
							<br/>
							<input type='password' name='password' placeholder='password'/> 
							<br/>
							<input className='buttons' type='submit' value='Login'/>
						</form>
					</span>
				</div>
			</div>
		)

	}
}

export default RegLog;