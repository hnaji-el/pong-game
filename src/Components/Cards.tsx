import React from 'react'
import friendPicture from "../assets/friend.jpg"
import { Link } from 'react-router-dom'

export  function CardFriendOnline() {
  return (
    <Link to="/Messages" className='flex items-center justify-between hover:bg-backgroundHover p-2'>
    <div className='flex items-center gap-2'>
      <img src={friendPicture} alt="Friend" className='w-10 h-10 rounded-full' />
      <div className='flex flex-col gap-1'>
        <span className='text-primaryText text-sm w-36 overflow-hidden text-ellipsis whitespace-nowrap'>Username</span>
        <span className='text-secondaryText font-light text-xs'>Online</span>
      </div>
    </div>
    <span className='w-1.5 h-1.5 bg-online rounded-full'></span>
  </Link>
  )
}
