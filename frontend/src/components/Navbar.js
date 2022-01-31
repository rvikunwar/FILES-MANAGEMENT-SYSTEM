import React from 'react'
import "./css/navbar.css"
import {
  useHistory
 } from "react-router-dom";
import { connect } from 'react-redux';

function Navbar({isAuthenticated}) {
  const history=  useHistory()
    return (
        <div className="navbar flex justify-start items-center h-16" id="toppp">
            
            <p className="font-nav-header text-2xl ml-4">Content management system</p>
              {isAuthenticated===true?
                     <a onClick={()=> history.push('/uploads')} className="font-text font-bold ml-12 cursor-pointer">Home</a>:
                     <a onClick={()=> history.push('/')} className="font-text font-bold ml-12 cursor-pointer">Home</a>
                     }
        </div>
    )
}


const mapStateToProps = state => ({
    isAuthenticated: state.auth.isAuthenticated
  });
  
  
export default  connect(mapStateToProps)(Navbar)
