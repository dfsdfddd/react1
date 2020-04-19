
// function Dashboard(){
//   return <h1>Dashboard</h1>
// }
// export default Dashboard

import React,{Component} from 'react';

class Dashboard extends Component{
  constructor(props){
    super(props);
    this.state = {
      userMap:this.props.location.state ? this.props.location.state.userMap:''
    }
    
  }
  componentDidMount(){
    console.log(this.props)
  }
  render(){
  return (<h1>Dashboard{this.state.userMap}</h1>)
  }
}

export default Dashboard