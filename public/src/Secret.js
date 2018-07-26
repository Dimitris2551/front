import React from 'react';

class Secret extends React.Component {
    constructor(props) {
        super(props);
        this.state = {response:"server has not responded yet..."};
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
                this.setState({ response:JSON.stringify(response)});

            })
            .catch(err => console.error('Caught error: ', err));
    }

    render() {
        return this.state.response;
    }


}

export default Secret;