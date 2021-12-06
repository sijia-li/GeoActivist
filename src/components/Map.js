<<<<<<< HEAD
import React,{ useState, useEffect } from 'react'
import MapGL, {GeolocateControl, Marker,Layer} from 'react-map-gl'
//import config from '../config'
import 'mapbox-gl/dist/mapbox-gl.css'
import { BrowserRouter as Router } from 'react-router-dom';
import './sideBar.js'
import getData from './getData';
import Sidebar from './sideBar'
=======
import React,{ useState } from 'react'
import MapGL, {GeolocateControl, Marker} from 'react-map-gl'
//import config from '../config'
import 'mapbox-gl/dist/mapbox-gl.css'


import './sideBar.js'
 

>>>>>>> 611ef46440f6a9baafbf69991e288a6f50feed0c
const TOKEN='pk.eyJ1IjoidHphbGl5YSIsImEiOiJja3VuMncxd3QzeHI3MnZtbmZyOTE0Z2RhIn0.wXgglO-cXtCIq-QJ17Jv-g';
const latitude = [];
const longtitude = []; 

const geolocateStyle = {
  float: 'left',
  margin: '10px',
  padding: '10px'
};




const Map = () => {
  const [data, setData] = useState([]);
  const [viewport, setViewPort ] = useState({
    position:"absolute",
    width: "100%",
    height:"100%",
    latitude: 42.3486,
    longitude: -71.1029,
    zoom: 15
  })

  useEffect(()=>{
    async function getMyData(){
        const myData = await getData();
        setData(myData);
    }
    getMyData();
  },[])

  for(const i in data){
    latitude.push(data[i].Latitude);
  }
  console.log(latitude);
  
  for(const i in data){
    longtitude.push(data[i].Longtitude);
  }

  const _onViewportChange = viewport => setViewPort({...viewport, transitionDuration: 10 })

  const geoLocateControl = {
    right: "10px",
    top:"10px",
    margin:"0",
    padding:"0"
  }

  // console.log(data);

  return (

    <div style={{ margin: '0 0'},{position:"absolute"},{height:"100%"}}>
      <MapGL
        {...viewport}
        mapboxApiAccessToken={TOKEN}
        mapStyle="mapbox://styles/mapbox/streets-v11"
        // style={{position:"absolute"},{width:"100%"},{height:"100%"}}
        onViewportChange={_onViewportChange}
       >
        <GeolocateControl
          style = {geoLocateControl}
          positionOptions={{enableHighAccuracy: true}}
          trackUserLocation={true}
         />

        

         {/* {data.map((item,index)=>{
           return(<Marker latitude = {item[index].Latitude} longtitude={item[index].Longtitude} offsetLeft={-20} offsetTop={-10}>
             <img src={require('./Assets/mapbox-marker-icon.png').default}/>
           </Marker>);
         } )} */}

        <Marker latitude={42.3486} longitude={-71.1029} offsetLeft={-20} offsetTop={-10}>
        <img src={require('./Assets/mapbox-marker-icon.png').default}/>
       {/* <div>Marker here</div> */}
        </Marker>


       </MapGL>
      </div>
     )
    }

    export default Map