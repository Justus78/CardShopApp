import React from 'react'
import Navbar from '../../../Components/User/Navbar'

const Home = () => {
  return (
    <>
      <Navbar />
      <button>
        <a href="/User/viewProducts">Products</a>
      </button>
    </>
  )
}

export default Home