import React,{Component} from 'react';
var qs = require('querystring');

class Bars extends Component{
	constructor(props){
		super(props);
		this.state={
			going:false
		}
		this.go = this.go.bind(this);
		this.dontGo = this.dontGo.bind(this);
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
		.then(data => console.log(data))
	}
	dontGo(id,user){
		this.setState({going:false});
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
		.then(data => console.log(data))
	}
	getUserList(id){
		let formData ={
			location: id,
		}
		fetch('/yelp/go', {
			credentials:'same-origin',
			method:'GET',
			headers: {'Content-Type':'application/x-www-form-urlencoded'}, 
			body:qs.stringify(formData)
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
	render(){
		return(
			<div>
				<div className ='bar'>
					<a target='_blank'href={this.props.url}><img src={this.props.image}/></a>
					<div className='description'>
						<h3 className='title'>{this.props.name}</h3>
						<p>People going:</p>
					</div>
					{this.state.going?this.dontGoButton():this.goButton()}
				</div>
				<hr/>
			</div>
		)
	}
}

export default Bars