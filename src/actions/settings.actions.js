import axios from 'axios'
import { FETCH_SETTINGS } from './types'

// const ROOT_URL = 'https://api.joeknowles.com/channel'
const ROOT_URL = 'http://localhost:5000'

export const fetchSettings = () => {
    return (dispatch) => {
        axios.get(`${ROOT_URL}/settings`)
            .then(response => {
                dispatch({ type: FETCH_SETTINGS, payload: { settings: response.data.settings } })
            }).catch(err => {
                console.log(err)
            })
    }
}

export const insertSettings = (settings) => {
    return (dispatch) => {
        axios.post(`${ROOT_URL}/settings`, settings)
            .then(response => {
                if (response.status === 200) {
                    console.log('Settings inserted')
                    dispatch({ type: FETCH_SETTINGS, payload: { settings: response.data.settings } })
                }
            })
            .catch()
    }
}

export const editSettings = (update) => {
    console.log(update)
    return (dispatch) => {
        axios.put(`${ROOT_URL}/settings`, { update })
            .then(response => {
                if (response.status === 200) {
                    console.log('Settings updated')
                    dispatch({ type: FETCH_SETTINGS, payload: { settings: response.data.settings } })
                }
            })
            .catch(err => console.log(err))
    }
}
