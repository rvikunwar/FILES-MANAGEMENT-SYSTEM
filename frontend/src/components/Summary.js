import React,{useState,useEffect} from 'react'
import "./css/summary.css"

function Summary(props) {

    const [ data ,setData ] = useState([])

    useEffect(()=>{
        let data = []
        if(props.show===true){

      
        props.subdata.map((item)=>{
            data.push(item.chapter)
        })
        setData(data)
    }
    },[props])

    return (
        <div className="summary mt-46 z-10">
            {(props.show===true)?
                data.map((s,c)=>(
                <a key={c} href={`#${s}`} className="summ">{s}
                </a>    
            )):null}

            {/* {
                (props.ss)?
                props.ss.map((s,c)=>(
                    <a key={c} href={`#${s["id"]}ab`}  className="summ">{s["chap"]}</a>
                )):<></>
            } */}
        </div>
    )
}

export default Summary
