import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';
import Map from 'components/Map';
import api from 'api/';
import PageLayout from 'components/PageLayout';
import { SearchBar } from 'components/SearchBar';

const MapArea = styled.div`
    display: flex;
    box-sizing: border-box;
    flex-direction: column;
    margin: 0 5% 0 5%;
    width: 90%;
    min-width: 200px;
    height: 350px;

    @media(min-width: 700px) {
        height: 480px;
    }
`
const key = 'e331364a57997b3e26f001eef954114a';

const SearchArea = styled.div`
    display: flex;
    justify-content: center;
    width: 100%;
    background-color: #cecece;

    button{
        margin: 1px 10px 1px 0;
    }
`

const ListingCities = styled.div`
    width: 50%;
    background-color: red;
`

const Home = () => {
    const state = useState();
    console.log("useState: ", state);
    const posInitial = [-22.88, -43.12]
    const [cities, setCities] = useState([]);
    const [initialCity, setInitialCity] = useState(null);
    const [position, setPosition] = useState(posInitial);
    const [marker, setMarker] = useState({coords: {latitude: posInitial[0], longitude: posInitial[0]}});

    const handleCreateNewPin = (e) => {
        setMarker(null);
    }
    
    useEffect(async() => {
        navigator.geolocation.getCurrentPosition(
            async (pos) => {
                console.log("setou a posição", pos)
                setPosition(pos);
                setMarker(pos);
       
                const latitude = pos.coords.latitude;
                const longitude = pos.coords.longitude;

                const weather = await api.get(`find?lat=${latitude}&lon=${longitude}&cnt=15&APPID=${key}&units=metric`)
                setCities(weather.data.list);
                setInitialCity(weather.data.list[0]);
            },
            async (error) => {

                console.log("error: ", error);
            }
        );
        
        
    }, []) 

    const observeMapClick = async (coords) => {
        // console.log("corrrd: ", coords.lat)
        setMarker({coords: {latitude: coords.lat, longitude: coords.lng}})
        const weather = await api.get(`find?lat=${coords.lat}&lon=${coords.lng}&cnt=15&APPID=${key}&units=metric`)
        setCities(weather.data.list);
    }

    const searchByCity = async(searchValue) => {
        const weather = await api.get(`weather?q=${searchValue}&APPID=${key}&units=metric`)
        console.log("weatter no search: ", weather)
        if(weather.data){
            setMarker({coords: {latitude: weather.data.coord.lat, longitude: weather.data.coord.lon}})
            setCities([weather.data])
            setPosition({coords: {latitude: weather.data.coord.lat, longitude: weather.data.coord.lon}});
        }
    }


    console.log("marker: ", marker);
    if(! marker)
        return <div>Carregando ...</div>

    return (
        <PageLayout city={initialCity ? initialCity : null}>
            <SearchBar 
                searchByCity={searchByCity}
            />
            <MapArea>
                <Map 
                    coords={position ? position.coords : null} 
                    marker={marker ? marker.coords : null}
                    city={cities ? cities[0] : null}
                    observable={observeMapClick}
                />
                <SearchArea>
                    <button 
                        onClick={e => handleCreateNewPin()}
                    >
                        Create new Pin
                    </button>
                    <Link to={marker ? `/search/${marker.coords.latitude}/${marker.coords.longitude}` : '#'}>
                        <button >Search</button>
                    </Link>
                </SearchArea>
                {/* <ListingCities>
                    {
                        cities && 
                        cities.map(city => {
                            return <li>{city.name}</li>
                        })
                    }
                </ListingCities> */}
            </MapArea>
        </PageLayout>
    )
};

export default Home;