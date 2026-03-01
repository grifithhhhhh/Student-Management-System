import React from 'react'
import Card from '../../components/adminComponents/Card'
const Dashboard = () => {
  return (
    <div className='bg-[#634cce]  p-2  w-full h-full mr-5 rounded-2xl'>

      <div className='bg-black p-4 mb-8 rounded-3xl' >
        <h1 className=' text-8xl text-white font-extrabold '>This is Dashboard with Fake Stats</h1>
      </div>
      <div className='flex flex-wrap'>
      <Card name='Student' count='55' />
      <Card name='Teacher' count='10' />
      <Card name='Classes' count='10' />
      <Card name='Attended' count='75' />
      </div>
    </div>
  )
}

export default Dashboard