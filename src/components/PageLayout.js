import React from 'react';
import styled from 'styled-components';
import Header from './Header';

const Content = styled.main`
    max-width: 1300;
    margin: 30px auto 0 auto;
    padding: 0 16px;
    box-sizing: border-box;
/* 
    @media(min-width: 400px) {
        margin: 157px auto 0 auto;
    } */
`

const PageLayout = ({children, city}) => {
    return(
        <>
            <Header city={city}/>
            <Content>
                {children}
            </Content>
        </>
    )
}

export default PageLayout