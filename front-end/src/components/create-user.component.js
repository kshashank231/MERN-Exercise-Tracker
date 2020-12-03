import React, { useState } from 'react'
import axios from 'axios'
import Input from './input-field.component'

function CreateUser(){

    const [user,setUser] = useState({username:''})

    function handleChange(event){
        const newUser = event.target.value
        setUser({[event.target.name]:newUser})
    }
    function handleSubmit(event){
        axios.post('/api/users/add',user)
            .then(res => console.log(res.data));
        setUser({username:''})
        event.preventDefault()
    }
    return (
        <div className='container'>
        <h1> Create New User</h1>
        <br />
        <form >
            <Input label='Username' value={user.username} type='text' placeholder='Enter new user' className='form-control' name='username' onChange={handleChange}/>
            <button className='btn btn-primary' onClick={handleSubmit}> Create user</button>
        </form>
        </div>

    )
}

export default CreateUser