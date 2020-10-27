const initialState = {
    cities: []
}

export default (state=initialState, action) => {
    switch(action.type) {
        case 'FETCH_CITIES_BY_LAT_LNG':
            return {
                ...state, 
                cities: action.paylod
            }
        default:
            return state;
    }
}
