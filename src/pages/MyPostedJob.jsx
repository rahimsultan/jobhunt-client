import { useQuery } from "@tanstack/react-query";
import { Helmet } from "react-helmet-async";
import { BounceLoader } from "react-spinners";
import PostedJobCard from "../components/PostedJobCard";
import useAuth from "../hooks/useAuth";
import useAxios from "../hooks/useAxios";
// const loading = false

const MyPostedJob = () => {
  const axios = useAxios();
  const { user } = useAuth();

  const getData = () => {
    const res = axios.get(`/api/jobs/my-posted-jobs?email=${user?.email}`)
     .then((res) => res.data);

     return res
 }
 
 const { data, isLoading, isError, refetch } = useQuery({
   queryKey: ['fetch-data', user],
   queryFn: getData
 });
//  console.log(data);

  return (

    <>
      <Helmet>
        <title>Jobhunt || Posted Job</title>
      </Helmet>
      <h1 className="text-2xl my-5">Your Posted Job Here</h1>
      {isLoading ? <div className="my-10 flex justify-center items-center"><BounceLoader color="#36d7b7" /></div> :
      <div>
        {data?.length > 0 ? 
          <div className="grid grid-cols-1 gap-5 md:grid-cols-2 lg:grid-cols-4">
          {data?.map((job) => (
            <PostedJobCard
              key={job._id}
              job={job}
              refetch={refetch}
            />
          ))}
        </div>
         : 
          <p className="text-red-500">Add A Job Post To See Here</p>
        }
      </div>}
    </>
  );
};

export default MyPostedJob;
