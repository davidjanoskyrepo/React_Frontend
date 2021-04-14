// login.component.js
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
async function loginUser(login_details) {
    let changeableUrl = `${url}api/login`;
    console.log("URL formed : ", changeableUrl)
    return fetch(changeableUrl, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        credentials: "same-origin",
        body: JSON.stringify(login_details)
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

function LoginComponent(props) {
    const [login_details, setLoginDetails] = useState({ user_name: "", user_password: "" });

    const handleSubmit = async e => {
        e.preventDefault();
        const token = await loginUser(login_details);
        console.log("Token : ", token)
        if (token.token != null) {
            console.log("Got token, closing login")
            props.setAuth(!props.auth);
            props.setOpenLogin(false);
        }
        props.setToken(token);
    }

    useTraceUpdate(props);

    const handleCloseLogin = () => {
        props.setOpenLogin(false);
    };

    const handleChange = (event) => {
        setLoginDetails(prevState => ({
            ...prevState,
            [event.target.id]: event.target.value
        }));
    };

    return (
        <div>
            <Dialog
                open={props.open_login}
                //onClose={handleCloseLogin}
                aria-labelledby="form-dialog-title"
            >
                <DialogTitle id="form-dialog-title">Login or Signup</DialogTitle>
                <DialogContent>
                    <DialogContentText>
                        To login please enter the username and password you signed up
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
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleCloseLogin} color="primary">
                        Cancel
                    </Button>
                    <Button onClick={handleSubmit} color="primary">
                        Login
                    </Button>
                </DialogActions>
            </Dialog>
        </div>

    );
}

export default LoginComponent;
