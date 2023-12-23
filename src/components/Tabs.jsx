import { Tab } from '@headlessui/react';
import { useEffect, useState } from 'react';
import { useLoaderData } from 'react-router-dom';
import useAxios from '../hooks/useAxios';
import JobCard from './JobCard';

function classNames(...classes) {
  return classes.filter(Boolean).join(' ')
}

function Tabs() {
    const categories = useLoaderData()
    // console.log(categories);
    const axios = useAxios()
    // const {data, isLoading, isError} = useQuery({
    //     queryKey:['category'],
    //     queryFn: ()=> axios.get(`/api/jobs/category?category=${selectedTab}`)
    // })

    // console.log(data);
    const [selectedTab, setSelectedTab] = useState("Web Development");
  const [tabContent, setTabContent] = useState([]);


  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(`/api/jobs/category?category=${selectedTab}`);
        const data = response.data;
        setTabContent(data);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };
  
    fetchData(); // Call the function when the tab changes
  }, [selectedTab]);

    //   console.log(tabContent);

  return (
    <div className="w-full px-2 py-16 sm:px-0">
      <Tab.Group >
        <Tab.List className="flex flex-wrap md:flex-nowrap space-x-1 rounded-xl bg-blue-900/20 p-1">
            {
                categories.map(category=> (<Tab
                    onClick={()=>setSelectedTab(category.name)}
                    key={category._id}
                      className={({ selected }) =>
                        classNames(
                          'w-full rounded-lg py-2.5 text-sm font-medium leading-5 text-blue-700',
                          'ring-white/60 ring-offset-2 ring-offset-blue-400 focus:outline-none focus:ring-2',
                          selected
                            ? 'bg-white shadow'
                            : 'text-blue-100 hover:bg-white/[0.12] hover:text-white'
                        )
                      }
                    >
                      {category.name}
                    </Tab>))
            }

            
        </Tab.List>
        <Tab.Panels className="mt-2">
            {
                categories.map(category=>(<Tab.Panel
                key={category._id}
                      className={classNames(
                        'rounded-xl bg-white p-3',
                        'ring-white/60 ring-offset-2 ring-offset-blue-400 focus:outline-none focus:ring-2'
                      )}
                    >
                        <div className='grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-4 '>
                            {
                                tabContent?.map((item, idx)=> <JobCard key={idx} item={item}/>)
                            }
                        </div>
                        
                    </Tab.Panel>))
            }
        </Tab.Panels>
      </Tab.Group>
    </div>
  )
}


export default Tabs
