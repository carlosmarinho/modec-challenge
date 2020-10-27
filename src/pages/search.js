import React, {useState, useEffect} from 'react';
import { useParams } from 'react-router-dom'
import styled from 'styled-components';
import api from 'api/';

import PageLayout from 'components/PageLayout';

const key = 'e331364a57997b3e26f001eef954114a';

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
    /* flex-direction: column; */
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

    console.log("cities::: ", cities);
    return(
        <>
            {
                cities.map(city => {
                    return (
                        <City>
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
    const [initialCity, setInitialCity] = useState();
    const [cities, setCities] = useState();
    const { latitude, longitude } = useParams();
    
    useEffect(async() => {
        navigator.geolocation.getCurrentPosition(
            async function(pos) {
                // setPosition(pos);
        
                const iLatitude = pos.coords.latitude;
                const iLongitude = pos.coords.longitude;

                const iWeather = await api.get(`find?lat=${iLatitude}&lon=${iLongitude}&cnt=15&APPID=${key}&units=metric`)
                setInitialCity(iWeather.data.list[0]);
            }
        );

        const weather = await api.get(`find?lat=${latitude}&lon=${longitude}&cnt=15&APPID=${key}&units=metric`)
        setCities(weather.data.list)
        
    }, [])

    return (
        <PageLayout city={initialCity ? initialCity : null}>
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