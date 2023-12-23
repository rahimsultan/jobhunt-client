import { useQuery } from "@tanstack/react-query";
import React from "react";
import { Helmet } from "react-helmet-async";
import toast from "react-hot-toast";
import { BounceLoader } from "react-spinners";
import useGetDate from "../Utils/useGetDate";
import useAuth from "../hooks/useAuth";
import useAxios from "../hooks/useAxios";

const BidRequest = () => {
  const axios = useAxios();
  const { user } = useAuth();

  const getData = () => {
     const res = axios.get(`/api/jobs/bid-request?email=${user?.email}`)
      .then((res) => res.data);

      return res
  }
  
  const { data, isLoading, isError, refetch } = useQuery({
    queryKey: ['fetch-data'],
    queryFn: getData
  });

  // console.log(data);

  

  const handleBidAccept=(id)=>{
    axios.patch(`/api/jobs/bid-request/${id}`, {status: 'accept'})
    .then(res=> {
        console.log(res.data)
        if(res.data.modifiedCount >0){
            toast.success('job status updated')
            refetch()
        }else{
            toast.error('No records updated')
        }
    })
  
  }

  const handleBidReject=(id)=>{
    axios.patch(`/api/jobs/bid-request/${id}`, {status: 'reject'})
    .then(res=> {
        console.log(res.data)
        if(res.data.modifiedCount >0){
            toast.success('job status updated')
            refetch()
        }else{
            toast.error('No records updated')
        }
    })

  }


  return (
    <>
    {isLoading ? <div className="flex justify-center items-center my-10"><BounceLoader color="#36d7b7"/></div> :
      data?.length === 0 ?
      <div>
        <p className="text-red-500 my-10 text-xl">No Bid Request Yet</p>
      </div> :
    
      <div className="overflow-x-auto md:my-10 my-5 text-left rounded-lg border border-gray-200">
        <Helmet>
          <title>Jobhunt || Bid Request</title>
        </Helmet>
        <table className="min-w-full divide-y-2 divide-gray-200 bg-white text-sm">
          <thead className="ltr:text-left rtl:text-right">
            <tr>
              <th className="whitespace-nowrap px-4 py-2 font-medium text-gray-900">
                Job Title
              </th>
              <th className="whitespace-nowrap px-4 py-2 font-medium text-gray-900">
                Applicant Email
              </th>
              <th className="whitespace-nowrap px-4 py-2 font-medium text-gray-900">
                Price
              </th>
              <th className="whitespace-nowrap px-4 py-2 font-medium text-gray-900">
                Start Date
              </th>
              <th className="whitespace-nowrap px-4 py-2 font-medium text-gray-900">
                End Date
              </th>
              <th className="whitespace-nowrap px-4 py-2 font-medium text-gray-900">
                Status
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200">
            {
            data.map((job, idx) => (
              <tr key={idx}>
                <td className="whitespace-nowrap px-4 py-2 font-medium text-gray-900">
                  {job?.job_title || "Demo Title"}
                </td>
                <td className="whitespace-nowrap px-4 py-2 text-gray-700">
                  {job?.employeeEmail}
                </td>
                <td className="whitespace-nowrap px-4 py-2 text-gray-700">
                  ${job?.bidAmount}
                </td>
                <td className="whitespace-nowrap px-4 py-2 text-gray-700">
                  {useGetDate(job.startDate)}
                </td>
                <td className="whitespace-nowrap px-4 py-2 text-gray-700">
                  {useGetDate(job.endDate)}
                </td>
                <td className="whitespace-nowrap px-4 py-2 text-gray-700 cursor-pointer">
                  {job.status === 'complete' ? <button className="bg-green-400 px-2 py-1 rounded text-white font-semibold">Completed</button>:
                    job.status === 'accept' ? <button className="bg-green-400 px-2 py-1 rounded text-white font-semibold">Accepted</button> : job.status === 'reject' ? <button className="bg-red-400 px-2 py-1 rounded text-white font-semibold">Rejected</button> : <div className="flex gap-2">
                      <button onClick={()=>handleBidAccept(job._id)} className="bg-green-400 px-2 py-1 rounded text-white font-semibold">Accept</button>
                  <button onClick={()=>handleBidReject(job._id)} className="bg-red-400 px-2 py-1 rounded text-white font-semibold">Reject</button>
                    </div>
                  }
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      }
    </>
  );
};

export default BidRequest;
