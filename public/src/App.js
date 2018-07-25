import React, { Component } from 'react';
//import Clock from './Clock'
import Form from './Form';
import LoginControl from './LoginControl';

class App extends React.Component {
    constructor(props) {
        super(props);
        this.state = {loggedIn:false};
        this.setLoggedIn = this.setLoggedIn.bind(this);
    }

    setLoggedIn(value){
        this.setState({loggedIn: value});
    }

    render(){
        if(this.state.loggedIn)
        {
            return <h2>Hi, hope you are well!</h2>;
        }
        else
        {
            return <Form loggedIn={this.state.loggedIn} setLoggedIn={this.setLoggedIn} />;
        }
    }
}

export default App;