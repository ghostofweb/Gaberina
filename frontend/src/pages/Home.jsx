import React from 'react'
import Hero from '../components/Hero'
import Hero2 from '../components/Hero2'
import Features from '../components/Features'
import NewsLetterBox from '../components/NewsLetterBox'
import LatestCollection from '../components/BestSeller'

const Home = () => {
  return (
    <div>
<Hero/>
<Hero2/>
<LatestCollection/>
<Features/>
<NewsLetterBox/>
  </div>
  )
}

export default Home