import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import Navbar from '../../../Components/User/Navbar'
import { useNavigate } from 'react-router-dom'
import {assets} from '../../../assets/assets'
import { getSets } from '../../../Services/SetService'
import Footer from '../../../Components/User/Footer'

const Home = () => {
  const [latestSets, setLatestSets] = useState([])
  const navigate = useNavigate()

  useEffect(() => {
    const fetchLatestSets = async () => {
      try {
        // Replace with your API endpoint that returns the latest 5 sets
        const response = await getSets();
        
        setLatestSets(response) // data should include { id, name, iconUrl } for each set
        console.log(response)
      } catch (error) {
        console.error('Error fetching latest sets:', error)
      }
    }

    fetchLatestSets()
  }, [])

  const handleSetClick = (setId) => {
    // Navigate to products page filtered by set
    navigate(`/User/viewProducts?set=${setId}`)
  }

  return (
    <>
      <Navbar />

      <button className="m-4 p-2 bg-blue-500 text-white rounded hover:bg-blue-600">
        <a href="/User/viewProducts">Products</a>
      </button>

      <div className='border h-200 mb-8'>
        <img 
          src={assets.EOTPic} 
          alt="Edge of Eternities picture." 
          className='object-fill w-full h-full'
        />
      </div>      

      {/** for new or bestsellers */}
      <div className="flex flex-col bg-blue-900">
        <h1 className="text-white text-4xl text-center mt-5">New Releases</h1>

        <div className="h-100 flex gap-20 justify-center items-center flex-wrap p-6">
          {[
            { title: "Edge of Eternities", image: assets.EOTPic, setCode: "Edge of Eternities" },
            { title: "Tarkir: Dragonstorm", image: assets.EOTPic, setCode: "Tarkir: Dragonstorm" },
            { title: "Third Release", image: assets.EOTPic, setCode: "TR" },
            { title: "Fourth One", image: assets.EOTPic, setCode: "FO" },
            { title: "Fifth One", image: assets.EOTPic, setCode: "FI" }
          ].map((release, idx) => (
            <Link
              key={idx}
              to={`/user/viewProducts?set=${release.setCode}`}
              className="flex flex-col items-center hover:scale-105 transition-transform"
            >
              <div className="w-72 h-72 flex">
                <img
                  src={release.image}
                  alt={release.title}
                  className="rounded-2xl object-cover"
                />
              </div>
              <h1 className="text-center mt-2 text-white font-bold text-2xl">
                {release.title}
              </h1>
            </Link>
          ))}
        </div>
      </div>   
      
    </>
  )
}

export default Home
