
import { parseISO } from 'date-fns'
import React, { useState } from 'react'
import DatePicker from 'react-datepicker'
import 'react-datepicker/dist/react-datepicker.css'
import { Helmet } from 'react-helmet-async'
import toast from 'react-hot-toast'
import { useLoaderData } from 'react-router-dom'
import useAuth from '../hooks/useAuth'
import useAxios from '../hooks/useAxios'

const UpdateJobPost = () => {
    const data = useLoaderData()
    const {email, job_title, minPrice, maxPrice, startDate, endDate, description, category:cat, author, _id} = data
    const axios = useAxios()
  const [category, setCategory]= useState(cat)
  const [updateStartDate, setUpdateStartDate] = useState(parseISO(startDate))
  const [updateEndDate, setUpdateEndDate] = useState(parseISO(endDate))
  const {user} = useAuth()
//   console.log(data);

    const handleUpdateJob=(e)=>{
        e.preventDefault()
        const form = e.target;
        const email = form.email.value;
        const job_title= form.title.value;
        const minPrice = form.minprice.value;
        const maxPrice = form.maxprice.value;
        // const startDate = form.sdate.value;
        // const endDate = form.edate.value;
        const description = form.description.value;
        // const category = category;
    
        const allData ={email, job_title, minPrice, maxPrice, startDate:updateStartDate, endDate: updateEndDate, description, category, author: user.displayName}
        console.log(allData);
       axios.patch(`/api/jobs/my-posted-job/update/${_id}`, allData)
       .then(res=> {
        if(res.data.modifiedCount > 0){
            toast.success('Great Job Post Updated')
        }
       })
      }
      
  return (
    <div className=' mx-auto bg-green-50 py-10 px-5 rounded-md'>
      <Helmet>
        <title>Jobhunt || Update Job Post</title>
      </Helmet>
      <h1 className='my-5 text-3xl font-bold text-blue-500'>Update Your Job Post</h1>
      <form onSubmit={handleUpdateJob} className="space-y-5 max-w-4xl mx-auto bg-white p-10">
      <div className='flex flex-col sm:flex-row gap-3 items-center'>
      {/* select start */}
      <div className='w-full text-left'>
      <label
        htmlFor="HeadlineAct"
        className="font-medium text-gray-500"
      >
        Select Industry
      </label>

      <select
      defaultValue={category}
      onChange={(e)=>setCategory(e.target.value)}
        name="HeadlineAct"
        id="HeadlineAct"
        className="mt-1.5 w-full rounded-lg border-gray-300 p-2 border outline-none text-gray-700 sm:text-sm"
      >
        <option value="Web Development">Web Development</option>
        <option value="Digital Marketing">Digital Marketing</option>
        <option value="Graphics Design">Graphics Design</option>
      </select>
    </div>
      {/* select end */}
      <div className="text-left w-full">
          <label className="font-medium text-gray-500">Your Email</label>
          <input
            type="email"
            name="email"
            defaultValue={email}
            readOnly
            className="w-full mt-2 px-3 py-2 text-gray-500 bg-transparent outline-none border focus:border-indigo-600 shadow-sm rounded-lg"
          />
        </div>
      </div>
        <div>
          <input
            type="text"
            required
            name="title"
            defaultValue={job_title}
            className="w-full mt-2 px-3 py-2 text-gray-500 bg-transparent outline-none border focus:border-indigo-600 shadow-sm rounded-lg"
            placeholder="Job Title"
          />
        </div>
        <div className='flex gap-3 flex-col sm:flex-row'>
          <input
            type="text"
            required
            defaultValue={minPrice}
            name="minprice"
            className="w-full mt-2 px-3 py-2 text-gray-500 bg-transparent outline-none border focus:border-indigo-600 shadow-sm rounded-lg"
            placeholder="minimum price"
          />
          <input
            type="text"
            required
            name="maxprice"
            defaultValue={maxPrice}
            className="w-full mt-2 px-3 py-2 text-gray-500 bg-transparent outline-none border focus:border-indigo-600 shadow-sm rounded-lg"
            placeholder="maximum price"
          />
        </div>
        <div className="text-left flex gap-3 flex-col sm:flex-row">
            <div className='w-full'>
            <label className="font-medium text-gray-500">Start Date</label>
            <DatePicker className='border w-full outline-none rounded-md p-2 text-gray-500 font-semibold' dateFormat="dd/MM/yyyy" selected={updateStartDate} minDate={new Date()}  onChange={(date)=>setUpdateStartDate(date)}/>
                {/* <input
                type="date"
                name="sdate"
                defaultValue={startDate}
                required
                placeholder="deadline"
                className="w-full mt-2 px-3 py-2 text-gray-500 bg-transparent outline-none border focus:border-indigo-600 shadow-sm rounded-lg"
              /> */}
            </div>
            <div className='w-full'>
            <label className="font-medium text-gray-500">End Date</label>
            <DatePicker className='border w-full outline-none rounded-md p-2 text-gray-500 font-semibold' dateFormat="dd/MM/yyyy" selected={updateEndDate} minDate={updateStartDate} onChange={(date)=>setUpdateEndDate(date)}/>
                {/* <input
                type="date"
                name="edate"
                defaultValue={endDate}
                required
                placeholder="deadline"
                className="w-full mt-2 px-3 py-2 text-gray-500 bg-transparent outline-none border focus:border-indigo-600 shadow-sm rounded-lg"
              /> */}
            </div>
        </div>
        <div className="text-left">
          <input
            type="text"
            name="description"
            defaultValue={description}
            placeholder='enter job description'
            className="w-full mt-2 px-3 py-2 text-gray-500 bg-transparent outline-none border focus:border-indigo-600 shadow-sm rounded-lg"
          />
        </div>
        
        <button type="submit" className="w-full px-4 py-2 text-white font-medium bg-indigo-600 hover:bg-indigo-500 active:bg-indigo-600 rounded-lg duration-150">
          Update Job Post
        </button>
      </form>
    </div>
  )
}

export default UpdateJobPost