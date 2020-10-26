import React, { useEffect } from 'react';
import { render } from 'react-dom'
import styled from 'styled-components';
// import ReactWeather from 'react-open-weather';
import { Map, Marker, Popup, TileLayer } from 'react-leaflet'

const key = 'e331364a57997b3e26f001eef954114a';
const MapWrapper = (props) => {
    let position = [-22.88, -43.12]
    if(props.coords)
        position = [props.coords.latitude, props.coords.longitude];

    console.log("position: no map: ", props);

    const handleClick = event => {
        const { lat, lng } = event.latlng
        console.log(`Clicked at ${lat}, ${lng}`)
    }

    return (
            <Map 
                center={position} 
                zoom={13}
                onClick={e => handleClick(e)}
            >
                <TileLayer
                    url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                    attribution="&copy; <a href=&quot;http://osm.org/copyright&quot;>OpenStreetMap</a> contributors"
                />
                <Marker 
                    position={position}
                    draggable={true}
                >
                <Popup>A pretty CSS3 popup.<br />Easily customizable.</Popup>
                </Marker>
            </Map>
    )
}

export default MapWrapper
