import React from 'react'
import Form from './Form.js'
import Login from './Login.js'
import "./css/log.css"

function Log() {
    return (
         <div className = "first_page" >

        <Form />
        <div className = "or">
        <hr className = "line" /> <p className = "or_1" > o r </p><hr className="line"/>
        </div> 
        <Login/>


        </div>
    )
}

export default Log