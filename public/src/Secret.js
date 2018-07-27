import React from 'react';

class Secret extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            secret:"Loading...",
            newTitle:"",
            newPost:"",
            posts:[{_id:"1", title:"No posts", secret:"You are very honest. You have no secrets"}]
            };
        this.handleLogout = this.handleLogout.bind(this);
        this.handleChange = this.handleChange.bind(this);
        this.handleNewPost = this.handleNewPost.bind(this);
        this.callForSecrets = this.callForSecrets.bind(this);
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
        this.callForSecrets();
    }

    callForSecrets(){
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
                console.log(`posts: ${response}`);
                this.setState({ posts:response.docs });
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
                this.setState({ added:response.added });
                if(this.state.added)
                {
                    console.log('secret added');
                    this.callForSecrets();
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
        let secrets = this.state.posts;
        let msg;
        console.log(`secrets: ${secrets}`);
        const listSecrets = secrets.map((secret) =>
            <li key={secret._id}>
                <h3>{secret.title}</h3>
                <h5><p>{secret.secret}</p></h5>
            </li>
        );
        msg = <ul>{listSecrets}</ul>;

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