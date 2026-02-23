import React from 'react'
import Card from '../../components/Card'

const Dashboard = () => {
  return (
    <div className='bg-[#634cce] flex flex-wrap p-2  w-fit h-full mr-5 rounded-2xl'>

      <Card name='Student' count='55' />
      <Card name='Teacher' count='10' />
      <Card name='Classes' count='10' />
      <Card name='Attended' count='75' />
    </div>
  )
}

export default Dashboard