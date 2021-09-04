import axios from 'axios'
import { filesUrl, videosUrl } from './action.urls'
import {
    FETCH_VIDEOS,
    FETCH_FILES,
    POP_VIDEOS,
    UPLOAD_RESULT,
    THUMB_UPLOAD,
    VIDEO_UPLOAD,
    FILES_RESET
} from './types'

export const fetchVideos = () => {
    return (dispatch) => {
        axios.get(videosUrl)
            .then(response => {
                dispatch({ type: FETCH_VIDEOS, payload: { videos: response.data.videos } })

            }).catch(err => {
                console.log(err)
            })
    }
}

export const editVideo = (vid, update) => {
    console.log("update", update)
    return (dispatch) => {
        axios.put(videosUrl, { filter: vid, update })
            .then(response => {
                if (response.status === 200) {
                    console.log('Video updated')
                    dispatch({ type: FETCH_VIDEOS, payload: { videos: response.data.videos } })
                }
            })
            .catch(err => console.log(err))
    }
}

export const populateVideos = (year) => {
    return (dispatch) => {
        axios.get(`${videosUrl}/vidpop/${year}`)
            .then(response => {
                dispatch({ type: POP_VIDEOS, payload: { videos: response.data.videos } })

            }).catch(err => {
                console.log(err)
            })
    }
}

export const insertVideo = (video) => {
    console.log('inserting', video)
    return (dispatch) => {
        axios.post(videosUrl, video)
            .then(response => {
                console.log('response', response)
                if (response.status === 200) {
                    console.log('video inserted')
                    console.log(response.data.message)
                    dispatch({ type: FETCH_VIDEOS, payload: { videos: response.data.videos } })
                }
            })
            .catch()
    }
}

export const uploadFile = (file, cb) => {
    return (dispatch) => {
        const config = {
            onUploadProgress: file.type === 'thumb' ?
                function (progressEvent) {
                    console.log(progressEvent)
                    const dis = {
                        type: THUMB_UPLOAD,
                        payload: { thumbUp: Math.round((progressEvent.loaded * 100) / progressEvent.total) }
                    }
                    console.log(dis)
                    dispatch(dis)
                }
                :
                function (progressEvent) {
                    console.log(progressEvent)
                    const dis = {
                        type: VIDEO_UPLOAD,
                        payload: { videoUp: Math.round((progressEvent.loaded * 100) / progressEvent.total) }
                    }
                    console.log(dis)
                    dispatch(dis)
                }
        }
        axios.post(`${filesUrl}/upload`, file, config)
            .then(response => {
                console.log(response.data)
                dispatch({
                    type: UPLOAD_RESULT,
                    payload: {
                        thumbFiles: response.data.thumbFiles,
                        videoFiles: response.data.videoFiles,
                        message: response.data.message
                    }
                });
                dispatch({ type: FILES_RESET })
            })
            .catch(err => {
                dispatch({ type: UPLOAD_RESULT, payload: { message: err } });
            });
    }
};

export const getFiles = () => {
    return (dispatch) => {
        axios.get(filesUrl)
            .then(response => {
                dispatch({ type: FETCH_FILES, payload: { videos: response.data.videoFiles, thumbs: response.data.thumbFiles } })
            })
            .catch(err => console.log(err))
    }
}

export const deleteVideo = (vid) => {
    const url = `${videosUrl}/${vid}`
    console.log(url, vid)
    return (dispatch) => {
        axios.delete(url)
            .then(response => {
                dispatch({ type: FETCH_VIDEOS, payload: { videos: response.data.videos } })
            })
            .catch(err => console.log(err))
    }
}

export const videoWatched = (data) => {
    return (dispatch) => {
        axios.put(videosUrl, {
            filter: data.vid,
            update: {
                views: data.currentViews + 1
            }
        })
        .then(response => {
            dispatch({ type: FETCH_VIDEOS, payload: { videos: response.data.videos } })
        })
        .catch(err => console.log(err))
    }
}
