import React,{Component} from 'react';
var qs = require('querystring');

class Bars extends Component{
	constructor(props){
		super(props);
		this.state={
		}
		this.go = this.go.bind(this);
		this.getUserStatus = this.getUserStatus.bind(this);
	}

	go(id,user,method){
		let formData ={
			location: id,
			user:user,
		}
		fetch('/yelp/go', {
			credentials:'same-origin',
			method: method,
			headers: {'Content-Type':'application/x-www-form-urlencoded'}, 
			body:qs.stringify(formData)
		})
		.then(response =>response.json())
		.then(data => {
			console.log(data)
			//this.setState({going:true})
			this.getUserStatus(this.props.id,this.props.user)
		})
	}
	goButton(){
		return(
			<button className='go buttons' 
			onClick={()=>this.go(this.props.id,this.props.user,'POST')}
			>GO</button>
		)
	}
	dontGoButton(){
		return(
			<button className='go buttons' 
			onClick={()=>this.go(this.props.id,this.props.user,'DELETE')}
			>DONT GO</button>
		)	
	}
	getUserStatus(id,user){
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
			this.setState({going:data.status,list:data.list})
		})
	}
	componentWillMount(){
		this.getUserStatus(this.props.id,this.props.user)
	}
	render(){
		let list;
		if(this.state.list){
			list = this.state.list.map((person,index)=>{
				return <p className='list' key={index}>{person}. </p>
			})
		}
		return(
			<div>
				<div className ='bar'>
					<a target='_blank' href={this.props.url}><img src={this.props.image}/></a>
					<div className='description'>
						<h3 className='title'>{this.props.name}</h3>
						<p>People going: {this.state.list?this.state.list.length:null}</p>
						{list}
					</div>
					{this.state.going?this.dontGoButton():this.goButton()}
				</div>
				<hr/>
			</div>
		)
	}
}

export default Bars