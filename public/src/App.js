import React, { Component } from 'react';
import Form from './Form';
import Secret from './Secret';
import Registration from "./Registration";

class App extends React.Component {
    constructor(props) {
        super(props);
        this.state = {loggedIn:false, needToRegister:false};
        this.setLoggedIn = this.setLoggedIn.bind(this);
        this.setNeedToRegister = this.setNeedToRegister.bind(this);
    }

    setNeedToRegister(value){
        this.setState({needToRegister: value});
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
            if (this.state.needToRegister) {
                return <Registration setNeedToRegister={this.setNeedToRegister}/>;
            }
            else {
                return <Form loggedIn={this.state.loggedIn} setLoggedIn={this.setLoggedIn} setNeedToRegister={this.setNeedToRegister}/>;
            }
        }
    }
}

export default App;