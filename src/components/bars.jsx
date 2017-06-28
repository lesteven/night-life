import React,{Component} from 'react';
var qs = require('querystring');

class Bars extends Component{
	constructor(props){
		super(props);
		this.state={
			going:'false'
		}
		this.go = this.go.bind(this);
		this.dontGo = this.dontGo.bind(this);
		this.getUserStatus = this.getUserStatus.bind(this);
	}

	go(id,user){
		this.setState({going:true});
		let formData ={
			location: id,
			user:user,
		}
		fetch('/yelp/go', {
			credentials:'same-origin',
			method:'POST',
			headers: {'Content-Type':'application/x-www-form-urlencoded'}, 
			body:qs.stringify(formData)
		})
		.then(response =>response.json())
		.then(data => {
			console.log(data)
			this.setState({going:'true'})
		})
	}
	dontGo(id,user){
		//this.setState({going:false});
		let formData ={
			location: id,
			user:user,
		}
		fetch('/yelp/go', {
			credentials:'same-origin',
			method:'DELETE',
			headers: {'Content-Type':'application/x-www-form-urlencoded'}, 
			body:qs.stringify(formData)
		})
		.then(response =>response.json())
		.then(data => {
			console.log(data)
			this.setState({going:'false'})
		})
	}
	goButton(){
		return(
			<button className='go buttons' 
			onClick={()=>this.go(this.props.id,this.props.user)}
			>GO</button>
		)
	}
	dontGoButton(){
		return(
			<button className='go buttons' 
			onClick={()=>this.dontGo(this.props.id,this.props.user)}
			>DONT GO</button>
		)	
	}
	getUserStatus(id,user){
		let status;
		let formData ={
			location: id,
			user:user,
		}
		fetch('/yelp/go', {
			credentials:'same-origin',
			method:'PUT',
			headers: {'Content-Type':'application/x-www-form-urlencoded'}, 
			body:qs.stringify(formData)
		})
		.then(response =>response.json())
		.then(data => {
			this.setState({going:data.status})
			status = data.status
			console.log(id,data.status,status)
			return data.status
		})
	}
	componentWillMount(){
	this.getUserStatus(this.props.id,this.props.user)
	}
	render(){
		return(
			<div>
				<div className ='bar'>
					<a target='_blank' href={this.props.url}><img src={this.props.image}/></a>
					<div className='description'>
						<h3 className='title'>{this.props.name}</h3>
						<p>People going:</p>
					</div>
					{this.state.going ==='true'?this.dontGoButton():this.goButton()}
				</div>
				<hr/>
			</div>
		)
	}
}

export default Bars