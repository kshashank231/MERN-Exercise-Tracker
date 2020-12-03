import React, { useState,useEffect } from 'react'
import { useHistory } from 'react-router-dom'
import DatePicker from 'react-datepicker'
import 'react-datepicker/dist/react-datepicker.css'
import axios from 'axios'
import Input from './input-field.component'

function EditExercise(props){
    const history = useHistory();
    const [form, setState] = useState({
        username: '',
        description: '',
        duration:'',
        date: new Date()
    })

    const id = props.match.params.id
    useEffect(() => {
        let unmounted = false;
        const fetchURL = '/api/exercise/'+id
        async function getExercise() {
          const response = await fetch(fetchURL);
          const json = await response.json();
          if (!unmounted){
            setState({ 
                username:json.username,
                description: json.description,
                duration:json.duration,
                date: new Date(json.date)
            })
          }
        }
        getExercise();
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
        axios.post('/api/exercise/'+id,form)
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
            <h1> Edit Exercise log of {form.username}</h1>
            <br />
            <form >
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
                <button className='btn btn-primary' onClick={handleSubmit}> Edit Exercise Log</button>
            </form>
        </div>
    )
}

export default EditExercise