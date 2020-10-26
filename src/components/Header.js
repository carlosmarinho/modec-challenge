import React from 'react';
import styled from 'styled-components';


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

    @media(min-width: 400px) {
        margin-right: 10%;
        font-size: 1.3rem;
    }
`

const Header = ({city}) => {
    console.log("city no header: ", city);
    return (
        <HeaderWrapper>
            <Logo><img src="/images/mywether.png" alt="Logo My Weather"/></Logo>
            <TempArea>
                {city ? `${city.name} - ${city.main.temp}º ` : '...'}
                {
                    city &&
                    <img src={`http://openweathermap.org/img/wn/${city.weather[0].icon}.png`} alt=""/>
                }
            </TempArea>
        </HeaderWrapper>
    )
}

export default Header;