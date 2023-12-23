import {
    createBrowserRouter
} from "react-router-dom";
import Error from "../components/Error";
import Home from "../components/Home";
import Layout from "../layout/Layout";
import Addjob from "../pages/Addjob";
import BidRequest from "../pages/BidRequest";
import JobDetails from "../pages/JobDetails";
import Login from "../pages/Login";
import MyBids from "../pages/MyBids";
import MyPostedJob from "../pages/MyPostedJob";
import Register from "../pages/Register";
import UpdateJobPost from "../pages/UpdateJobPost";
import PrivateRoute from "./PrivateRoute";


  const routes = createBrowserRouter([
    {
      path: "/",
      element: <Layout/>,
      errorElement:<Error/>,
      children:[
        {
          path:'/',
          element: <Home/>,
          loader: ()=>fetch('https://job-hunt-server-kohl.vercel.app/api/job-category')
        },
        {
          path:'/add-job',
          element:<PrivateRoute><Addjob/></PrivateRoute>
        },
        {
          path:'/login',
          element:<Login/>
        },
        {
            path:'/register',
            element:<Register/>
        },
        {
          path: '/job/:id',
          element: <PrivateRoute><JobDetails/></PrivateRoute>,
          loader: ({params})=> fetch(`https://job-hunt-server-kohl.vercel.app/api/job/${params.id}`)
        },
        {
          path: '/my-bids',
          element: <PrivateRoute><MyBids/></PrivateRoute>
        },
        {
          path: '/my-posted-job',
          element: <PrivateRoute><MyPostedJob/></PrivateRoute>
        },
        {
          path:'/job/update/:id',
          element:<PrivateRoute><UpdateJobPost/></PrivateRoute>,
          loader: ({params})=> fetch(`https://job-hunt-server-kohl.vercel.app/api/jobs/my-posted-job/update/${params.id}`)
        },
        {
          path: 'bid-requests',
          element: <PrivateRoute><BidRequest/></PrivateRoute>,
        }
      ]
    },
  ]);

  export default routes