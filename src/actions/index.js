import { FETCH_CITIES_BY_LAT_LNG } from 'actions/types'
import api from 'api/';

export const fetchCitiesByLatLong = () => async dispatch => {

    dispatch({
        type: FETCH_CITIES_BY_LAT_LNG,
        payload: {}
    })
}