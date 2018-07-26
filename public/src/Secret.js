import React from 'react';

class Secret extends React.Component {
    constructor(props) {
        super(props);
        this.state = {response:{secret:"server has not responded yet..."}};
        this.handleLogout = this.handleLogout.bind(this);
    }

    componentDidMount(){
        console.log("SessionStoragefirst token: "+window.sessionStorage.token);

        fetch(`http://localhost:8080/secret?token=${window.sessionStorage.token}`, {
            method:'get',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            }
        })
            .then(response => response.json())
            .then(response => {
                console.log(`response: ${response}`);
                this.setState({ response });

            })
            .catch(err => console.error('Caught error: ', err));
    }

    handleLogout(){
        window.sessionStorage.token = {};
        this.props.setLoggedIn(false);
    }

    render() {
        let secret = this.state.response.secret;
        let msg;
        if(secret)
        {
            msg = <div>secret: {secret}</div>;
        }
        else
        {
            msg = <div>auth: {this.state.response.auth}</div>;
        }
        return(
            <h2>
                {msg}
                <p>
                    <button onClick={this.handleLogout} >Logout</button>
                </p>
            </h2>
        );
    }


}

export default Secret;