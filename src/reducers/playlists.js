import {
    FETCH_PLAYLISTS
} from '../actions/types'

const initialState = {
    playlists: null
}

export const reducer = (state = initialState, action) => {

    switch (action.type) {
        case FETCH_PLAYLISTS:
            return { ...state, playlists: action.payload.playlists }
        default:
            return state
    }
}
