import React from 'react';
import {Link} from 'react-router-dom'

const footer = () => {
  return (
    <div className='footer'>
        <h1 className='text-center'>
            All Right Reserved &copy; CricScore
        </h1>
        <p className='text-center mt-3'>
          <Link to="/about">about</Link>||
          <Link to="/contect">Contect Us</Link>
           

        </p>
    </div>
  )
}

export default footer;