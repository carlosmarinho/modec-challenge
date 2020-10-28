import { 
    FETCH_CITIES_BY_LAT_LNG, 
    SET_INITIAL_CITY,
    SET_MARKER,
    FETCH_CITY_BY_NAME,
    FETCH_INITIAL_CITY
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

export const fetchInitialCity = (latitude, longitude) => async dispatch => {
    const response = await api.get(`/find?lat=${latitude}&lon=${longitude}&cnt=15&APPID=${key}&units=metric`);

    dispatch({
        type: FETCH_INITIAL_CITY,
        payload: response.data && response.data.list ? response.data.list[0] : {}
    })
}

export const fetchCityByName = (name) => async dispatch => {
    const response = await api.get(`weather?q=${name}&APPID=${key}&units=metric`);

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