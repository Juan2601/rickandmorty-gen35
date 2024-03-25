import { useEffect, useState } from 'react'
import './App.css'
import useFetch from './hooks/useFetch'
import getRandomNumber from './services/getRandomNumber'
import LocationInfo from './components/LocationInfo'
import ResidentCard from './components/ResidentCard'
import FormSearch from './components/FormSearch'
import './components/styles/HeaderImg.css'

function App() {

  const randomLocation = getRandomNumber(126)
  const [locationSelected, setLocationSelected] = useState(randomLocation)  
  
  const url = `https://rickandmortyapi.com/api/location/${locationSelected || getRandomNumber(1)}`
  const [location, getLocation, hasError] = useFetch(url)

  useEffect(() => {
    getLocation()
  }, [url])

  return (
    <div className='app'>
      <div className='header__img'>
        <img  src="/public/img_top.png" alt="" />
          <div className='header__name'>
            <img src="public/img_name.png" alt="Rick and Morty" />
          </div>        
      </div>
      <FormSearch setLocationSelected={setLocationSelected}/>
      {hasError ? (
        <h2 className='app_error'>❌ Debe proporcionar un id del 1 al 126, inténtelo de nuevo 😄</h2> 
      ) : (
        <>
            <LocationInfo location={location}/>
            <div className='container-resident'>
              {location?.residents.map(url => (
                <ResidentCard key={url} url={url} />         
              ))}        
            </div>          
        </>     
      )}        
    </div>
  )
}

export default App