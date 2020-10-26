import React, { useEffect, useState } from 'react';
import { render } from 'react-dom'
import styled from 'styled-components';
import Map from 'components/Map'

const MapArea = styled.div`
    width: 50%;
    height: 400px;
`

const Home = () => {
    const [position, setPosition] = useState();
    
    useEffect(() => {
        navigator.geolocation.getCurrentPosition(
            function(pos) {
                setPosition(pos);
            }
        );
    }, []) 

    console.log("position: ", position ? position.coords : '' );

    return (
            <MapArea>
                <Map coords={position ? position.coords : null} />
            </MapArea>
    )
};

export default Home;