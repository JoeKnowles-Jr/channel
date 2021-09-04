import {
    FETCH_VIDEOS,
    POP_VIDEOS,
    THUMB_UPLOAD,
    VIDEO_UPLOAD,
    UPLOAD_RESULT,
    FETCH_FILES,
    FILES_RESET
} from '../actions/types'

const initialState = {
    videos: null,
    popVids: null,
    thumbUp: 0,
    videoUp: 0,
    videoFiles: null,
    thumbFiles: null,
    message: ''
}

export const reducer = (state = initialState, action) => {

    switch (action.type) {
        case FETCH_VIDEOS:
            return { ...state, videos: action.payload.videos }
        case POP_VIDEOS:
            return { ...state, popVids: action.payload.videos }
        case THUMB_UPLOAD:
            return { ...state, thumbUp: action.payload.thumbUp }
        case VIDEO_UPLOAD:
            return { ...state, videoUp: action.payload.videoUp }
        case UPLOAD_RESULT:
            return {
                ...state,
                thumbFiles: action.payload.thumbFiles,
                videoFiles: action.payload.videoFiles,
                message: action.payload.message
            }
        case FETCH_FILES:
            return { ...state, thumbFiles: action.payload.thumbs, videoFiles: action.payload.videos }
        case FILES_RESET:
            return { ...state, videoUp: 0, thumbUp: 0 }
        default:
            return state
    }
}
