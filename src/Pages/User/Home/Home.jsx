import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import Navbar from '../../../Components/User/Navbar'
import { useNavigate } from 'react-router-dom'
import { assets } from '../../../assets/assets'
import { getSets } from '../../../Services/SetService'
import Footer from '../../../Components/User/Footer'
import LoadingOverlay from '../../../Components/LoadingSpinners/LoadingOverlay'

const Home = () => {
  const [latestSets, setLatestSets] = useState([]);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
  const fetchLatestSets = async () => {
    try {
      setLoading(true);
      const response = await getSets(); // full array of sets

      // keywords that indicate a subset
      const excludeKeywords = ["Eternal", "Tokens", "Promos", "Front Cards", "Special", "Fun", "Arena", 
        "Anthology", "Alchemy", "Realm", "Universe", "Art", "Stellar", "Ages", "Commander", "Standard"];

      // filter out sets that contain any of the keywords
      const mainSets = response.filter(set => 
        !excludeKeywords.some(keyword => set.name.includes(keyword))
      );

      // sort by release date descending
      mainSets.sort((a, b) => new Date(b.releasedAt) - new Date(a.releasedAt));

      // take only the last 5 sets
      setLatestSets(mainSets.slice(0, 5));

    } catch (error) {
      console.error('Error fetching latest sets:', error);
    } finally {
      setLoading(false)
    }
  };

  fetchLatestSets();
}, []);

  if(loading) return (
    <LoadingOverlay />
  )

  return (
    <>
      <Navbar />

      {/* Hero Banner */}
      <div className='relative h-[400px] md:h-[500px] mb-12'>
        <img 
          src={assets.PlaceholderImage} 
          alt="Banner" 
          className='w-full h-full object-cover'
        />

        <button 
          onClick={() => navigate('/User/viewProducts')}
          className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2
                     bg-gradient-to-r from-cyan-500 via-fuchsia-500 to-purple-600 
                     text-white font-bold px-10 py-3 rounded-full shadow-[0_0_20px_rgba(0,255,255,0.5)]
                     hover:shadow-[0_0_30px_rgba(255,0,255,0.7)] transition-all duration-300 text-3xl"
        >
          Shop Now
        </button>
      </div>  

      {/* New Releases / Latest Sets */}
      <section className="bg-[#0b0130]/80 py-10">
        <h1 className="text-white text-4xl text-center font-extrabold mb-8 drop-shadow-[0_0_10px_#0ff]">
          New Releases
        </h1>

        <div className="flex flex-wrap justify-center gap-10 px-6">
          {latestSets.length > 0 ? (
            latestSets.map((set) => (
              <Link
                key={set.id}
                to={`/user/viewProducts?set=${set.code}`}
                className="flex flex-col items-center group bg-white/70 border-r-2"
              >
                <div className="w-72 h-72 rounded-2xl overflow-hidden relative shadow-[0_0_25px_rgba(0,255,255,0.3)] group-hover:shadow-[0_0_35px_rgba(255,0,255,0.5)] transition-shadow duration-300">
                  <img
                    src={set.iconUrl}
                    alt={set.name}
                    className="w-full h-full object-cover"
                  />
                </div>
                <h2 className="text-black mt-3 text-2xl font-bold text-center drop-shadow-[0_0_5px_#0ff] group-hover:text-fuchsia-400 transition-colors duration-300">
                  {set.name}
                </h2>
              </Link>
            ))
          ) : (
            <p className="text-white text-lg text-center w-full">Loading latest sets...</p>
          )}
        </div>
      </section>

      <Footer />
    </>
  )
}

export default Home
