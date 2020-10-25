import React from 'react';
import styled from 'styled-components';


const HeaderWrapper = styled.div`
    display: flex;
    background-color: #ccc;
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
    margin-left: 20px;

    @media(min-width: 380px) {
        margin-left: 10%;
    }
`

const LoginArea = styled.div`
    display: flex;
    align-items: center;
    justify-content: flex-end;
    height: 100%; 
    width: 50%; 
    margin-right: 20px;    

    @media(min-width: 380px) {
        margin-right: 10%;
    }
`

const Header = () => {
    return (
        <HeaderWrapper>
            <Logo><img src="" alt="Logo"/></Logo>
            <LoginArea>Login</LoginArea>
        </HeaderWrapper>
    )
}

export default Header;