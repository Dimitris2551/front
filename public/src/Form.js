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
        const name = event.target.name;
        const value = event.target.value;

        let partialState = {};
        partialState[name] = value;
        this.setState(partialState);
        console.log(this.state);

    }

    handleSubmit(event){
        console.log('form submitted ');
        event.preventDefault();
    }

    render() {
        return(
        <form onSubmit={this.handleSubmit}  >
            Username:<input name="username" type="text" value={this.state.username.value} onChange={this.handleChange}/>
            <p>Password:<input name="password" type="text" value={this.state.password.value} onChange={this.handleChange}/></p>
            <button type="submit" value="Submit">Login</button>
            Not registered yet?
        </form>

    );
    }
}

export default Form;

