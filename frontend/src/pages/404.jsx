import React from 'react'
import Navbar from '../components/NavbarHome'
import { Link } from 'react-router-dom'

export default function NotFound() {
    return (
        <h1 className='notfound'>
            <div className='err'>Error 404: page not found</div>
            <Link to="/">Return to home page</Link>
        </h1>
    )
}
