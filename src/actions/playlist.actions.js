import axios from 'axios'
import { playlistsUrl } from './action.urls'
import { FETCH_PLAYLISTS } from './types'

export const fetchPlaylists = () => {
    console.log('fetching')
    return (dispatch) => {
        axios.get(playlistsUrl)
            .then(response => {
                dispatch({ type: FETCH_PLAYLISTS, payload: { playlists: response.data.playlists } })
            }).catch(err => {
                console.log(err)
            })
    }
}

export const insertPlaylist = (playlist) => {
    return (dispatch) => {
        axios.post(playlistsUrl, playlist)
            .then(response => {
                if (response.status === 200) {
                    console.log('Playlist inserted')
                    dispatch({ type: FETCH_PLAYLISTS, payload: { playlists: response.data.playlists } })
                }
            })
            .catch()
    }
}

export const editPlaylist = (plid, update) => {
    console.log(plid, update)
    return (dispatch) => {
        axios.put(playlistsUrl, { filter: plid, update })
            .then(response => {
                if (response.status === 200) {
                    console.log('Playlist updated')
                    dispatch({ type: FETCH_PLAYLISTS, payload: { playlists: response.data.playlists } })
                }
            })
            .catch(err => console.log(err))
    }
}

export const deletePlaylist = (lid) => {
    const url = `${playlistsUrl}/${lid}`
    return (dispatch) => {
        axios.delete(url, (response => {
            dispatch({ type: FETCH_PLAYLISTS, payload: { playlists: response.data.playlists } })
        }
        ))
    }
}

export const addVideoToPlaylist = (plid, vid) => {
    const url = `${playlistsUrl}/${plid}`
    return (dispatch) => {
        axios.put(url, { action: 'add', vid })
            .then(response => console.log(response))
            .catch(err => console.log(err))
    }
}

export const removeVideoFromPlaylist = (plid, vid) => {
    const url = `${playlistsUrl}/${plid}`
    return (dispatch) => {
        axios.put(url, { action: 'remove', vid })
            .then(response => dispatch({type: FETCH_PLAYLISTS, playlists: response.data.playlists}))
            .catch(err => console.log(err))
    }
}
