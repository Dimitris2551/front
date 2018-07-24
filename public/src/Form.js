import React from 'react';

class Form extends React.Component {
    constructor(props) {
        super(props);
        this.state = {username:"", password:""};
        this.validate = this.validate.bind(this);
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    validate(event){
        alert('in validate');
        event.preventDefault();
    }

    handleChange(event) {
        this.setState({
            username: event.target.username,
            password:event.target.password
        });

    }

    handleSubmit(event){
        console.log('form submmited ');
        event.preventDefault();
    }

    render() {
        return(
        <form onSubmit={this.handleSubmit} onChange={this.handleChange} >
            Username:<input name="username" type="text" value={this.state.username}/>
            <p>Password:<input name="password" type="text" value={this.state.password}/></p>
            <button type="submit" value="Submit">Login</button>
            Not registered yet?
        </form>

    );
    }
}

export default Form;