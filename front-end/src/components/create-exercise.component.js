import React, { useState,useEffect } from 'react'
import { useHistory } from 'react-router-dom'
import DatePicker from 'react-datepicker'
import 'react-datepicker/dist/react-datepicker.css'
import axios from 'axios'
import Input from './input-field.component'


function CreateExercise(){

    const history = useHistory();
    const [form, setState] = useState({
        username: '',
        description: '',
        duration:'',
        date: new Date()
    })
    const [items,setItem] = useState([])

    const fetchURL = '/api/users/'

    useEffect(() => {
        let unmounted = false;
        
        async function getUsers() {
          const response = await fetch(fetchURL);
          const json = await response.json();
          if (!unmounted){
            setItem(json.map(res => res.username))
            setState({
                ...form, 
                username : json[0].username 
            })
          }
        }
        getUsers();
        return () => {
            unmounted = true;
        }
      },[]);


    function handleChange(event){   
        setState({
            ...form, 
            [event.target.name] : event.target.value
        })
    }

    function handleDate(date){
        setState(prevValues =>{
            const newForm = {...prevValues}
            newForm.date = date
            return newForm
        })
    }
    
    function handleSubmit(event) {
        axios.post('/api/exercise/add',form)
            .then(res => console.log(res.data))
        console.log(form)
        setState({
            username: '',
            description: '',
            duration:0,
            date: new Date()
        })
        event.preventDefault()
        history.push('/')
    }

    return (
        <div className='container'>
        <h3>Create New Exercise</h3>
        <br />
        <form >
            <div className='form-group'>
                    <label> User </label>
                    <select className='form-control'  onChange={handleChange} name='username'>
                    {items.map(user =>  <option key = {user} value={user}>{user}</option>)}
                    </select>
            </div>
            <Input label='Description' value={form.description} type='text' placeholder='Enter Description' className='form-control' name='description' onChange={handleChange}/>
            <Input label='Duration (in Minutes)' value={form.duration} type='text' placeholder='Enter Duration' className='form-control' name='duration' onChange={handleChange}/>
            <div className='form-group'>
                <label> Date</label>
                <div>
                <DatePicker 
                    selected= {form.date}
                    onChange={handleDate}
                    peekNextMonth
                    showMonthDropdown
                    showYearDropdown
                    dropdownMode="select"
                />
                </div>
 
            </div>

            <button className='btn btn-primary' onClick={handleSubmit}> Create Exercise Log</button>

        </form>
            
        </div>
    )
}

export default CreateExercise