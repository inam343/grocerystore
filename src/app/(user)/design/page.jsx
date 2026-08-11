"use client"
import React from 'react'

const page = () => {
  const studentData=[
    {
      id: 1,
      name:'ali',
      rolno:234,
      class:'6th'
    },
        {
      id: 2,
      name:'inam',
      rolno:237,
      class:'7th'
    },
        {
      id: 3,
      name:'aslam',
      rolno:238,
      class:'8th'
    }
  ]

 const userData=[
    {
      id: 1,
      name:'ali',
      age:23,
      gender:'male'
    },
        {
      id: 2,
      name:'inam',
      age:32,
      gender:'male'
    },
        {
      id: 3,
      name:'aslam',
      age:39,
      gender:'male'
    }
  ]

const teacherData=[
{
  id:1,
  name:'Ali',
  age:25,
  salary:'25000'
},
{
  id:2,
  name:'Zainab',
  age:32,
  salary:'35000'
},
{
  id:3,
  name:'Aman',
  age:21,
  salary:'22000'
}

]
const number=[33,45,67,78,89,67,56,45]
const result=number.find(num=>num>=34 )

  return (
    <div className='flex flex-col items-center justify-center w-screen'>
      <div className='container shadow-md bg-amber-50  mx-5 my-5'>
        <div className="firs-box flex gap-8 mx-5 my-5">
          <div className="frst-box w-[33%] bg-[#043b6f] px-5 py-5 border-s-transparent rounded-xl h-[400px] shadow-5xl text-white">
            <h1 className='text-3xl font-[800] mx-6 my-6'>Digital <br /> Agencies</h1>
            <p className='text-[20px] mx-6 my-10   font-[700] '>Simplify life for your <br />clients and generate <br />recuring revenue by <br />offering more of what <br /> they need.</p>
          </div>
          <div className="scnd-box w-[70%] text-white px-5 py-5 rounded-xl  bg-[#043b6f]">
            <h1 className='text-3xl font-[800] mx-6 my-6'>Hosting Companies</h1>
            <p className='text-[20px] mx-6 my-10   font-[700] '>Resell on your own terms and increase margins by <br /> integrating our whitelabel products.</p>

          </div>
        </div>
        <div className="secnd-lay flex gap-8 mx-5 my-5">
          <div className="scnd-box w-[70%] text-white px-5 py-5 rounded-xl  bg-[#043b6f]">
            <h1 className='text-3xl font-[800] mx-6 my-6'>Hosting Companies</h1>
            <p className='text-[20px] mx-6 my-10   font-[700] '>Resell on your own terms and increase margins by <br /> integrating our whitelabel products.</p>

          </div>
          <div className="frst-box w-[33%] bg-[#043b6f] px-5 py-5 border-s-transparent rounded-xl h-[400px] shadow-5xl text-white">
            <h1 className='text-3xl font-[800] mx-6 my-6'>Digital <br /> Agencies</h1>
            <p className='text-[20px] mx-6 my-10   font-[700] '>Simplify life for your <br />clients and generate <br />recuring revenue by <br />offering more of what <br /> they need.</p>
          </div>
        </div>
      </div>
      <div className="table">
       <h1 className='text-2xl font-[600] ml-8'>Student data</h1>
       <div className='w-full flex gap-5 px-8 py-8 justify-around'>
        <div>
       <table className='border-1  '>
        <thead >
          <tr>
          <th className="border border-gray-300 p-2">Id</th>
          <th className="border border-gray-300 p-2">Name</th>
          <th className="border border-gray-300 p-2">Roll No</th>
          <th className="border border-gray-300 p-2">Class</th>
          </tr>
        </thead>
        <tbody>
         { studentData.map((user)=>
          (
            <tr key={user.id}>
            <td className="border border-gray-300 p-2">{user.id}</td>
            <td className="border border-gray-300 p-2">{user.name}</td>
            <td className="border border-gray-300 p-2">{user.rolno}</td>
            <td className="border border-gray-300 p-2">{user.class}</td>
          </tr>
          )

          )}
          
        </tbody>
       </table></div>
       <div>
      <table className='border-1 '>
        <thead >
          <tr>
          <th className="border border-gray-300 p-2">Id</th>
          <th className="border border-gray-300 p-2">Name</th>
          <th className="border border-gray-300 p-2">Age</th>
          <th className="border border-gray-300 p-2">Gender</th>
          </tr>
        </thead>
        <tbody>
        {
          userData.map((user)=>(
            <tr key={user.id}> 
            <td className="border border-gray-300 p-2">{user.id}</td>
            <td className="border border-gray-300 p-2">{user.name}</td>
            <td className="border border-gray-300 p-2">{user.age}</td>
            <td className="border border-gray-300 p-2">{user.gender}</td>
          </tr>
          )
          )
}
        </tbody>
       </table>
       </div>
        <div>
       <table className='border-1 '>
         <thead>
          <tr>
            <th className="border border-gray-300 p-2">ID</th>
            <th className="border border-gray-300 p-2">Name</th>
            <th className="border border-gray-300 p-2">Age</th>
            <th className="border border-gray-300 p-2">Salary</th>
          </tr>
         </thead>
         <tbody>
          {
            teacherData.map((user)=>(
                    <tr key={user.id}>
            <td className="border border-gray-300 p-2">{user.id}</td>
            <td className="border border-gray-300 p-2">{user.name}</td>
            <td className="border border-gray-300 p-2">{user.age}</td>
            <td className="border border-gray-300 p-2">{user.salary}</td>
          </tr>))
}
         </tbody>
       </table >
       <p>{result}</p>
       </div>
       </div>
      </div>
    </div>
  )
}

export default page
