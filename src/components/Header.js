import React from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';

const HeaderWrapper = styled.div`
    display: flex;
    background-color: #314344;
    width: 100%;
    height: 60px;
    margin-bottom: 20px;
    justify-content: space-between;
    box-sizing: border-box;
`

const Logo = styled.div`
    display: flex;
    align-items: center;
    height: 100%; 
    width: 40%; 
    margin: 5px 0 0 20px;
    min-width: 140px;

    img{
        height: 50px;
        width: 160px;
    }

    @media(min-width: 380px) {
        margin-left: 10%;
    }
`

const TempArea = styled.div`
    display: flex;
    align-items: center;
    justify-content: flex-end;
    height: 100%; 
    width: 50%; 
    margin-right: 20px;    
    font-weight: bolder;
    font-size: 1.1rem;
    color: #fff;

    a{
        font-size: 0.8rem;
        color: #fff;
    }

    @media(min-width: 400px) {
        margin-right: 10%;
        font-size: 1.3rem;
    }
`;


const renderCity = (city) => {
    if(city === false) {
        return <a href="https://support.google.com/chrome/answer/142065?hl=en" target="_blank" rel="noreferrer">Allow your location to display your local temperature here</a>
    }
    else if(city === null){
        return '...';
    }
    else {
        return `${city.name}, ${parseInt(city.main.temp)}º c `; 
    }
}

const Header = ({city}) => {
    return (
        <HeaderWrapper>
            <Logo>
                <Link to="/">
                    <img src="/images/mywether.png" alt="Logo My Weather"/>
                </Link>
            </Logo>
            <TempArea>
                {
                    city &&
                    <img src={`http://openweathermap.org/img/wn/${city.weather[0].icon}.png`} alt=""/>
                }
                {renderCity(city)}
            </TempArea>
        </HeaderWrapper>
    )
}

export default Header;