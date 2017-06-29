import React,{Component} from 'react';
import {connect} from 'react-redux';
import {fetchBars} from '../redux/modules/searchModule'
import BarsList from '../components/barsList.jsx'


class Home extends Component{
	constructor(props){
		super(props);
		this.state={
			search:''
		}
		this.handleChange = this.handleChange.bind(this);
		this.search = this.search.bind(this);
	}
	handleChange(event){
		this.setState({search:event.target.value})
	}
	componentDidMount(){
		fetch('/yelp',{
			credentials:'same-origin',
			method: 'POST'
		})
		.then(response=>console.log(response))
		.then(data =>{
			let storage = localStorage.getItem('searchTerm');
			if(storage){this.props.search(storage)}
		})
		.catch(error=> console.log('client error'))
	}
	search(e){
		e.preventDefault();
		let storage = localStorage.getItem('searchTerm');
		localStorage.setItem('searchTerm',this.state.search)
		
		this.props.search(this.state.search)
	}
	render(){

		return(
			<div>
				<h2>Nightlife Coordination</h2>
				<p>Powered by Yelp</p>
				<form onSubmit={this.search}>
					<input type='text' placeholder='Search Any Location' 
					value={this.state.search} onChange={this.handleChange} />
					<input className='buttons' type='submit' value='Search'  />
				</form>
				<BarsList />
			</div>
		)
	}
}
const mapStateToProps = (state) =>{
	return{
		search:state.search
	}
}

const mapDispatchToprops = (dispatch)=>{
	return{
		search:(term)=> dispatch(fetchBars(term))
	}
}

export default connect(mapStateToProps,mapDispatchToprops)(Home);