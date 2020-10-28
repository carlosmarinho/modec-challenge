import React, { useEffect } from 'react';
import { useParams } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux';
import styled from 'styled-components';

import { fetchCityByName, fetchInitialCity, setInitialCity } from 'actions';
import PageLayout from 'components/PageLayout';

const TitlePage = styled.h2`
    text-align: center;
    margin-top: 50px;

    @media(min-width: 700px) {
        display: block;
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

const renderCity = (city) => {
    if(!city)
        return <div>Carregando...</div>

    return(        
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
    )
}

const Search = () => {

    const { cityName } = useParams();
    const dispatch = useDispatch();
    const {
        city, 
        initialCity, 
    } = useSelector(state => state.weatherReducer);

    
    useEffect(() => {
        async function getLocation() {
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
            dispatch(fetchCityByName(cityName))        
        }

        getLocation();
    }, [dispatch, cityName])

    return (
        <PageLayout city={initialCity}>
            <TitlePage>City Details - {cityName}
             </TitlePage>
            <hr />
            <CityWrapper>
                {renderCity(city)}                
            </CityWrapper>
        </PageLayout>
    )
};

export default Search;