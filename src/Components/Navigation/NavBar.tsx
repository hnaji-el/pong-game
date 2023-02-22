import React from 'react'
import logo from '../../assets/logo.svg'
import { Link } from 'react-router-dom'

export default function NavBar() {
  return (
  <section className='flex justify-center items-center pt-7'>
    <Link to="/" className='lg:hidden'>
        <img src={logo} alt="Pong logo" className='w-48' />
    </Link>
  </section>
  )
}
