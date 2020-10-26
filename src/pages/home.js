import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import Map from 'components/Map';
import api from 'api/';
import PageLayout from 'components/PageLayout';

const MapArea = styled.div`
    display: flex;
    box-sizing: border-box;
    flex-direction: column;
    margin: 0 5% 0 5%;
    width: 90%;
    height: 300px;

    @media(min-width: 380px) {
        height: 500px;
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
    const posInitial = [-22.88, -43.12]
    const [cities, setCities] = useState();
    const [position, setPosition] = useState();
    const [marker, setMarker] = useState();

    const handleCreateNewPin = (e) => {
        setMarker(null);
    }
    
    useEffect(async() => {
        navigator.geolocation.getCurrentPosition(
            async function(pos) {
                console.log("setou a posição", pos)
                setPosition(pos);
                setMarker(pos);
        
                let latitude = '';
                let longitude = '';
        

                if(pos) {
                    latitude = pos.coords.latitude;
                    longitude = pos.coords.longitude;
                }
                else{
                    latitude = posInitial[0];
                    longitude = posInitial[1];
                }

                const weather = await api.get(`find?lat=${latitude}&lon=${longitude}&cnt=15&APPID=${key}&units=metric`)
                setCities(weather.data.list);
            }
        );
        
        
    }, []) 

    const observeMapClick = (coords) => {
        // console.log("corrrd: ", coords.lat)
        setMarker({coords: {latitude: coords.lat, longitude: coords.lng}})
    }

    // console.log("cities: ", cities);
    return (
        <PageLayout city={cities ? cities[0] : null}>
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
                    <button>Search</button>
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