import React from 'react'
import { Link } from 'react-router-dom'

export default function NotFound() {
    return (
        <h1 className='banner'>
            <div className='err'>Error 404: page not found</div>
            <Link to="/">Return to home page</Link>
        </h1>
    )
}
