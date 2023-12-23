import React from 'react'
import { Helmet } from 'react-helmet-async'
import Gallery from './Gallery'
import HomeBanner from './HomeBanner'
import MySLider from './MySLider'
import Tabs from './Tabs'

const Home = () => {
  return (
    <div>
      <Helmet>
        <title>Jobhunt - Home</title>
      </Helmet>
        <HomeBanner/>
        <Tabs/>
        <MySLider/>
        <Gallery/>
    </div>
  )
}

export default Home