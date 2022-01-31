import './App.css';
import Log from './components/Log.js'
import {checkAuthenticated,load_user}  from './actions/auth'
import {
  BrowserRouter as Router,
  Switch,
  Route,
} from "react-router-dom";
import React,{useEffect} from 'react'
import { connect } from 'react-redux';
import Upload from "./components/Upload.js"
import Subject from "./components/Subject.js"

import { ToastContainer } from 'react-toastify';


function App(props) {
  useEffect(() => {
    props.checkAuthenticated();
    props.load_user();
    localStorage.setItem('subject',-1)
  }, [props])

 
  return (
    <Router>
     
      <div className="App">

        <Switch>
            <Route exact path='/'>
                  <Log/>
                  <ToastContainer />
            </Route>

            <Route path="/subject/:batch/:semester/:course/:subject/">
                <Subject/>
                <ToastContainer />
            </Route>

            <Route path="/upload">
                <Upload />
                <ToastContainer />
            </Route>

        </Switch>
      </div>

    </Router>
  );
}

const mapStateToProps = state => ({
  isAuthenticated: state.auth.isAuthenticated
});



export default connect(mapStateToProps,{checkAuthenticated,load_user})(App);
