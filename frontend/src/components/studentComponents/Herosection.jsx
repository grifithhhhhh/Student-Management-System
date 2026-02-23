import React from 'react'
import Introsection from './Introsection'
import Contentsection from './Contentsection'
import ShowCard from './ShowCard'

const Herosection = () => {
  return (
    <div className='flex flex-col'>
      <Introsection/>
      <div className='flex w-full  p-5'>
        <Contentsection/>
        <ShowCard/>
      </div>
    </div>
  )
}

export default Herosection