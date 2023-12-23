import { useQuery } from "@tanstack/react-query";
import React, { useEffect, useState } from "react";
import { Helmet } from "react-helmet-async";
import toast from "react-hot-toast";
import { BounceLoader } from "react-spinners";
import useGetDate from "../Utils/useGetDate";
import useAuth from "../hooks/useAuth";
import useAxios, { instanceSecure } from "../hooks/useAxios";

const MyBids = () => {
  const axios = useAxios();
  const { user } = useAuth();
  const userEmail = user?.email;
  const [filter, setFilter] = useState('');

  // console.log(appliedJob);
  const statusLabels = {
    accept: "in progress",
    pending: "Pending",
    reject: "Canceled",
    complete: "Completed",
  };

  const getData = () => {
    const res = instanceSecure(`/api/jobs/applied?email=${userEmail}&sort=${filter}`).then(
      (res) => res.data
    );
    return res;
  };

  const { data, isLoading, isError, refetch } = useQuery({
    queryKey: ["fetch-data", filter],
    queryFn: getData,
    enabled: !!userEmail
  });
  // console.log(data);
  const handleComplete = (id) => {
    axios
      .patch(`/api/jobs/bid-request/${id}`, { status: "complete" })
      .then((res) => {
        // console.log(res.data)
        if (res.data.modifiedCount > 0) {
          toast.success("job status updated");
          refetch();
        } else {
          toast.error("No records updated");
        }
      });
  };

  useEffect(() => {}, []);

  return (
    <>
      <div>
        <select
          defaultValue={filter}
          onChange={(e) => setFilter(e.target.value)}
          name="HeadlineAct"
          id="HeadlineAct"
          className=" w-full mt-5 rounded-lg border-gray-300 p-2 border outline-none text-gray-700 sm:text-sm"
        >
          <option value="">All</option>
          <option value="complete">completed</option>
          <option value="pending">pending</option>
          <option value="reject">canceled</option>
          <option value="accept">in progress</option>
        </select>
      </div>
      {isLoading ? (
        <div className="flex justify-center items-center my-10">
          <BounceLoader color="#36d7b7" />
        </div>
      ) : data?.length === 0 ? (
        <div>
          <p className="my-5">No Data Found</p>
        </div>
      ) : (
        <div className="overflow-x-auto my-5 md:my-10 text-left rounded-lg border border-gray-200">
          <Helmet>
            <title>Jobhunt || My Bids</title>
          </Helmet>
          <table className="min-w-full  divide-y-2 divide-gray-200 bg-white text-sm">
            <thead className="ltr:text-left rtl:text-right">
              <tr>
                <th className="whitespace-nowrap px-4 py-2 font-medium text-gray-900">
                  Job Title
                </th>
                <th className="whitespace-nowrap px-4 py-2 font-medium text-gray-900">
                  Buyer Email
                </th>
                <th className="whitespace-nowrap px-4 py-2 font-medium text-gray-900">
                  Bid Amount
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
              {data.map((job, idx) => (
                <tr key={idx}>
                  <td className="whitespace-nowrap px-4 py-2 font-medium text-gray-900">
                    {job?.job_title || "Demo Title"}
                  </td>
                  <td className="whitespace-nowrap px-4 py-2 text-gray-700">
                    {job?.authorEmail}
                  </td>
                  <td className="whitespace-nowrap px-4 py-2 text-gray-700">
                    {job?.bidAmount}
                  </td>
                  <td className="whitespace-nowrap px-4 py-2 text-gray-700">
                    {useGetDate(job.startDate)}
                  </td>
                  <td className="whitespace-nowrap px-4 py-2 text-gray-700">
                    {useGetDate(job.endDate)}
                  </td>
                  <td className="whitespace-nowrap px-4 py-2 flex gap-2 text-gray-700 cursor-pointer">
                    <span className="bg-red-200 py-1 px-2 rounded-sm">
                      {statusLabels[job.status] || job.status}
                    </span>
                    {job.status === "accept" && (
                      <button
                        onClick={() => handleComplete(job._id)}
                        className="bg-green-500 px-2 py-1 rounded text-white"
                      >
                        complete
                      </button>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </>
  );
};

export default MyBids;
