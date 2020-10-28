import React from 'react';
import { Map, Marker, Popup, TileLayer } from 'react-leaflet'

const MapWrapper = (props) => {

    const { marker, coords } = props;
    let popup

    let position = [];
    if(coords) {
        position = [coords.latitude, coords.longitude];
    }

    if(props.city && props.city.main) {
        popup = <>
            <h2>
                <strong>{props.city.name}</strong>
            </h2>
            <p>
                <strong>Temperature: {props.city.main.temp}º</strong><br />
                <strong>Min: {props.city.main.temp_min}º</strong><br />
                <strong>Max: {props.city.main.temp_max}º</strong><br />
            </p>
            
        </>

    }

    const handleClick = event => {
        props.observable(event.latlng);
    }

    if(!position.length){
        return <div>Carregando...</div>
    }

    return (
            <Map 
                center={position} 
                zoom={13}
                onClick={e => handleClick(e)}
                className={marker ? '' : 'cross'}
            >
                <TileLayer
                    url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                    attribution="&copy; <a href=&quot;http://osm.org/copyright&quot;>OpenStreetMap</a> contributors"
                />
                {
                    marker &&
                    <Marker 
                        position={[marker.latitude, marker.longitude]}
                        draggable={true}
                    >
                        <Popup>{popup}</Popup>
                    </Marker>
                }
            </Map>
    )
}

export default MapWrapper
