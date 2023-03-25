import React from 'react'

interface TypeProps {
    message: string;
    time?: string;
  }

export default function BoxMessagesUser({message,time}:TypeProps) {
    return (
        <div className='flex justify-end'>
        <div className='bg-primary max-w-[20rem] lg:max-w-lg p-5 pb-3 rounded-xl rounded-tr-none'>
          <p className='text-white text-sm font-light text-left break-words '>{message}</p>
          {time?<div className='flex text-xs justify-end text-time'>10:00</div>:null}
        </div>
    </div>
  )
}
