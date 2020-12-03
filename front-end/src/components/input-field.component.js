import React from 'react'


function Input(props){
    return (
    <div className='form-group'>
        <label> {props.label} </label>
        <input value={props.value} type={props.type} placeholder={props.placeholder} className='form-control' name={props.name} onChange={props.onChange} />
    </div>
    )
}

export default Input