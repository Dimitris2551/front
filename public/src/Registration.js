import React  from 'react';



class Registration extends React.Component {
    constructor(props) {
        super(props);
        this.state = {username:"", password:"", secret:"mySecret"};
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleLoginClick = this.handleLoginClick.bind(this);
    }

    handleChange(event) {
        const name = event.target.name;
        const value = event.target.value;

        let partialState = {};
        partialState[name] = value;
        this.setState(partialState);
        console.log(this.state);

    }

    handleLoginClick() {
        this.props.setNeedToRegister(false);
    }

    handleSubmit(event){
        event.preventDefault();
        const body = JSON.stringify({ username: this.state.username, password: this.state.password, secret:this.state.secret});
        fetch(`http://localhost:8080/user/add`, {
            method:'post',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body
        })
            .then(response => response.json())
            .then(response => {
                this.setState({ response });
                if(this.state.response.registered)
                {
                    this.props.setNeedToRegister(false);
                }
            })
            .catch(err => console.error('Caught error: ', err));
        //console.log(this.state.data);

    }

    render() {
        return(
            <div>
            <form onSubmit={this.handleSubmit}  >
                Username:<input name="username" type="text" value={this.state.username} onChange={this.handleChange}/>
                <p>Password:<input name="password" type="text" value={this.state.password} onChange={this.handleChange}/></p>
                <p>Your secret:<input name="secret" type="text" value={this.state.secret} onChange={this.handleChange} /></p>
                <button type="submit" value="Submit">Register</button>
            </form>
                Already registered?<button onClick={this.handleLoginClick} >Login</button>
            </div>
        );
    }
}

export default Registration;

