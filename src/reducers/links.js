import {
    FETCH_LINKS
} from '../actions/types'

const initialState = {
    links: null
}

export const reducer = (state = initialState, action) => {

    switch (action.type) {
        case FETCH_LINKS:
            return { ...state, links: action.payload.links }
        default:
            return state
    }
}
