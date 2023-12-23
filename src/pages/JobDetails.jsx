import { Helmet } from "react-helmet-async";
import { useLoaderData } from "react-router-dom";
import useGetDate from "../Utils/useGetDate";
import BidNow from "../components/BidNow";



const JobDetails = () => {
    const data = useLoaderData()
    // console.log(data);
    const {email, job_title, minPrice, maxPrice, startDate, endDate, description, category, author, _id} = data
  return (
    <div className=" max-w-4xl p-5 bg-green-50 mx-auto my-10 justify-center items-center rounded-md border">
      <div>
        <div className="p-4 flex flex-col justify-center items-center">
          <h1 className="inline-flex items-center text-lg font-semibold">
            {job_title} 
          </h1>
          <Helmet>
            <title>Job - {job_title}</title>
          </Helmet>
          <p className="mt-3 text-sm text-gray-600">
           {description}
          </p>
          <div className="mt-4">
            <span className="mb-2 mr-2 inline-block md:text-[16px] rounded-full bg-gray-100 px-3 py-1 text-[10px] font-semibold text-gray-900">
              {category}
            </span>
            <span className="mb-2 mr-2 inline-block md:text-[16px] rounded-full bg-gray-100 px-3 py-1 text-[10px] font-semibold text-gray-900">
              from:{useGetDate(startDate)} to:{useGetDate(endDate)}
            </span>
            <span className="mb-2 mr-2 inline-block md:text-[16px] rounded-full bg-gray-100 px-3 py-1 text-[10px] font-semibold text-gray-900">
              Price: {minPrice}-{maxPrice}
            </span>
          </div>
          <div className="mt-3 flex items-center space-x-2 flex-col">
          <span className="text-[12px] font-medium text-gray-900">Author: {author}</span>
          <span className="text-[12px] font-medium text-gray-900">{email}</span>
          </div>
        </div>
      </div>
      <BidNow data={data}/>
    </div>
  )
}

export default JobDetails