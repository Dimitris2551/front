import React  from 'react';


class Form extends React.Component {
    constructor(props) {
        super(props);
        this.state = {username:"", password:""};
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
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
        event.preventDefault();
        const body = JSON.stringify({ username: this.state.username, password: this.state.password });
        fetch(`http://localhost:8080/user/find`, {
            method:'post',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body
        })
            .then(response => response.json())
            .then(data => this.setState({ data }))
            .catch(err => console.error('Caught error: ', err));
        console.log(this.state.data);
        window.sessionStorage.token = this.state.data.token;
        console.log(window.sessionStorage.token);
    }

    render() {
        return(
        <form onSubmit={this.handleSubmit}  >
            Username:<input name="username" type="text" value={this.state.username} onChange={this.handleChange}/>
            <p>Password:<input name="password" type="text" value={this.state.password} onChange={this.handleChange}/></p>
            <button type="submit" value="Submit">Login</button>
            Not registered yet?
        </form>

    );
    }
}

export default Form;

