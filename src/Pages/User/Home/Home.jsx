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

      <div className='relative border h-200 mb-8'>
        <img 
          src={assets.PlaceholderImage} 
          alt="Picture" 
          className='object-fill w-full h-full'
        />
      

        {/* Overlay button */}
        <button 
          className="absolute bottom-1/2 left-1/2 transform -translate-x-1/2
           bg-blue-900 text-white font-bold px-10 text-3xl py-2 rounded-full 
           shadow-md hover:bg-blue-700 transition"
        >
          Shop Now
        </button>
      </div>  

      {/** for new or bestsellers */}
      <div className="flex flex-col bg-blue-900">
        <h1 className="text-white text-4xl text-center mt-5">New Releases</h1>

        <div className="h-100 flex gap-20 justify-center items-center flex-wrap p-6">
          {[
            { title: "Edge of Eternities", image: "https://svgs.scryfall.io/sets/eoe.svg?1755489600", setCode: "Edge of Eternities" },
            { title: "Tarkir: Dragonstorm", image: "https://svgs.scryfall.io/sets/fin.svg?1755489600", setCode: "Tarkir: Dragonstorm" },
            { title: "Third Release", image: "https://svgs.scryfall.io/sets/tdm.svg?1755489600", setCode: "TR" },
            { title: "Fourth One", image: "https://svgs.scryfall.io/sets/dft.svg?1755489600", setCode: "FO" },
            { title: "Fifth One", image: "https://svgs.scryfall.io/sets/inr.svg?1755489600", setCode: "FI" }
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
