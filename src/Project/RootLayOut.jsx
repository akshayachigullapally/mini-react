import React from 'react'
import Header from './Header'
import { Outlet } from 'react-router-dom'

function RootLayOut() {
  return (
    <div>
        <Header />
        <div style={{minHeight:'100vh'}}>
            <Outlet />
        </div>
       
    </div>
  )
}

export default RootLayOut