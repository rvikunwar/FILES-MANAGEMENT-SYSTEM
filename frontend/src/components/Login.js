import React,{ useState } from 'react'
import "./css/login.css"
import {
    Redirect,
  } from "react-router-dom";
import { connect } from 'react-redux';
import { login } from '../actions/auth';
import TextField from '@material-ui/core/TextField';
import {  toast } from 'react-toastify';
import { Button } from '@material-ui/core';
import { useHistory } from 'react-router';



function Login({ login, isAuthenticated }) {
    const [formdata, setFormdata] = useState({
        password: '',
        username: '' 
    });

    const {username, password } = formdata;

    const onSubmit = e => {
       login(username, password);
    };

    if (isAuthenticated) {
        return <Redirect to='/upload' />
    }

    return (
      
        <div className="login">

            <div className="w-full  flex justify-center flex-col items-between mt-3 px-64">
            <p className="font-text font-large mb-2 text-left">Login to your account</p>
            <div className="flex justify-between w-full mt-2">

                    <TextField 
                            className="w-45"
                            name="username" 
                            label="Username"
                            variant="outlined" 
                            type="name"
                            value={formdata.username}  
                            onChange={(e)=>{
                                setFormdata({
                                    ...formdata,
                                    [e.target.name]: e.target.value
                                })
                            }}
                            />

                            
                    <TextField 
                            className="w-45"
                            type="password"
                            name="password" 
                            label="Password"
                            variant="outlined" 
                            value={formdata.password}  
                            onChange={(e)=>{
                                setFormdata({
                                    ...formdata,
                                    [e.target.name]: e.target.value
                                })
                            }}
                            />

                    </div>
                    <div className="mt-3">
                            <Button variant="contained" 
                            className="w-32 h-9"
                                color="primary"
                                onClick={()=>{
                                    onSubmit()
                                }}>
                                Login 
                            </Button>
                        </div>
            </div>
                        
        </div>
  
    )
}
const mapStateToProps = state => ({
    isAuthenticated: state.auth.isAuthenticated
});

export default connect(mapStateToProps, { login })(Login);
