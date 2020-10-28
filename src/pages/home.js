import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import styled from 'styled-components';
import { Link } from 'react-router-dom';
import Map from 'components/Map';
import api from 'api/';
import PageLayout from 'components/PageLayout';
import { SearchBar } from 'components/SearchBar';
import { 
    fetchCitiesByLatLong, 
    setInitialCity, 
    setMarker,
    fetchCityByName 
} from 'actions';

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
    const dispatch = useDispatch();

    const {
        city, 
        initialCity, 
        position, 
        marker
    } = useSelector(state => state.weatherReducer);

    const handleCreateNewPin = () => {
        dispatch(setMarker(null))
    }
    
    useEffect(async() => {
        navigator.geolocation.getCurrentPosition(
            async (pos) => {
                console.log("setou a posição", pos)
                const { latitude, longitude } = pos.coords;                
                dispatch(fetchCitiesByLatLong(latitude, longitude, true))
            },
            async (error) => {
                dispatch(setInitialCity(false));
            }
        );
        
        
    }, []) 

    const observeMapClick = async (coords) => {
        dispatch(fetchCitiesByLatLong( coords.lat, coords.lng, false))
    }

    const searchByCity = async(searchValue) => {
        dispatch(fetchCityByName(searchValue))
        // dispatch(fetchCity(searchValue))
        // const weather = await api.get(`weather?q=${searchValue}&APPID=${key}&units=metric`)
        // console.log("weatter no search: ", weather)
        // if(weather.data){
            // setMarker({coords: {latitude: weather.data.coord.lat, longitude: weather.data.coord.lon}})
            // setMyCities([weather.data])
            // setPosition({coords: {latitude: weather.data.coord.lat, longitude: weather.data.coord.lon}});
        // }
    }


    
    return (
        <PageLayout city={initialCity}>
            <SearchBar 
                searchByCity={searchByCity}
            />
            <MapArea>
                <Map 
                    coords={position ? position.coords : null} 
                    marker={marker ? marker.coords : null}
                    city={city ? city : null}
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
                        myCities && 
                        myCities.map(city => {
                            return <li>{city.name}</li>
                        })
                    }
                </ListingCities> */}
            </MapArea>
        </PageLayout>
    )
};

export default Home;