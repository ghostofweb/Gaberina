import React from 'react'
import Hero from '../components/Hero'
import Hero2 from '../components/Hero2'
import LatestCollection from '../components/BestSeller'
import Features from '../components/Features'
import NewsLetterBox from '../components/NewsLetterBox'

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