import React from 'react'
import { Link } from 'react-router-dom'


function Exercise(props){
    const {_id, duration, description,username,date} = props.details
    return (
        <tr>
            <td>{username}</td>
            <td>{description}</td>
            <td>{duration}</td>
            <td>{date.substring(0,10)}</td>
            <td><Link to={'/edit/'+_id}> <button className='btn btn-primary'> edit </button></Link> <button className='btn btn-primary' onClick={()=>props.delete(_id)}>Delete</button></td>
        </tr>

    )
}

export default Exercise