import React,{Component} from 'react';
import {connect} from 'react-redux';
import {searchBars} from '../redux/modules/searchModule'



class Home extends Component{
	constructor(props){
		super(props);
		this.state={
			search:''
		}
		this.handleChange = this.handleChange.bind(this);
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
		.catch(error=> console.log('client error'))
	}
	render(){
		return(
			<div>
				<h2>Nightlife Coordination</h2>
				<input type='text' placeholder='Search Any Location' 
				value={this.state.search} onChange={this.handleChange}
				/*onKeyUp = {()=>this.props.search(this.state.search)}*/  />
				<input className='buttons' type='submit' 
				value='Search' onClick={()=>this.props.search(this.state.search)} />
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
		search:(term)=> dispatch(searchBars(term))
	}
}

export default connect(mapStateToProps,mapDispatchToprops)(Home);