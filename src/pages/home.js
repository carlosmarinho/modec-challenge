import React from 'react';
import { render } from 'react-dom'
import styled from 'styled-components';
import Map from 'components/Map'

const MapArea = styled.div`
    width: 50%;
    height: 400px;
`

const Home = () => {

    return (
            <MapArea>
                <Map />
            </MapArea>
    )
};

export default Home;