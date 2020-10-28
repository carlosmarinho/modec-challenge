import React, { useEffect } from 'react';
import { useParams } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux';
import styled from 'styled-components';

import { fetchCitiesByLatLong, fetchInitialCity, setInitialCity } from 'actions';
import PageLayout from 'components/PageLayout';

const TitlePage = styled.h2`
    text-align: center;
    margin-top: 50px;
    display: none;

    @media(min-width: 700px) {
        display: block;
    }
`

const TitlePageMobile = styled.h2`
    text-align: center;
    margin-top: 50px;
    display: block;
    font-size: 1.3rem;

    @media(min-width: 700px) {
        display: none;
    }
`

const CityWrapper = styled.div`
    width: 100%;
    margin-top: 40px;
    color: #fff;
`

const City = styled.div`
    display: flex;
    width: 98%;
    min-width: 200px;
    box-sizing: border-box;
    background-color: #314344;
    margin: 10px 10px 20px 10px; 
    padding: 10px 40px;
    flex-wrap: wrap;

    h3 {
        width: 100%;
        border-bottom: 2px solid #fff;
    }

    @media(min-width: 700px){
        margin-left: 0px;
    }

`

const ImgBox = styled.div`
    display: flex;
    align-items: center;
    justify-content: center;
    width: 100%;
    min-width: 200px;
    
    span {
        font-weight: bolder;
        font-size: 3rem;
    }

    @media(min-width: 700px ) {
        width: 45%;
    }

`

const DescBox = styled.div`
    display: flex;
    flex-direction: column;
    width: 100%;
    margin: 0px 10px;
    min-width: 200px;

    p{
        width: 100%;
        border-bottom: 1px solid #fff;
        display: flex;
        justify-content: space-between;
    }

    span {
        margin: 0 10px;
    }

    @media(min-width: 700px ) {
        width: 50%;
        padding-left: 5%;
        margin: initial;
    }
`

const renderCities = (cities) => {
    if(!cities)
        return <div>Carregando...</div>

    return(
        <>
            {
                cities.map(city => {
                    return (
                        <City key={city.id}>
                            <h3>{city.name}</h3>
                            <ImgBox>
                                <img src={`http://openweathermap.org/img/wn/${city.weather[0].icon}@4x.png`} alt="Icone tempo"/>
                                <span>{parseInt(city.main.temp)}º</span>
                            </ImgBox>
                            <DescBox>
                                <p><span>Min Temperature: </span> <span>{city.main.temp_min}º c</span></p>
                                <p><span>Max Temperature: </span> <span>{city.main.temp_max}º c</span></p>
                                <p><span>Humidity:</span> <span>{city.main.temp_min}%</span></p>
                            </DescBox>
                        </City>
                    );
                })
            }
          
        </>
    )
}

const Search = () => {

    const { latitude, longitude } = useParams();
    const dispatch = useDispatch();
    const {
        cities, 
        initialCity, 
    } = useSelector(state => state.weatherReducer);

    
    useEffect(async() => {
        navigator.geolocation.getCurrentPosition(
            async function(pos) {
                const iLatitude = pos.coords.latitude;
                const iLongitude = pos.coords.longitude;

                dispatch(fetchInitialCity(iLatitude, iLongitude, true));
            },
            async () => {
                dispatch(setInitialCity(false));
            }
        );
        dispatch(fetchCitiesByLatLong(latitude, longitude, false))        
    }, [])

    return (
        <PageLayout city={initialCity}>
            <TitlePage>Cities at Latitude {parseFloat(latitude).toFixed(3)} and Longitude {parseFloat(longitude).toFixed(3)} </TitlePage>
            <TitlePageMobile>Cities at  {parseFloat(latitude).toFixed(1)} lat / {parseFloat(longitude).toFixed(1)} long </TitlePageMobile>
            <hr />
            <CityWrapper>
                {renderCities(cities)}                
            </CityWrapper>
        </PageLayout>
    )
};

export default Search;