import React,{Component} from 'react';
import { connect } from 'react-redux';
import Bars from './bars.jsx'

class BarsList extends Component{
	render(){
		let list;
		if(this.props.search.data){
			list = this.props.search.data.map((bar,index)=>{
			return <Bars key={index}
					user = {this.props.user.username}
					id = {bar.id}
					name= {bar.name}
					image ={bar.image_url}
					url = {bar.url}
					/>
			})
		}
		return(
			<div>
				{this.props.search.data?list:'nothing here'}
			</div>
		)
	}
}
const mapStateToProps = (state) =>{
	return{
		user:state.user,
		search:state.search,
		data: state.data
	}
}
export default connect(mapStateToProps)(BarsList)