import {
    FETCH_SETTINGS
} from '../actions/types'

const initialState = {
    settings: null
}

export const reducer = (state = initialState, action) => {

    switch (action.type) {
        case FETCH_SETTINGS:
            return { ...state, settings: action.payload.settings }
        default:
            return state
    }
}
