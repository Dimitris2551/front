import React, { Component } from 'react';
import Form from './Form';
import Secret from './Secret';

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
            return <Secret loggedIn={this.state.loggedIn} setLoggedIn={this.setLoggedIn} />
        }
        else
        {
            return <Form loggedIn={this.state.loggedIn} setLoggedIn={this.setLoggedIn} />;
        }
    }
}

export default App;