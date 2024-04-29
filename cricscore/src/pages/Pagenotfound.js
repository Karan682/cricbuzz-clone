import React from 'react'
import { Link } from 'react-router-dom';
import Layouts from './../components/Layouts/layout';

const Pagenotfound = () => {
  return (
    <Layouts>
        <div className='pnf'>
          <h1 className='pnf-title'>404</h1>
          <h2 class="pnf-heading">Oops ! Page Not</h2>
        <Link to='/' className="pnf-btn">GO BACK</Link>
        </div>
    </Layouts>
  )
}

export default Pagenotfound