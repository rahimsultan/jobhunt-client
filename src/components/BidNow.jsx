import { parseISO } from 'date-fns';
import React, { useState } from "react";
import DatePicker from "react-datepicker";
import 'react-datepicker/dist/react-datepicker.css';
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import useAuth from "../hooks/useAuth";
import useAxios from "../hooks/useAxios";

const BidNow = ({data}) => {
    const {user}= useAuth()
    const axios = useAxios()
    const navigate =useNavigate()
    

    const userEmail = user?.email

    const {email, job_title, minPrice, maxPrice, startDate, endDate, description, category, author, _id} = data

    const [updateStartDate, setUpdateStartDate] = useState(parseISO(startDate))
  const [updateEndDate, setUpdateEndDate] = useState(parseISO(endDate))


    const handleBid=(e)=>{
      e.preventDefault()
      const form = e.target;
      const bidAmount = form.amount.value
      const employeeEmail = form.email.value;
      // const startDate = form.sdate.value;
      // const endDate = form.edate.value;
      const authorEmail = email

      const appliedJobInfo = {job_title,bidAmount, employeeEmail, startDate:updateStartDate, endDate:updateEndDate, authorEmail, status:'pending'}
      axios.post('/api/jobs/applied', appliedJobInfo)
      .then(res=>{
        if(res.data.insertedId){
          toast.success('Job Applied')
          navigate('/my-bids')
        }
      })
      // console.log(appliedJobInfo);

    }
    
  return (
    <div className="bg-white p-5 rounded-md">
      <form onSubmit={handleBid} className="space-y-5">
        <div>
          <input
            type="text"
            required
            name="amount"
            className="w-full mt-2 px-3 py-2 text-gray-500 bg-transparent outline-none border focus:border-indigo-600 shadow-sm rounded-lg"
            placeholder="Your Bidding Amount"
          />
        </div>
        <div className="text-left flex gap-3 flex-col sm:flex-row">
            <div className='w-full'>
            <label className="font-medium text-gray-500">Start Date</label>
            <DatePicker className='border w-full outline-none rounded-md p-2 text-gray-500 font-semibold' dateFormat="dd/MM/yyyy" selected={updateStartDate} minDate={parseISO(startDate)} maxDate={updateEndDate}  onChange={(date)=>setUpdateStartDate(date)}/>
                {/* <input
                type="date"
                name="sdate"
                required
                placeholder="deadline"
                className="w-full mt-2 px-3 py-2 text-gray-500 bg-transparent outline-none border focus:border-indigo-600 shadow-sm rounded-lg"
              /> */}
            </div>
            <div className='w-full'>
            <label className="font-medium text-gray-500">End Date</label>
            <DatePicker className='border w-full outline-none rounded-md p-2 text-gray-500 font-semibold' dateFormat="dd/MM/yyyy" selected={updateEndDate} minDate={updateStartDate} maxDate={parseISO(endDate)}  onChange={(date)=>setUpdateEndDate(date)}/>
                {/* <input
                type="date"
                name="edate"
                required
                placeholder="deadline"
                className="w-full mt-2 px-3 py-2 text-gray-500 bg-transparent outline-none border focus:border-indigo-600 shadow-sm rounded-lg"
              /> */}
            </div>
        </div>
        <div className="text-left">
          <label className="font-medium text-gray-500">Your Email</label>
          <input
            type="email"
            name="email"
            value={user?.email}
            readOnly
            className="w-full mt-2 px-3 py-2 text-gray-500 bg-transparent outline-none border focus:border-indigo-600 shadow-sm rounded-lg"
          />
        </div>
        <button disabled={userEmail === email || parseISO(endDate) < new Date() ? true : false}  type="submit" className="w-full px-4 py-2 text-white font-medium disabled:bg-gray-300 bg-indigo-600 hover:bg-indigo-500 active:bg-indigo-600 rounded-lg duration-150">
          Place Your Bid
        </button>
      </form>
      {
        parseISO(endDate) < new Date() ? <p className='my-2 text-red-500'>Date Experied You Can't apply to This Job</p> : undefined
      }
    </div>
  );
};

export default BidNow;
