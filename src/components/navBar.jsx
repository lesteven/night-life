import React,{Component} from 'react';
import { connect } from 'react-redux';
import {fetchUser} from '../redux/modules/loginModule'
import {
  BrowserRouter as Router,
  Route,
  Link
} from 'react-router-dom'
import RegLog from '../views/regLog.jsx';
import Home from '../views/home.jsx';

class NavBar extends Component{

	componentDidMount(){
		this.props.getUser()
		
	}
	removeStorage(){
		localStorage.clear()
	}
	login(){
		return(
			<span>
				<a >{this.props.user.username} </a>
				<a href ='/users/logout' onClick={this.removeStorage}>Log Out</a>
			</span>
		)
	}
	noLogin(){
		return(
			<Link to ='/reglog'>Register/Login</Link>
		)
	}
	render(){
		return(
			<Router>
			<div>
				<nav className = 'navBar'>
					<Link to ='/'>Home</Link>
					{this.props.user.username?
						this.login():this.noLogin()}
				</nav>

				<Route exact path= '/' component ={Home}/>
				<Route path ='/reglog' component ={RegLog}/>
			</div>
			</Router>
		)
	}
}

const mapStateToProps = (state) =>{
	return{
		user:state.user
	};
};

const mapDispatchToProps = (dispatch) =>{
	return{
		getUser: () => dispatch(fetchUser())
	}
}

export default connect(mapStateToProps,mapDispatchToProps)(NavBar);