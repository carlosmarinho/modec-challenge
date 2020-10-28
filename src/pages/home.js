import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import styled from 'styled-components';
import { Link } from 'react-router-dom';

import Map from 'components/Map';
import PageLayout from 'components/PageLayout';
import { SearchBar } from 'components/SearchBar';
import { 
    fetchCitiesByLatLong, 
    setInitialCity, 
    setMarker,
    fetchCityByName 
} from 'actions';

const Wrapper = styled.div`
    display: flex;
    box-sizing: border-box;
    /* flex-direction: column; */
    margin: ${p => p.cities.length ? '0 1.5% 0 1.5%' : '0 4% 0 4%'};
    width: ${p => p.cities.length ? '97%' : '92%'};
    min-width: 200px;
    height: ${p => p.cities.length ? '800px' : '900px'};
    flex-wrap: wrap;

    @media(min-width: 800px) {
        height: 500px;
    }

    
`

const MapArea = styled.div`
    width: 100%;
    height: 50%;

    @media(min-width: 800px) {
        width: ${p => p.cities.length ? '70%' : '100%'};
        height: 100%;
    }
`


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
    display: ${p => p.cities.length ? 'block' : 'none'};
    width: 100%;    
    margin-left: 0%;
    margin-top: 30px;
    background-color: #cecece;
    font-size: 0.9rem;
    max-height: initial;
    border-radius: 10px;
    padding: 10px;
    min-width: 150px;
    height: 50%;
    a {
        color: black;
    }

    span:hover{
        cursor: pointer;
    }

    span img{
        width: 10px;
    }

    h2 {
        font-size: 1.4rem;
    }
    
    div {
        margin-top: 20px;
        text-align: left;
    }
        
    
    @media(min-width: 800px) {
        font-size: 0.8rem;
        width: 22%;
        margin-top: 0;
        margin-left: 4%;
        height: 100%;
        
        h2 {
            font-size: 1rem;
        }

        ul{
            padding: 5px 0 0 20px;
        }

        div {
            margin-top: 20px;
            text-align: center;
        }   
        
    }

`


const Home = () => {
    const dispatch = useDispatch();

    const {
        city, 
        cities,
        initialCity, 
        position, 
        marker
    } = useSelector(state => state.weatherReducer);

    const handleCreateNewPin = () => {
        dispatch(setMarker(null))
    }
    
    useEffect(() => {
        async function getLocation() {
            navigator.geolocation.getCurrentPosition(
                async (pos) => {
                    const { latitude, longitude } = pos.coords;                
                    dispatch(fetchCitiesByLatLong(latitude, longitude, true))
                },
                async (error) => {
                    dispatch(setInitialCity(false));
                }
            );
        }

        getLocation();
    }, [dispatch]) 

    const observeMapClick = async (coords) => {
        console.log("cooooords: ", coords);
        dispatch(fetchCitiesByLatLong( coords.lat, coords.lng ? coords.lng : coords.lon, false))
    }

    const searchByCity = async(searchValue) => {
        dispatch(fetchCityByName(searchValue))
    }
    
    return (
        <PageLayout city={initialCity}>
            <SearchBar 
                searchByCity={searchByCity}
            />
            <Wrapper cities={cities}>
                <MapArea cities={cities}>
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
                </MapArea>
                <ListingCities cities={cities}>
                    <h2>Cities Nearby</h2>
                    <ul>
                        {
                            cities && 
                            cities.map(city => {
                                return (
                                    <li>
                                        <Link to={`search/${city.name}`}>{city.name}</Link> 
                                        &nbsp;
                                        (<span onClick={() => observeMapClick(city.coord)}>Pin it <img src="/images/pin.png" alt=""/></span>)
                                        
                                    </li>
                                )
                            })
                        }
                    </ul>
                    <div>
                        <Link to={marker ? `/search/${marker.coords.latitude}/${marker.coords.longitude}` : '#'}>
                            <button>Search All</button>
                        </Link>
                    </div>
                </ListingCities>
            
            </Wrapper>
        </PageLayout>
    )
};

export default Home;