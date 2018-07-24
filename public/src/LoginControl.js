import React from "react";

class LoginControl extends React.Component {
    constructor(props) {
        super(props);
        this.state = {isLoggedIn: false};
    }

    onClick() {

    }

    render() {
        const isLoggedIn = this.state.isLoggedIn;
        let button;

        if (isLoggedIn)
        {

        }
        else
        {

        }

        return (
            <div>
                <button onClick={props.onClick}>
                    Login
                </button>
            </div>
        );
    }
}

export default LoginControl;