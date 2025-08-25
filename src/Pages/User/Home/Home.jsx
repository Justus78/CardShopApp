import React from 'react'
import Navbar from '../../../Components/User/Navbar'
import { assets } from '../../../assets/assets'

const Home = () => {
  return (
    <>
      <Navbar />
      <button>
        <a href="/User/viewProducts">Products</a>
      </button>
      <div className='border h-200'>
        <img src={assets.EOTPic} alt="Edge of Eternities picture." className='object-fill w-full'/>
      </div>
      {/** below I need a div that has 5 images of the same size, these images will be associated with the most recent magic the
       * gathering set and be linked to the product page showing cards from that set
       * for now we will use the default image from the assets file and the images will be lined up horizontally
       */}

    </>
  )
}

export default Home