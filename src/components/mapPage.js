import Searchbar from './Searchbar';
import Navbar from './navigation';
import React, {Component, useState,useRef,useEffect} from 'react';
import "bootstrap/dist/css/bootstrap.css";
import SliderPage from './Slider'
import DropDown_typeOfActivism from './Dropdown_typeOfActivism';
import ReactMapGL, { Marker,Layer, Feature } from 'react-map-gl'
import Example from './Dropdown_checkBox';
import MySelect from './MySelect.js';
import mapboxgl from 'mapbox-gl'; // eslint-disable-line import/no-webpack-loader-syntax
import DropDown_issueType from './Dropdown_checkBox.js';
import Map from './Map'
import CustomMarker from './CustomMarker'
import { BrowserRouter as Router } from 'react-router-dom';
import Sidebar from './sideBar'
import VirtualizedList from './VirtualizedList';
import getData from './getData';
import { FixedSizeList } from 'react-window';
import Paper from '@mui/material/Box';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemText from '@mui/material/ListItemText';
import ListGroup from 'react-bootstrap/ListGroup'
import './mapPage.css';
// import homePage from './components/homePage';

// import './components/CustomMarker'
// import CustomMarker from './components/CustomMarker'
mapboxgl.accessToken = 'pk.eyJ1IjoidHphbGl5YSIsImEiOiJja3VuMncxd3QzeHI3MnZtbmZyOTE0Z2RhIn0.wXgglO-cXtCIq-QJ17Jv-g';

export default function MapPage(){
    const mapContainer = useRef(null);
    const map = useRef(null);
    const [lng, setLng] = useState(-71.1029);
    const [lat, setLat] = useState(42.3486);
    const [zoom, setZoom] = useState(15.48);
    const [data, setData] = useState([]);
    const list = [];
    const [name, setName] = useState('');

    useEffect(()=>{
        async function getMyData(){
            const myData = await getData();
            setData(myData);
        }
        getMyData();
    },[])

    console.log(data[0]);
    for(const i in data){
        list.push(data[i].Name);
    }
    console.log(list);

    // const [search, setSearch] = useState("");
    const [foundEvents, setFoundEvents] = useState(list);

    // const searchClicked = (content) => {
    //     setSearch(content);
    // }

    const filter = (e) => {
        const keyword = e.target.value;
    
        if (keyword !== '') {
          const results = list.filter((item) => {
            return item.toLowerCase().startsWith(keyword.toLowerCase());
            // Use the toLowerCase() method to make it case-insensitive
          });
          setFoundEvents(results);
        } else {
          setFoundEvents(list);
          // If the text field is empty, show all users
        }
    
        setName(keyword);
      };

    const items = data.map(item =><ListItem disablePadding>
                                    <ListItemButton>
                                    <ListItemText primary={item.Name} secondary={item.Address}/>
                                    </ListItemButton>
                                        </ListItem> ); 

    return(
        <div className="App">

        <Navbar></Navbar>
        
        <div className="SearchBar">
        
        <input
        type="search"
        value={name}
        onChange={filter}
        className="input"
        placeholder="Filter"
        />
            {/* <Searchbar 
            type="search"
            value={name}
            onChange={filter}
            className="input"
            placeholder="Filter" 
            ></Searchbar> */}
            <DropDown_typeOfActivism></DropDown_typeOfActivism>
            <DropDown_issueType></DropDown_issueType>
            <SliderPage></SliderPage>
        </div>

        <div className="body">
            <div className="sideBarContainer">
            <Router>
            <div className="sideBar">
                {/* <ul>{items}</ul> */}
                {/* <ListGroup as="ol" numbered>
                    {items}
                </ListGroup> */}

                {foundEvents && foundEvents.length > 0 ? (
                    foundEvents.map((item) => (
                         <Paper style={{ width: '100%', overflow:'auto', bgcolor: 'background.paper' }}>
                            <List style={{maxHeight:600, overflow:'auto'}}>
                                <ListItem disablePadding>
                                    <ListItemButton>
                                    <ListItemText primary={item}/>
                                    </ListItemButton>
                                </ListItem>
                            </List>
                        </Paper>
                            ))):
                    //     ) : (data.map(item=><Paper style={{ width: '100%', overflow:'auto', bgcolor: 'background.paper' }}>
                    //     <List style={{maxHeight:600, overflow:'auto'}}>
                    //         <ListItem disablePadding>
                    //             <ListItemButton>
                    //             <ListItemText primary={item.Name}/>
                    //             </ListItemButton>
                    //         </ListItem>
                    //     </List>
                    // </Paper>))

                    <Paper>
                        <List>
                        {items}
                        </List>
                    </Paper>}
                
            </div>
            </Router>
            </div>
            <div className="Map">
            <Map></Map>
            </div>
        </div>
        <div>
        <homePage></homePage>
        </div>
    </div>
    );
}