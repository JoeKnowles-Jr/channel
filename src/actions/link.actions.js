import axios from 'axios'
import { linksUrl } from './action.urls'
import { FETCH_LINKS } from './types'

export const fetchLinks = () => {
    return (dispatch) => {
        axios.get(linksUrl)
            .then(response => {
                dispatch({ type: FETCH_LINKS, payload: { links: response.data.links } })
            }).catch(err => {
                console.log(err)
            })
    }
}

export const insertLink = (link) => {
    return (dispatch) => {
        axios.post(linksUrl, link)
            .then(response => {
                if (response.status === 200) {
                    console.log('Link inserted')
                    dispatch({ type: FETCH_LINKS, payload: { links: response.data.links } })
                }
            })
            .catch()
    }
}

export const editLink = (lid, update) => {
    console.log(lid)
    return (dispatch) => {
        console.log(lid)
        axios.put(linksUrl, {lid, update})
            .then(response => {
                console.log(lid)
                if (response.status === 200) {
                    console.log('Link updated')
                    dispatch({ type: FETCH_LINKS, payload: { links: response.data.links } })
                }
            })
            .catch(err => console.log(err))
    }
}

export const deleteLink = (lid) => {
    const url = `${linksUrl}/${lid}`
    console.log(url, lid)
    return (dispatch) => {
        axios.delete(url, (response => {
            dispatch({ type: FETCH_LINKS, payload: { links: response.data.links } })
        }
        ))
    }
}