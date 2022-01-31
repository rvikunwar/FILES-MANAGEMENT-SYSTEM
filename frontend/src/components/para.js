import React, {useState} from 'react'

function Para({subject, id}) {

    const [select, setSelect]= useState(true)
    return (
        <div>
            <p onClick={(e)=>{
                        setSelect(!select)
                        localStorage.setItem("subject",id)                        
                        }} className={`${select? '':'bg-white text-black'} subject font-text font-meduim`}>{subject}</p> 
        </div>
    )
}

export default Para
