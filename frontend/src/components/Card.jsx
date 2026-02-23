import React from 'react'

const Card = (props) => {
  return (
    <div className='bg-amber-200 w-40 h-40 text-2xl flex flex-col border-2 justify-center items-center rounded-3xl m-3 text-black'>
        <h1 className='text-3xl font-bold '>{props.name}</h1>
        <h1 className='text-3xl font-bold'>{props.count}</h1>
    </div>
  )
}

export default Card