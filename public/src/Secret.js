import React from 'react';

class Secret extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            response:"",
            secret:"Loading...",
            newTitle:"",
            newPost:"",
            posts:""
            };
        this.handleLogout = this.handleLogout.bind(this);
        this.handleChange = this.handleChange.bind(this);
        this.handleNewPost = this.handleNewPost.bind(this);
    }

    handleChange(event) {
        const name = event.target.name;
        const value = event.target.value;

        let partialState = {};
        partialState[name] = value;
        this.setState(partialState);
        //console.log(this.state);
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

    handleNewPost(event){
        event.preventDefault();
        const body = JSON.stringify({ token:window.sessionStorage.token, title:this.state.newTitle, post:this.state.newPost });
        fetch(`http://localhost:8080/secret/add`, {
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
                if(this.state.response.added)
                {
                    console.log('secret added');
                }
            })
            .catch(err => console.error('Caught error: ', err));
        //console.log(this.state.data);
    }

    handleLogout(){
        window.sessionStorage.token = {};
        this.props.setLoggedIn(false);
    }

    render() {
        let docs = this.state.response.docs;
        let msg;
        if(docs) {
            this.state.posts = docs;
            let secrets = this.state.posts;
            console.log("secrets: " + this.state.posts);

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
                msg = <h3>no secrets found</h3>;
            }
        return(
            <div>
                    <button onClick={this.handleLogout} >Logout</button>

                    <form onSubmit={this.handleNewPost}>
                        <p><input name="newTitle" value={this.state.newTitle} onChange={this.handleChange} /></p>
                        <p><textarea name="newPost" value={this.state.newPost} onChange={this.handleChange} ></textarea></p>

                        <p>
                            <button type="submit" value="Submit">post</button>
                        </p>
                    </form>


                {msg}

            </div>
        );
    }


}

export default Secret;