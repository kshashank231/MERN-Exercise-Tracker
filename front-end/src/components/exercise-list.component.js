import React, { useState,useEffect } from 'react'
import { Link } from 'react-router-dom'
import Exercise from './exercise-log.component'
import axios from 'axios'

function ExerciseList(){

    const [items,setItem] = useState([])

    const fetchURL = '/api/exercise/'

    useEffect(() => {
        let unmounted = false;
        
        async function getExercise() {
          const response = await fetch(fetchURL);
          const json = await response.json();
          if (!unmounted){
            setItem(json)
            console.log(json)
          }
        }
        getExercise();
        return () => {
            unmounted = true;
        }
      },[]);

    function handleDelete(id){
        axios.delete('/api/exercise/'+id)
        .then(res => console.log(res.data));
        setItem(items.filter(x => x._id !== id))

    }


    return (
        <div className='container'>
            <h3> Logged Exercises </h3>
            <table className='table'>
            <thead className='thead-light'>
                <tr>
                    <th>Username</th>
                    <th>Description</th>
                    <th>Duration</th>
                    <th>Dates</th>
                    <th>Actions</th>
                </tr>
            </thead>
            <tbody>
                {items.map(item => <Exercise key={item._id} delete={handleDelete} details={item}/>)}
            </tbody>
            </table>
        </div>
    )
}

export default ExerciseList