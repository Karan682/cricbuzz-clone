import React from 'react'
import Header from './Header'
import Footer from './Footer'
import {ToastContainer} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const layout = ({children}) => {
  return (
    <div >
<Header/>
<main style={{minHeight :'70vh'}}>
  <ToastContainer />
    {children}
</main>
<Footer/>
    </div>
  )
}

export default layout;