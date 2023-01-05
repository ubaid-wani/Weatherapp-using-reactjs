import React , {useEffect, useState} from 'react';
import "./index.css";
import LocationOnIcon from '@material-ui/icons/LocationOn';
import  Image  from "./images/img1.jpg";
import { WiDaySunnyOvercast } from "react-icons/wi";
import { GoLocation } from "react-icons/go";
import { WiHumidity } from "react-icons/wi";
import { FaTemperatureHigh } from "react-icons/fa";
import { FaWind } from "react-icons/fa";
import { BsFileEarmarkX } from "react-icons/bs";


var monthnames = ["Jan","Feb","Mar","April","May","June","July","Aug","Sept","Oct","Nov","Dec"]
var daynames = ["Sunday","Monday","Tuesday","Wenesday","Thursday","Friday","Saturday"]
var now= new Date();
var newdate=now.toLocaleDateString();
 var month=now.getMonth();
 var day=now.getDay();
 var date=now.getDate();
 var hour=now.getHours();
var minute=now.getMinutes();

const Temp = () => {
    const [city, setcity] = useState();
    const [search, setSearch] = useState();
    const [winds, setWind] = useState();
    const [weathers, setWeather] = useState();
    useEffect( () => {
        const fetchApi = async () => {
            const url= `https://api.openweathermap.org/data/2.5/weather?q=${search}&units=metric&appid=4fdcfae2391460bd2a5fa802a74ccedc`;
            const response = await fetch(url);
            const respjson= await response.json();

            setcity(respjson.main);
            setWind(respjson.wind);
            setWeather(respjson.weather);
        };

        fetchApi();
    },[search])
 
 
    return (
    <>
    <div className='container'> 
             <div className='box'>
             
              <div className='inputData'>
                    <input id="inputcancel" placeholder="Enter Your City"  type="search"
                                     className='inputFeild'
                                     onChange={ (event) => { setSearch(event.target.value)} } />
                             
                    </div>
        {!city ? (
        <>
        <div  className='errorlogo'> <BsFileEarmarkX/></div>

        <div className='errormsg'> City Not Found </div>
    </>
    ) : (

        
        <div className='info'>
            
           
            
            <div className='locationicon'><GoLocation/></div>
            {/*<div> <LocationOnIcon style={{fontSize:"25px",opacity:".7",marginRight:"5px" }} /></div>*/}
            <div className='locationname'> {search}   </div>


            <div className='tempinfo'>    
                <h1 className='temp'>
                 {city.temp} <span> &#176; </span>
                </h1>
            </div>
          
            {<div className='thedate'>{daynames[day]} ,{date}  {monthnames[month]}  </div> }
                    <span className='weathericon'><WiDaySunnyOvercast/> </span>
                    <span className='weathertype'>{weathers[0].description}</span>
        



            <div className='tempcontainer'>
               {/* <div className='tempinner'>
                     <div className='text'>Min Temp</div>
                     <div className='text2'>{city.temp_min}<span> &#176; </span></div>
                </div>
                <div className='tempinner'>
                    <div className='text'>Max Temp</div>
                    <div className='text2'>{city.temp_max}<span> &#176; </span></div>
                </div>*/}
                <div className='tempinner'>
                    <div className='text'>Humidity</div>
                    <div className='text3'><WiHumidity/></div>
                    <div className='text2'>{city.humidity}</div>
                </div>
                <div className='tempinner'>
                     <div className='text'>Pressure</div>
                     <div className='text3'><FaTemperatureHigh/></div>
                     <div className='text2'>{city.pressure}<span> hPa </span></div>
                </div>
                {/*<div className='tempinner'>
                    <div className='text'>Sea Level</div>
                    <div className='text2'>{city.sea_level}<span> &#176; </span></div>
                </div>*/}
                <div className='tempinner'>
                    <div className='text'>Speed</div>
                    <div className='text3'><FaWind/></div>
                    <div className='text2'>{winds.speed}<span> m/s </span></div>
                </div>
            </div> 
        </div>       
        )
        }   
    </div>
    </div>
    </>
    );
};

export default Temp;
