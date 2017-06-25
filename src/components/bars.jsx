import React,{Component} from 'react';

class Bars extends Component{
	constructor(props){
		super(props);
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
					<button className='go buttons'>GO</button>
				</div>
				<hr/>
			</div>
		)
	}
}

export default Bars