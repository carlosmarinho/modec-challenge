import React from 'react';
import styled from 'styled-components';


const HeaderWrapper = styled.div`
    background-color: #ddd;
    width: 100%;
    height: 60px;
    margin-bottom: 20px;
`

const Logo = styled.div`
    height: 100%; 
    float: left; 
    width: 40%; 
    background-color: red;
`

const LoginArea = styled.div`
    height: 100%; 
    float: right; 
    width: 50%; 
    background-color: green;
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