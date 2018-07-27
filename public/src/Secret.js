import React from 'react';

class Secret extends React.Component {
    constructor(props) {
        super(props);
        this.state = {response:{secret:"Loading..."}};
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
        let secrets = this.state.response.docs;
        console.log("secrets: "+secrets);
        let msg = "";

        if(secrets)
        {
            const listSecrets = secrets.map((secret) =>
                <li key={secret._id}>
                    <h3>{secret.title}</h3>
                    <h5><p>{secret.secret}</p></h5>
                </li>
            );
            msg = <ul>{listSecrets}</ul>;

        }
        else
        {
            msg = <div>auth: {this.state.response.auth}</div>;
        }
        return(
            <div>
                {msg}
                <p>
                    <button onClick={this.handleLogout} >Logout</button>
                </p>
            </div>
        );
    }


}

export default Secret;