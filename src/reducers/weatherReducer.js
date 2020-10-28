import { 
    FETCH_CITIES_BY_LAT_LNG, 
    SET_INITIAL_CITY, 
    SET_MARKER,
    FETCH_CITY_BY_NAME,
    FETCH_INITIAL_CITY
} from 'actions/types'

const initialState = {
    cities: [],
    city: {},
    initialCity: null,
    position: {coords: {latitude: -22.88, longitude: -43.12}},
    marker: null,
}

export default (state=initialState, action) => {
    let coord = {}
    switch(action.type) {
        case FETCH_CITIES_BY_LAT_LNG:
            coord = action.payload.coord ? action.payload.coord : action.payload.list[0].coord ;
            return {
                ...state, 
                cities: action.payload.list,
                city: action.payload.list ? action.payload.list[0] : {},
                initialCity: action.payload.initialCity && action.payload.list 
                    ? action.payload.list[0] 
                    : state.initialCity,
                marker: { coords: { latitude: coord.lat, longitude: coord.lon }}
            }
        case FETCH_CITY_BY_NAME:
            coord = action.payload.coord ? action.payload.coord : action.payload.list[0].coord ;
            return {
                ...state, 
                city: action.payload,
                marker: { coords: { latitude: coord.lat, longitude: coord.lon }},
                position: { coords: { latitude: coord.lat, longitude: coord.lon }}
            }
        case FETCH_INITIAL_CITY:
            return {
                ...state,
                initialCity: action.payload,
            }
        case SET_INITIAL_CITY:
            return {
                ...state,
                initialCity: action.payload,
            }
        case SET_MARKER:
            return {
                ...state,
                marker: action.payload,
            }
        default:
            return state;
    }
}
