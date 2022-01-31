import React,{useEffect,useState} from 'react'
import "./css/addnew.css"
import { connect } from 'react-redux';
import TextField from '@material-ui/core/TextField';
import {  toast } from 'react-toastify';


import axios from '../axios'
import { Button } from '@material-ui/core';
import { useHistory } from 'react-router';

function Addnew(props) {

    const [id_2,setuser]=useState()

    const [formdata, setFormdata ] = useState({
        batch:"",
        semester:"",
        course:"",
        subject:"",
        user:id_2
    })
    useEffect(()=>{
        const config = {
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `JWT ${localStorage.getItem('access')}`,
                'Accept': 'application/json'
            }
        };
        axios.get(`http://127.0.0.1:8000/auth/users/me/`, config)
        .then((res)=>{
            setuser(res.data["id"])
        })
           
    },[])

    const history = useHistory()

    const saveFormHandler= () => {

        axios.post("/contentrestriction/", formdata)
        .then(()=> {
            toast.success("Data is successfully saved")
            history.push("/upload")
        }).catch((err)=>{
            toast.error("Something went wrong, retry")
        })
  
    }


    return ( <div className = "addnew" id="addnew_1" >
                    <div className = "form-style-9" >
                  
                        <div className="flex justify-between mb-6">
                        <TextField id="bt"
                            className="w-45 mr-4"
                            name = "batch"
                            label="ENTER BATCH(2019-2023)"
                            variant="outlined"   
                            onChange={(e)=>{
                                setFormdata({
                                    ...formdata,
                                    [e.target.name]: e.target.value
                                })
                            }}
                            />

                        <TextField id="bt"
                            className="w-45"
                            name = "semester"
                            label="ENTER SEMESTER (1,2,3 . . )"
                            variant="outlined"   
                            onChange={(e)=>{
                                setFormdata({
                                    ...formdata,
                                    [e.target.name]: e.target.value
                                })
                            }}
                            />

                         </div> 
                         <div className="flex justify-between">
                         <TextField id="bt"
                            className="w-45"
                            name = "course"
                            label="ENTER COURSE(CSE,ELECTRONICS . . )"
                            variant="outlined"   
                            onChange={(e)=>{
                                setFormdata({
                                    ...formdata,
                                    [e.target.name]: e.target.value
                                })
                            }}
                            />
                        <TextField id="bt"
                            name = "subject"
                            className="w-45"
                            label="ENTER THE SUBJECT(EV, ES, MATHS  . . )"
                            variant="outlined"   
                            onChange={(e)=>{
                                setFormdata({
                                    ...formdata,
                                    [e.target.name]: e.target.value
                                })
                            }}
                            />
                         </div> 
                        <div className="mt-6">
                            <Button variant="contained" 
                            className="w-32 h-10"
                                color="primary"
                                onClick={()=>{
                                    saveFormHandler()
                                }}>
                                Save 
                            </Button>
                        </div>


            </div> 
        </div>
    
    )
}

export default connect(null, )(Addnew)