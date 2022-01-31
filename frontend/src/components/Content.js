import React, { useState, useEffect } from 'react'
import './css/content.css'
import Data from './Data.js'
import axios from '../axios'

function Content(props) {

 
    return ( 
    <div className = "content">

        {  props.subdata.length!=0?
           props.subdata.map((data, c) => ( 
               <Data key={c}
                title={data.chapter}
                description={data.description}
                date={data.date}
                id={data.id}
                />
            )):
            <p className="text-black flex justify-center items-center h-full">No data</p>
        
    }


        </div>
    )
}


export default Content