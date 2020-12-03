import React from 'react'
import { Link } from 'react-router-dom'


function NavBar(){

    return (
        <div>
            <nav className="navbar navbar-expand-lg navbar-light bg-light">
                <Link to='/' className="navbar-brand"> Exercise Tracker </Link>
                <div >
                <ul className="navbar-nav mr-auto">
                    <li className="nav-item active">
                        <Link to='/' className="nav-link"> Excercises</Link>
                    </li>
                    <li className="nav-item">
                        <Link to='/create' className="nav-link"> Create Exercise Logs</Link>
                    </li>
                    <li className="nav-item">
                        <Link to='/user' className="nav-link"> Create User</Link>
                    </li>
                </ul>
                </div>
            </nav>
        </div>
    )
}







export default NavBar