import React from "react";
import { Link } from "react-router-dom";
import useGetDate from "../Utils/useGetDate";

const JobCard = ({item}) => {
    // console.log(item);
    const {email, job_title, minPrice, maxPrice, startDate, endDate, description, category, author, _id} = item
  return (
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
        <Link to={`/job/${_id}`}>
        <button
          type="button"
          className="mt-4 w-full rounded-sm bg-black px-2.5 py-2 text-[12px] font-semibold text-white shadow-sm hover:bg-black/80 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-black"
        >
          Bid Now
        </button>
        </Link>
      </div>
    </div>
  );
};

export default JobCard;
