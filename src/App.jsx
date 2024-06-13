
import './App.css'
import Temperature from './Components/Temperature'
import Highlights from './Components/Highlights'
import { useEffect, useState } from 'react'
function App() {
  const [city,setcity]=useState("Bangalore");
  const [weatherdata,setweatherdata]=useState(null);
  const apiurl=`http://api.weatherapi.com/v1/current.json?key=8b7aab484b1b486dbaf160035241005&q=${city}&aqi=no`;
   
  useEffect(()=>{
    fetch(apiurl)
  .then((response)=>{
    if(!response.ok){
      throw new Error("Error");
    }
    return response.json();
  })
  .then((data)=>{
      console.log(data);
      setweatherdata(data);
  })
  .catch((e)=>{
    console.log(e);
  })
  },[city])
  return (
    <div className='bg-[#1F213A] h-screen flex justify-center align-top'>
      <div className=' mt-40 w-1/5 h-1/3'>
      {weatherdata && (
          <Temperature
            setcity={setcity}
            stats={{
              temp: weatherdata.current.temp_c,
              condition: weatherdata.current.condition.text,
              isday: weatherdata.current.is_day,
              location: weatherdata.location.name,
              time: weatherdata.location.localtime,
            }}
          />
        )}
      </div>
      <div className='mt-40 w-1/3 h-1/3 p-10 grid grid-cols-2 gap-6'>
        <h2 className='text-slate-200 text-2xl col-span-2'>Today's Highlights</h2>
        {
          weatherdata &&
          (
            <>
            <Highlights
            stats={{
              title:"wind status",
              value:weatherdata.current.wind_mph,
              unit:"mph",
              direction:weatherdata.current.wind_dir
            }}/>
            
            <Highlights
            stats={{
              title:"Humidity",
              value:weatherdata.current.humidity,
              unit:"%"
            }}/>

            <Highlights
            stats={{
              title:"visibility",
              value:weatherdata.current.vis_miles,
              unit:"miles",
              
            }}/>

            <Highlights
            stats={{
              title:"Air pressure",
              value:weatherdata.current.pressure_mb,
              unit:"mb",
              
            }}/>
            </>
          )
        }
      </div>
    </div>
  
  )
}

export default App
