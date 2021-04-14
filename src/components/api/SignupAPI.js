// signup.component.js
import { useState, useRef, useEffect } from 'react'

import Button from "@material-ui/core/Button";

import TextField from "@material-ui/core/TextField";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";

//const url = "http://localhost:5555/";
const url = "https://flask-backend-ee461l.herokuapp.com/"

// API call to login
async function loginUser(signup_details) {
    let changeableUrl = `${url}api/signup`;
    console.log("URL formed : ", changeableUrl)
    console.log("signup_details : ", signup_details)
    console.log("JSON to send : ", { user_name: signup_details.user_name, user_password: signup_details.user_password, email: signup_details.user_email })
    return fetch(changeableUrl, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        credentials: "same-origin",
        body: JSON.stringify(signup_details)
    })
        .then(data => data.json())
}

function useTraceUpdate(props) {
    const prev = useRef(props);
    useEffect(() => {
        const changedProps = Object.entries(props).reduce((ps, [k, v]) => {
            if (prev.current[k] !== v) {
                ps[k] = [prev.current[k], v];
            }
            return ps;
        }, {});
        if (Object.keys(changedProps).length > 0) {
            console.log('Changed props:', changedProps);
        }
        prev.current = props;
    });
}

function SignupComponent(props) {
    const [signup_details, setSignupDetails] = useState({ user_name: "", user_password: "", user_email: "" });

    const handleSubmit = async e => {
        e.preventDefault();
        const token = await loginUser(signup_details);
        console.log("Token : ", token)
        if (token.token != null) {
            console.log("Got token, closing signup")
            props.setAuth(!props.auth);
            props.setOpenSignup(false);
        }
        props.setToken(token);
    }

    useTraceUpdate(props);

    const handleCloseSignup = () => {
        props.setOpenSignup(false);
    };

    const handleChange = (event) => {
        setSignupDetails(prevState => ({
            ...prevState,
            [event.target.id]: event.target.value
        }));
    };

    return (
        <div>
            <Dialog
                open={props.open_signup}
                //onClose={handleCloseSignup}
                aria-labelledby="form-dialog-title"
            >
                <DialogTitle id="form-dialog-title">Signup</DialogTitle>
                <DialogContent>
                    <DialogContentText>
                        Please enter the username, password and email you wish to sign up
                        with.
                    </DialogContentText>
                    <TextField
                        autoFocus
                        margin="dense"
                        id="user_name"
                        required
                        label="Username"
                        placeholder="Username"
                        type="text"
                        fullWidth
                        onChange={handleChange}
                    />
                    <TextField
                        margin="dense"
                        id="user_password"
                        required
                        label="Password"
                        placeholder="Password"
                        type="password"
                        fullWidth
                        onChange={handleChange}
                    />
                    <TextField
                        margin="dense"
                        id="user_email"
                        required
                        label="Email"
                        placeholder="Email"
                        type="email"
                        fullWidth
                        onChange={handleChange}
                    />
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleCloseSignup} color="primary">
                        Cancel
                </Button>
                    <Button onClick={handleSubmit} color="primary">
                        Signup
                </Button>
                </DialogActions>
            </Dialog>
        </div>

    );
}

export default SignupComponent;
