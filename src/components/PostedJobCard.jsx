import React from "react";
import { Link } from "react-router-dom";
import Swal from "sweetalert2";
import useGetDate from "../Utils/useGetDate";
import useAuth from "../hooks/useAuth";
import useAxios from "../hooks/useAxios";

const PostedJobCard = ({job, refetch}) => {
    const axios = useAxios()
    const {user} = useAuth()
    const userEmail = user?.email

  //  console.log(data);
    
    // console.log(item);
    const {email, job_title, minPrice, maxPrice, startDate, endDate, description, category, author, _id} = job

    const handlePostDelete=()=>{
        
        Swal.fire({
            title: "Are you sure?",
            text: "You won't be able to revert this!",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Yes, delete it!"
          }).then((result) => {
            if (result.isConfirmed) {
                // axios function
                axios.delete(`/api/jobs/my-posted-job/delete/${_id}`)
                .then(res =>{
                    if(res.data.deletedCount > 0){
                        Swal.fire({
                            title: "Deleted!",
                            text: "Your file has been deleted.",
                            icon: "success"
                          });
                          refetch()
                    }
                })
                // axios function
              
            }
          });

        
    }

  return (
    <>
    <div className="rounded-md border">
        <div className=" bg-blue-400 h-[120px] flex justify-center items-center">
        <h1 className="text-lg font-semibold">{job_title}</h1>
        </div>
      <div className="p-4 text-left">
        <p className="mt-3 text-sm text-gray-600">
        {description.length > 50 ? description.slice(0, 50) + '...' : description}
        </p>
        <div className="text-center my-5">
            <p className="bg-green-200 py-1  rounded-md text-gray-600 font-semibold">Price: ${minPrice}-${maxPrice}</p>
            <p className="bg-green-100 py-1 my-2  rounded-md text-gray-600 font-semibold">Start:{useGetDate(startDate)} End:{useGetDate(endDate)}</p>
        </div>
        <div className="flex gap-3">
        <button
        onClick={handlePostDelete}
          type="button"
          className="mt-4 rounded-sm bg-black px-2.5 py-2 text-[12px] font-semibold text-white shadow-sm hover:bg-black/80 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-black"
        >
          Delete
        </button>
        <Link to={`/job/update/${_id}`} className="w-full">
        <button
          type="button"
          className="mt-4 w-full rounded-sm bg-black px-2.5 py-2 text-[12px] font-semibold text-white shadow-sm hover:bg-black/80 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-black"
        >
          Update
        </button>
        </Link>
        </div>
      </div>
    </div>
    </>
  );
};

export default PostedJobCard;
