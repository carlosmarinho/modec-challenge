import { 
    FETCH_CITIES_BY_LAT_LNG, 
    SET_INITIAL_CITY,
    SET_MARKER,
    FETCH_CITY_BY_NAME
} from 'actions/types'
import api from 'api/';

const key = 'e331364a57997b3e26f001eef954114a';


export const fetchCitiesByLatLong = (latitude, longitude, initialCity=false) => async dispatch => {

    const response = await api.get(`/find?lat=${latitude}&lon=${longitude}&cnt=15&APPID=${key}&units=metric`);

    dispatch({
        type: FETCH_CITIES_BY_LAT_LNG,
        payload: {...response.data, initialCity, coord: { lat: latitude, lon: longitude } }
    })
}

export const fetchCityByName = (name) => async dispatch => {

    const response = await api.get(`weather?q=${name}&APPID=${key}&units=metric`);
    console.log('response: ', response);

    dispatch({
        type: FETCH_CITY_BY_NAME,
        payload: response.data 
    })
}

export const setInitialCity = (initial) => async dispatch => {

    dispatch({
        type: SET_INITIAL_CITY,
        payload: initial
    })
}

export const setMarker = (marker) => async dispatch => {

    dispatch({
        type: SET_MARKER,
        payload: marker
    })
}